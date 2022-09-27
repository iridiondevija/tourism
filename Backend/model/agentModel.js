const mongoose = require("mongoose");

const agentSchema = mongoose.Schema(
  {
    favorites: {
      type: Array,
    },
    name:{
      type: String,
      required:[true]
    },
    email:{
      type: String,
      required:[true]
    },
    password:{
      type:String,
      required:[true, "You have to digit the password"]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", agentSchema);