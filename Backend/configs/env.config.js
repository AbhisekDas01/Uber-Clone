import {config} from 'dotenv';


config({path: '.env'});


export const {

    ENV_NODE_ENV,
    ENV_PORT,
    ENV_MONGODB_URI,
    ENV_JWT_SECRET

} = process.env;