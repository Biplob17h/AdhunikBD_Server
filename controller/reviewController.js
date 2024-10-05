import Review from "../model/reviewModel.js";

const createAReview = async (req, res) => {
  try {
    const { rating, comment, userId } = req.body;

    // save to database
    const newReview = new Review({ rating, comment, userId });
    const result = await newReview.save();

    // send the created review back to the client
    res.status(201).json({
      status: "success",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getAllReviews = async (req, res) => {
  try {
    // retrieve all reviews from the database
    const reviews = await Review.find({});
    res.status(200).json({
      status: "success",
      results: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getAllReviewsForAUser = async (req, res) => {
  try {
    const allReviews = await Review.find({ userId: req.params.id });
    res.status(200).json({
      status: "success",
      results: allReviews.length,
      reviews: allReviews,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getAllReviewsForAVendor = async (req, res) => {
  try {
    const allReviews = await Review.find({ vendorId: req.params.id });
    res.status(200).json({
      status: "success",
      results: allReviews.length,
      reviews: allReviews,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getASingleReview = async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id });

    if (!review) {
      return res.status(404).json({
        status: "fail",
        message: "Review not found",
      });
    }

    res.status(200).json({
      status: "success",
      review,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      review: updatedReview,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export {
  createAReview,
  getAllReviews,
  getAllReviewsForAUser,
  getAllReviewsForAVendor,
  updateReview,
  getASingleReview
};
