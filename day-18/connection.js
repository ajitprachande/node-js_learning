import mongoose from 'mongoose';

export const ConnectMongoDb = async (connectionURL) => {
    const connection = await mongoose.connect(connectionURL);
    return connection;
}