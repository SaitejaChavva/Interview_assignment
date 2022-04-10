// /****************************
//  MONGOOSE SCHEMAS
//  ****************************/
//  import { config } from './config';
//  import * as mongoose from 'mongoose';
//  mongoose.Promise = global.Promise;
 
//  let database: mongoose.Connection;

//  export const mongoDbConnection = () => {
//      var db = mongoose.connect(config.db, config.mongoDBOptions).then(
//          (connect) => { console.log('MongoDB connected') },
//          (err) => { console.log('MongoDB connection error', err) }
//      );
//     //  mongoose.set('useCreateIndex', true);
//      return db;
//  };
 


import * as Mongoose from "mongoose";
// import { UserModel } from "./users/users.model";
let database: Mongoose.Connection;
export const connect = () => {
  // add your own uri below
//   const uri = "mongodb+srv://<username>:<password>@cluster0-v6q0g.mongodb.net/test?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017/config"
  if (database) {
    return;
  }
  require('mongoose').connect(uri, {
    useNewUrlParser: true,
    // useFindAndModify: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  }).then((connect: any) => { console.log('Connected to DB')}).catch((err: any) => { console.error('error connecting to DB ', err)});
  database = Mongoose.connection;
  // require('mongoose').once("open", async () => {
  //   console.log("Connected to database");
  // });
  // require('mongoose').on("error", () => {
  //   console.log("Error connecting to database");
  // });
};
export const disconnect = () => {
  if (!require('mongoose')) {
    return;
  }
  Mongoose.disconnect();
};