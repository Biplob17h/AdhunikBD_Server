import Counter from "../model/counterModel.js";

export const increaseTotalOrder = async () => {
  const counter = await Counter.findOne({ _id: "6700b9d56a357a9b5150ace2" });
  counter.totalOrder++;
  await counter.save();
};
export const increaseTotalAcceptOrder = async () => {
  const counter = await Counter.findOne({ _id: "6700b9d56a357a9b5150ace2" });
  counter.acceptOrder++;
  await counter.save();
};
export const increaseTotalPendingOrder = async () => {
  const counter = await Counter.findOne({ _id: "6700b9d56a357a9b5150ace2" });
  counter.pendingOrder++;
  await counter.save();
};
export const increaseTotalServedOrder = async () => {
  const counter = await Counter.findOne({ _id: "6700b9d56a357a9b5150ace2" });
  counter.servedOrder++;
  await counter.save();
};
export const increaseTotalCompletedOrder = async () => {
  const counter = await Counter.findOne({ _id: "6700b9d56a357a9b5150ace2" });
  counter.completedOrder++;
  await counter.save();
};
export const increaseTotalCancelledOrder = async () => {
  const counter = await Counter.findOne({ _id: "6700b9d56a357a9b5150ace2" });
  counter.cancelledOrder++;
  await counter.save();
};
export const increaseTotalNewTicket = async () => {
  const counter = await Counter.findOne({ _id: "6700b9d56a357a9b5150ace2" });
  counter.newTicket++;
  await counter.save();
};
export const increaseTotalActiveTicket = async () => {
  const counter = await Counter.findOne({ _id: "6700b9d56a357a9b5150ace2" });
  counter.activeTicket++;
  await counter.save();
};

export const increaseTotalClosedTicket = async () => {
  const counter = await Counter.findOne({ _id: "6700b9d56a357a9b5150ace2" });
  counter.closedTicket++;
  await counter.save();
};
export const increaseTotalSolvedTicket = async () => {
  const counter = await Counter.findOne({ _id: "6700b9d56a357a9b5150ace2" });
  counter.solvedTicket++;
  await counter.save();
};

export const increaseTotalTotalSale = async (price) => {
  const counter = await Counter.findOne({ _id: "6700b9d56a357a9b5150ace2" });
  counter.totalSale = counter.totalSale + price;
  await counter.save();
};

//********************************** */
// Decrease
//*********************************** */

export const decreaseTotalAcceptOrder = async () => {
  const counter = await Counter.findOne({ _id: "6700b9d56a357a9b5150ace2" });
  if (counter.acceptOrder > 0) counter.acceptOrder--;
  await counter.save();
};

export const decreaseTotalPendingOrder = async () => {
  const counter = await Counter.findOne({ _id: "6700b9d56a357a9b5150ace2" });
  if (counter.pendingOrder > 0) counter.pendingOrder--;
  await counter.save();
};

export const decreaseTotalServedOrder = async () => {
  const counter = await Counter.findOne({ _id: "6700b9d56a357a9b5150ace2" });
  if (counter.servedOrder > 0) counter.servedOrder--;
  await counter.save();
};

export const decreaseTotalCompletedOrder = async () => {
  const counter = await Counter.findOne({ _id: "6700b9d56a357a9b5150ace2" });
  if (counter.completedOrder > 0) counter.completedOrder--;
  await counter.save();
};

export const decreaseTotalCancelledOrder = async () => {
  const counter = await Counter.findOne({ _id: "6700b9d56a357a9b5150ace2" });
  if (counter.cancelledOrder > 0) counter.cancelledOrder--;
  await counter.save();
};

export const decreaseTotalNewTicket = async () => {
  const counter = await Counter.findOne({ _id: "6700b9d56a357a9b5150ace2" });
  if (counter.newTicket > 0) counter.newTicket--;
};

export const decreaseTotalActiveTicket = async () => {
  const counter = await Counter.findOne({ _id: "6700b9d56a357a9b5150ace2" });
  if (counter.activeTicket > 0) counter.activeTicket--;
  await counter.save();
};

export const decreaseTotalClosedTicket = async () => {
    const counter = await Counter.findOne({ _id: "6700b9d56a357a9b5150ace2" });
  if (counter.closedTicket > 0) counter.closedTicket--;
  await counter.save();
}

export const decreaseTotalSolvedTicket = async () => {
    const counter = await Counter.findOne({ _id: "6700b9d56a357a9b5150ace2" });
  if (counter.solvedTicket > 0) counter.solvedTicket--;
  await counter.save();
}


