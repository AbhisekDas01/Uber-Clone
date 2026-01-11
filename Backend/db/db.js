import mongoose from 'mongoose'
import { MONGODB_URI } from '../configs/env.config.js'

async function connectDb() {
    try {
        mongoose.connection.on('connected', () => {
            console.log("Connected to Db");
        });

        await mongoose.connect(MONGODB_URI);
    } catch (error) {
        console.error("Error connecting the db: ", error);
        process.exit(1);
    }
}

export default connectDb;