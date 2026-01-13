import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';


import connectDb from './db/db.js';
import userRouter from './routes/user.route.js';
import captainRouter from './routes/captain.route.js';


const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//connect db
connectDb();

app.get('/' , (req ,res) => {

    res.send("Server started!!");
})

//routes 
app.use('/users' , userRouter);
app.use('/captain' , captainRouter);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        message,
        errors: err.errors // Pass specific errors if available
    });
});

export default app;