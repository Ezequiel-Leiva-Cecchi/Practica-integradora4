import { orderMongoose } from "./order.mongoose.js";

let orderDAO;

const DAO_OPTION = process.env.DAO_OPTION;

switch(DAO_OPTION) {
    case 'mongoose':
        orderDAO = new orderMongoose();
        break;
    default:
        orderDAO = new orderMongoose();
}

export { orderDAO };
