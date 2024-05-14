import { usersModel } from "../../models/users.model.js";
import bcrypt from 'bcrypt';

export class usersMongoose {
    async getUserById(id) {
        return await usersModel.findOne({ _id: id }).lean({ virtuals: true });
    }

    async updateUserCart(userId, cartId) {
        try {
            const user = await usersModel.findOneAndUpdate(
                { _id: userId },
                { cartId: cartId },
                { new: true }
            );
            return user;
        } catch (error) {
            console.error(error);
            throw new Error('Error updating user cart');
        }
    }
    
    async createUser(userData) {
        try {
            console.log(userData);
            const newUser = await usersModel.create(userData);
            return newUser.toObject({ virtuals: true });
        } catch (error) {
            console.error(error);
            throw new Error('Error creating user');
        }
    }

    async findUserByEmail(email) {
        const user = await usersModel.findOne({email});
        if (!user) {
            return null; 
        }else{
            return user;
        } 
    }
    
    async getAllUsers(){
        try {
            const user=await usersModel.find({first_name,last_name,email});
            return user;   
        } catch (error) {
            console.error(error);
            throw new Error('Error getting user');
        }
    }
    async deleteInactiveUsers(){
        
    }
}
