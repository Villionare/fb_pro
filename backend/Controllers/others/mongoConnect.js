// mongoConnect.js
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

const mongoConnect = async (connectionString) => {
    try {
        await mongoose.connect(connectionString);
        console.log("✅ MongoDB connected successfully");

        // Return the store AFTER connection
        const store = MongoStore.create({
            client: mongoose.connection.getClient(),
            collectionName: "express-session-storage",
            autoRemove: 'native' // optional: clean expired sessions
        });

        return store;
    } catch (error) {
        console.error("MongoDB connection failed ❌:", error);
        process.exit(1);
    }
};

export { mongoConnect };