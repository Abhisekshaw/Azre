require('dotenv').config();
const mongoose = require('mongoose');

let isConnected = false;

const connectToDatabase = async () => {
    if (isConnected) {
        console.log("Already connected to MongoDB.");
        return;
    }

    console.log("Trying to connect DB...");
    let currentDate = (new Date()).toString();

    try {
        await mongoose.connect(process.env.MONGODB_URI, );
        isConnected = true;

        const dbInfo = {
            status: 'Connected to the database',
            host: mongoose.connection.host,
            DB: mongoose.connection.name,
            Time: currentDate
        };

        // Create indexes after connection
        // await createIndexes();

        console.table(dbInfo);
        console.log("MongoDB Connection Successful");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process on connection failure
    }
};

module.exports = { connectToDatabase };
