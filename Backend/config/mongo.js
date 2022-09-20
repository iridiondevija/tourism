
const mongoose =  require('mongoose');
require('dotenv').config()
// const mongoLink = "mongodb+srv://iridion:Test123@cluster0.ncqftxr.mongodb.net/ChTourismAgency?retryWrites=true&w=majority"
const connectDb = async () =>{
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo connected ${conn.connection.host}`)
  }
  catch(error){
    console.log(error);
    process.exit(1);
  }
}

module.exports={connectDb}