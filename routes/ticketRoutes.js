import express from "express";
import { createATicket, getAllTickets, getTicketById, updateTicketStatus } from "../controller/ticketController.js";

const ticketRoute = express.Router();

ticketRoute.post('/create', createATicket)

ticketRoute.get('/all', getAllTickets)
ticketRoute.get('/single/:id', getTicketById)

ticketRoute.patch('/update/:id/:status', updateTicketStatus)

export default ticketRoute;
