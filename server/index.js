const express = require('express');
const request = require('request');
const path = require('path');
const md5 = require('md5')
const cors = require('cors');
const multer = require('multer');
const bodyParser = require("body-parser")

const User = require("./models/user")
const { connect } = require('./connectDb');


const localIP = Object.values(require('os').networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat(i.family === 'IPv4' && !i.internal && i.address || []), [])), [])
const port = 8080;

const app = express()

app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'uploads/')));
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
//app.use(multer({ dest: "uploads" }).single("filedata"));

connect();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads/'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage })

//Загрузка фото
app.post('/upload', upload.fields([{ name: "image-file", maxCount: 1 }]), async (req, res) => {
    console.log('Incoming POST ./signin ->', req.files['image-file'][0].path)
    return res.json({
        image_path: req.files['image-file'][0].path
    });
})

//Регистрация
app.post('/signin', async (req, res) => {
    console.log('Incoming POST ./signin ->', req.body)
    // let {
    //     username,
    //     password,
    //     avatar,
    // } = req.body;
    try {
        // if (avatar) {
        //     //
        // }
        // let user = await User.create({
        //     login: username,
        //     password: md5(password)
        // });

        // console.log(" User created! ->", user);
        //  res.json({ login: username, avatar: avatar });

        return res.json({
            image: req.file.path
        });

    } catch (e) {
        console.log('Error with DB:', e);
        res.send(`Error with  DB: ${e}`);
    }
})


// Вход пользователя
app.post('/login', async (req, res) => {
    console.log('Incoming POST ./login ->', req.body)
    let {
        username,
        password,
    } = req.body;
    try {
        // console.log('Users', await User.find())
        let user = await User.findOne({
            login: username
        });
        // console.log(await User.find(), user)
        if (!user) return res.status(401).send("Unautorized")
        if (md5(password) !== user.password) return res.status(401).send("Unautorized")
        console.log(" User autorized! ->", user);
        res.json({ login: username });
    } catch (e) {
        console.log('Error with DB:', e);
        res.send(`Error with  DB: ${e}`);
    }
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;