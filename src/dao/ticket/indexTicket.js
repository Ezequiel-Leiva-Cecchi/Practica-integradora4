import { TicketMongoose } from "./ticket.mongoose.js";

let ticketDAO;

const DAO_OPTION = process.env.DAO_OPTION;

switch(DAO_OPTION) {
  case 'mongoose':
    ticketDAO = new TicketMongoose();
    break;
    
  default:
    ticketDAO = new TicketMongoose();
}

export { ticketDAO };
