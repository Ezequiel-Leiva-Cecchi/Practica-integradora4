import orderModel from "../../models/ticket.model.js";

export class orderMongoose {
    async createOrder(orderData) {
        try {
            const newOrder = await orderModel.create(orderData);
            return newOrder;
        } catch (error) {
            console.error(error);
            throw new Error('Error al crear la orden');
        }
    }

    async getOrderById(orderId) {
        try {
            const order = await orderModel.findById(orderId);
            return order;
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener la orden');
        }
    }

    async updateOrderStatus(orderId, newStatus) {
        try {
            const order = await orderModel.findByIdAndUpdate(orderId, { status: newStatus }, { new: true });
            return order;
        } catch (error) {
            console.error(error);
            throw new Error('Error al actualizar el estado de la orden');
        }
    }
}
