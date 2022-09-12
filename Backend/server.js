const express = require("express");
const app = express();
const cors = require('cors');
const admin = require("firebase-admin");
const credentials = require("./config/db-firebase-key.json");
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

// app.post("/create", async (req, res) => {
//   try {
//     const id = req.body.email;
//     const userJson = {
//       email: req.body.email,
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//     };
//     const response = await db.collection("test").add(userJson);
//     res.send(response);
//   } catch (error) {
//     res.send(error);
//   }
// });

// app.get("/read/all", async (req, res) => {
//   try {
//     const usersRef = db.collection("test");
//     const response = await usersRef.get();
//     let responseArr = [];
//     response.forEach((doc) => {
//       responseArr.push(doc.data());
//     });
//     res.send(responseArr);
//   } catch (error) {
//     res.send(error);
//   }
// });

app.use("/api/cards", require("./routes/packageRoute"));

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
