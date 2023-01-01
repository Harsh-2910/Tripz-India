const express = require("express");
const { mongoose } = require("mongoose");
require("./config");
const app = express();
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs"); //for password encryption
const jwt = require("jsonwebtoken");
const JWT_SECRET = "hd/jih7878787493lpoudjdkhimjdkdkdi/#)yajkdjkdanudjshi";

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
});

const fileFilter = (req,file,cb)=>{
  if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg'){
    cb(null,true);
  }
  else cb(null,false);
}

var upload = multer({
  storage:storage,
  limits:{
    fileSize: 1024*1024*5,
  },
  fileFilter:fileFilter,
});

app.use(express.json());

require("./userDetails");
const User = mongoose.model("userLoginInfo");

require("./guideDetails");
const Guide = mongoose.model("guideInfo");

app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send({ error: "User exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User not found!" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);
    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  return res.json({ status: "error", error: "INVALID PASSWORD" });
});

app.post("/userData",async(req,res)=>{
    const {token} = req.body;
    try {
        const user = jwt.verify(token,JWT_SECRET);
        const useremail = user.email;
        User.findOne({email:useremail}).then(
            (data)=>{
                res.send({status:"ok",data:data});
            }
        )
        .catch((error)=>{
            res.send({status:"error",data:"error"});
        })
    } catch (error) {
        res.send({status:"something went wrong"});
    }
});

app.post("/createProfile",upload.single('guideImage'), async (req, res) => {
  const {
    fullname,
    bio,
    location,
    mobileno,
    price,
    experience,
    email
  } = req.body;
  try {
    await Guide.create({
      fullname: fullname,
      bio : bio,
      location: location,
      mobileno: mobileno,
      price: price,
      experience: experience,
      imgsrc: req.file.filename,
      email:email,
    });
    res.send({ status: "ok" });
  } catch (error) {
    // console.log(error);
    res.send({ status: "something went wrong" });
  }
});

app.get("/guides",async(req,res)=>{
    let guides = await Guide.find();
    res.send(guides);
});

app.get("/guides/:chosenState",async(req,res)=>{
    let guides = await Guide.find({
        "$or":[
            {"location":{$regex:req.params.chosenState}}
        ]
    });
    res.send(guides);
});
app.use('/profileimages', express.static('./public/uploads'));
//http://localhost:5000/profileimages/1672320770989ratantata.jpg


app.delete("/deleteProfile",async(req,res)=>{
  const {email} = req.body;
  console.log(email);
  try {
    let data = await Guide.deleteOne({email:email});
    console.log(data);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
})

app.listen(5000, () => {
  console.log("Server started");
});
