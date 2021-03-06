import { MongoClient } from 'mongodb'; // database
import dotenv from 'dotenv'; // environment variables

dotenv.config();

// connect MongoDB
let database = null;
const mongoClient = new MongoClient(process.env.MONGO_URL);

// initialize MongoDB on Terminal with ~ sudo systemctl start mongod

try {
    await mongoClient.connect();
    database = mongoClient.db(process.env.DATABASE);
    console.log("MongoDB database connected");
} catch (error) {
    console.log("Error connecting to database", error);
}

// Alternative method
/* const promise = mongoClient.connect();
promise.then(() => {
    database = mongoClient.db(process.env.DATABASE);
    console.log("MongoDB database connected");
});
promise.catch((error) => console.log("Error connecting to database", error)); */

export default database;