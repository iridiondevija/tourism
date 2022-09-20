// // const admin = require("firebase-admin");

// // const db = admin.firestore();

// // const read = async (req, res) => {
// //   try {
// //     const usersRef = db.collection("cards");
// //     const response = await usersRef.get();
// //     let responseArr = [];
// //     response.forEach((doc) => {
// //       responseArr.push({
// //         elements: doc.data(),
// //         elementsId: doc.id,
// //       });
// //     });
// //     res.send(responseArr);
// //   } catch (error) {
// //     res.send(error);
// //   }
// // };

// // const create = async (req, res) => {
// //   try {
// //     const id = req.body.id;
// //     const userJson = {
// //       email: req.body.email,
// //       firstName: req.body.firstName,
// //       lastName: req.body.lastName,
// //     };
// //     const response = await db.collection("cards").doc(id).set(userJson);
// //     res.send(response);
// //   } catch (error) {
// //     res.send(error);
// //   }
// // };



// const Airtable = require("airtable");
// const base = new Airtable({ apiKey: "key86mRWVmhouLajJ" }).base(
//   "appZpNOdNq1NeGspC"
// );

// const table = base("Users");

// const read = async (req, res) => {
//   try {
//     const records = await table.select({ view: "Grid view" }).firstPage();
//     res.send(records);
//   } catch (error) {
//     res.send(error);
//   }
// };

// const create = async (req, res) => {
//   try {
//     const createRec = await table.create({
//       Name: req.body.Name,
//       Password: req.body.Password,
//     });
//     res.send(createRec);
//   } catch (error) {
//     res.send(error);
//   }
// };

// const update = async (req, res) => {
//   try{
//     const id = req.body.id;
//     const updateRec = await table.update(id,{
//       Name: req.body.Name,
//       Password: req.body.Password,
//     })
//     res.send(updateRec)
    
//   }catch(error){
//     res.send(error)
//   }
// }

// const deleteRec = async (req, res) => {
//   try{
//     const id = req.body.id;
//     const deleteRec = await table.destroy(id)
//     res.send(deleteRec)
//     //console.log("record deleted",deleteRec)
    
//   }catch(error){
//     res.send(error)
//   }
// }



// module.exports = { read, create };
