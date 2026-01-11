import express from 'express'
import connectDb from './db/db.js';

const app = express();

//connect db
connectDb();

app.get('/' , (req ,res) => {

    res.send("Server started!!");
})


export default app;