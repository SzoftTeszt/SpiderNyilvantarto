
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express= require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin =require("firebase-admin")

var serviceAccount = require("./spider-116a2-firebase-adminsdk-b0i5e-1a99efdc5b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://spider-116a2-default-rtdb.europe-west1.firebasedatabase.app"
});

const app=express();

app.use(cors({origin:'*'}));

app.use(bodyParser.json);

const verifyToken= (req,res, next)=>{
    const idToken= req.headers.authorization;

    admin.auth().verifyIdToken(idToken).then(
        (decodeData)=>{
            req.user=decodeData;
            next();
        }
    )
    .catch((error)=>{
        console.log("Hiba a token ellenőrzésekot!");
        res.sendStatus(401);
    })
}


app.get('/users', verifyToken, (req, res) => {
    admin
      .auth()
      .listUsers()
      .then((userRecords) => {
        const users = userRecords.users.map((user) => ({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          
         
        }));
        res.json(users);
      })
      .catch((error) => {
        console.error('Hiba történt a felhasználók lekérésekor:', error);
        res.sendStatus(500);
      });
    });
exports.api =onRequest(app);
