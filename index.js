import express, { json } from 'express'; // server
import cors from 'cors';
import dotenv from 'dotenv'; // environment variables

import router from './routes/.router.js'

const app = express(); // create a server

dotenv.config();

app.use(json()); // middleware
app.use(cors()); // middleware
app.use(router);

/* // register
async function signUp(req,res) {

    const {name, email, password, confirmPassword} = req.body; // parser
    const {error} = signUpSchema.validate(req.body, {abortEarly: false});

    // error
    if(error) {
        return res.status(422).send(error.details.map(detail => detail.message)); // unprocessable entity
    }

    // store data in the database
    try {
        const SALT = 10;
        const hashPassword = bcrypt.hashSync(password, SALT); // encrypting password
        await database.collection("users").insertOne({
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
} */

const port = process.env.PORT || 5000; // establishing the port -> production or development

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
