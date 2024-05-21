import { ticketDAO } from '../dao/ticket/indexTicket.js';

export const generateTicket = async (cartId, purchaseDatetime, amount, purchaser) => {
    try {
        const ticket = await ticketDAO.createTicket({
            cartId,
            code: generateUniqueCode(), // Función para generar un código único
            purchaseDatetime,
            amount,
            purchaser
        });
        console.log("Ticket generated successfully:", ticket);
        return ticket;
    } catch (error) {
        console.error("Error generating ticket:", error);
        throw new Error('Failed to generate ticket');
    }
};

// Función para generar un código único
const generateUniqueCode = () => {
    const uniqueId = new mongoose.Types.ObjectId();
    return uniqueId.toString();
};
