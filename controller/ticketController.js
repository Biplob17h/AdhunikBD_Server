import Ticket from "../model/ticketModel.js";

const createATicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTicket = await Ticket.create({ title, description });

    res.status(201).json({
      status: "success",
      newTicket,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    res.status(200).json({
      status: "success",
      tickets,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getTicketById = async (req, res) => {
  try {
    const _id = req.params.id;
    const ticket = await Ticket.findById({ _id });

    if (!ticket) {
      return res.status(404).json({
        status: "fail",
        message: "Ticket not found",
      });
    }
    res.status(200).json({
      status: "success",
      ticket,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const updateTicketStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const id = req.params.id;

    if (status === "closed") {
      const update = {
        status: status,
        updatedAt: new Date(),
        resolvedAt: new Date(),
      };
    } else {
      const update = {
        status: status,
        updatedAt: new Date(),
      };
    }

    const updatedTicket = await Ticket.updateOne({ _id: id }, { $set: update });

    if (!updatedTicket) {
      return res.status(404).json({
        status: "fail",
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      status: "success",
      updatedTicket,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export { createATicket, getAllTickets, getTicketById, updateTicketStatus}
