import mongoose from 'mongoose'
import { ENV_MONGODB_URI } from '../configs/env.config.js'

async function connectDb() {
    try {
        mongoose.connection.on('connected', () => {
            console.log("Connected to Db");
        });
        mongoose.connection.on('error', (err) => {
            console.error("Mongo Db Connection Error:", err);
        });
        mongoose.connection.on('disconnected', () => {
            console.log("Mongo Db Disconnected");
        });

        await mongoose.connect(ENV_MONGODB_URI);
    } catch (error) {
        console.error("Error connecting the db: ", error);
        process.exit(1);
    }
}



export default connectDb;