import mongoose from "mongoose";
import type { MongoMemoryServer } from "mongodb-memory-server";
require("dotenv").config();

let memoryServerInstance: MongoMemoryServer | null = null;

const connectDB = async () => {
  try {
    const configuredDbUrl: string = process.env.MONGO_URL || "";

    if (configuredDbUrl) {
      await mongoose.connect(configuredDbUrl);
      console.log(`Database connected with configured URI`);
      return;
    }

    // Fallback for local development: spin up in-memory MongoDB if no URL is provided
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    memoryServerInstance = await MongoMemoryServer.create();
    const inMemoryUri = memoryServerInstance.getUri();

    await mongoose.connect(inMemoryUri);
    console.log(`In-memory MongoDB started at ${inMemoryUri}`);
  } catch (error: any) {
    console.log(`Mongo connection error: ${error.message}`);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
