
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express= require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin =require("firebase-admin")

var serviceAccount = require("");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ""
});

const app=express();

app.use(cors({origin:'*'}));

app.use(bodyParser.json());

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

const verifyAdmin =(req,res, next)=>{
  console.log(req.user)
  if (req.user && req.user.admin){
    next()
  }else{
    res.status(403).json({message:"Hozzádférés megtagadva!"})
  }
}
const verifyModerator =(req,res, next)=>{
  console.log(req.user)
  if (req.user && req.user.moderator){
    next()
  }else{
    res.status(403).json({message:"Hozzádférés megtagadva!"})
  }
}

app.get('/users',verifyToken,verifyModerator, async (req, res) => {
  try{
    const userRecords=await admin.auth().listUsers()
    const userWithClaims=await Promise.all(userRecords.users.map(
      async (user)=>{
        console.log("User:", user)
        const userDetails= await admin.auth().getUser(user.uid)
        return {
          uid: userDetails.uid,
          email: userDetails.email,
          displayName: userDetails.displayName,
          photoURL: userDetails.photoURL,
          claims:userDetails.customClaims || {}
        }
      }
    )
  )
    res.json(userWithClaims)
  }
    catch (error)  {
      console.error('Hiba történt a felhasználók lekérésekor:', error);
      res.sendStatus(500);
    }
  })


    // {
    //   "uid":"FXiuF4mFw2eXOdpHLQ8QWe8ACzf1",
    //   "claims":{"admin":false}
    //   }

app.post('/setCustomClaims',verifyToken,verifyAdmin ,(req,res)=>{
  const {uid, claims} = req.body
  console.log("uid", uid)
  console.log("claims", claims)
  admin.auth().setCustomUserClaims(uid, claims)
  .then(()=>res.json({message:"OK"}))
  .catch((error)=>{
    console.log("Hiba a claimsok beállításánál! ",error)
    res.sendStatus(500)
  })
})

app.get('/getClaims/:uid', (req,res)=>{
  const {uid}= req.params
  admin.auth().getUser(uid).then(
    (user)=>{
      res.json(user.customClaims || {})
    }
  ).catch((error)=>{
    console.log("Hiba a claimsok lekérdezésénél! ",error)
    res.sendStatus(500)
  }
)})


app.patch("/updateUser", verifyToken, async(req,res)=>{
  try{
    const {displayName, phoneNumber}= req.body
    const uid= req.user.uid

    const updateUser = await admin.auth().updateUser(uid,{
      displayName, phoneNumber
    })
    res.json({
      message:"Felhasználói adatok sikeresen frissítve",
      user:{
        uid:updateUser.uid,
        email:updateUser.email,
        displayName:updateUser.displayName,
        phoneNumber: updateUser.phoneNumber
      }
    })
  }
  catch(error){
    console.log("Hiba a felhasználói adatok frissítésekor!", error)
    res.status(500).json({message:"Hiba a felhasználói adatok frissitésekor!"})
  }
})

exports.api =onRequest(app);
