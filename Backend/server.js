const express = require("express");
const app = express();
const {erroHandler} = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 8080;
const {connectDb} = require('./config/mongo')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

// const admin = require("firebase-admin");
// const credentials = require("./config/db-firebase-key.json");

// admin.initializeApp({
//   credential: admin.credential.cert(credentials),
// });

app.use("/api/TripPackages", require("./routes/packageRoute"));
// app.use("/api/agents", require("./routes/agentRoute"));

app.use("/api/users", require("./routes/userRoute"));
app.use(erroHandler)

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});