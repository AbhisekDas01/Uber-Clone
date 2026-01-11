import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../configs/env.config.js";

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3 , 'First name must be at least 3 characters long'],

        },
        lastname: {
            type: String,
            minlength: [3 , 'Last name must be at least 3 characters long'],

        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5 , 'Email must be atleast 5 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false
    },

    socketId: {
        type: String,
    }
});

userSchema.methods.generateAuthToken = function() {

    const token = jwt.sign({_id: this._id} , JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword , this.password);
}

userSchema.statics.hashPassword = async function (password) {
    
    return await bcrypt.hash(password , 10);
}

const userModel = mongoose.model('User' , userSchema);

export default userModel;
