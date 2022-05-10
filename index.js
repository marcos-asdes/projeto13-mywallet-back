import express, { json } from 'express';
import cors from 'cors';
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import joi from 'joi'
import bcrypt from 'bcrypt';
//import dayjs from 'dayjs'; 

const app = express(); // create a server
app.use(json()); // middleware
app.use(cors());
dotenv.config();

// connect MongoDB
let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URL);
const promise = mongoClient.connect();
promise.then(() => {
    db = mongoClient.db(process.env.DATABASE);
    console.log("MongoDB database connected");
});
promise.catch((error) => console.log("Error connecting to database", error));

// register
app.post('/sign-up', (req, res) => {
    // validation -> joi
    const signUpSchema = joi.object({
        name: joi.string().required(),
        email: joi.email().required(),
        password: joi.string().required(),
        confirmPassword: joi.ref('password')
    });

    // error
    const {error} = signUpSchema.validate(req.body, {abortEarly: false});
    if(error) {
        return res.status(422).send(error.details.map(detail => detail.message)); // unprocessable entity
    }

    // store data in the database
    try {
        const {name, email, password} = req.body; // parser
        const SALT = 10;
        const hashPassword = bcrypt.hashSync(password, SALT); // encrypting password
        await db.collection("users").insertOne({
            name,
            email,
            password: hashPassword
        })
        res.sendStatus(201); // created
    } catch (error) {
        console.log("Error creating new user");
        console.log(error);
        return res.sendStatus(500);
    }

})

const port = process.env.PORT || 5000; // establishing the port -> production or development

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
