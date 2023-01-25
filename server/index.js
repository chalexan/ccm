const express = require('express');
const path = require('path');
const md5 = require('md5')
const cors = require('cors');
const multer = require('multer');
const bodyParser = require("body-parser")

const User = require("./models/user")
const { connect } = require('./connectDb');


const localIP = Object.values(require('os').networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat(i.family === 'IPv4' && !i.internal && i.address || []), [])), [])
const port = 8080;
const pathway = path.join(__dirname, 'uploads');
const app = express()

app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(pathway));
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

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
    console.log('Incoming POST ./upload ->', req.files['image-file'][0])
    return res.json({
        image_path: req.files['image-file'][0].filename
    });
})

//Регистрация
app.post('/signin', async (req, res) => {
    console.log('Incoming POST ./signin ->', req.body)
    let {
        username,
        password,
        avatar,
    } = req.body;
    try {
        let user = await User.create({
            login: username,
            avatar,
            password: md5(password)
        });
        console.log(" User created! ->", user);
        return res.json({ login: username, avatar: avatar });
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
        let user = await User.findOne({
            login: username
        });
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