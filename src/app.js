import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';

// Define __filename and __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { registerUser } from './controllers/user.controller.js'

const app = express()

// configuring cors 
// allowing all website origins to acess our website
// app.use(
//     cors({
//         origin:process.env.CORS_ORIGIN,
//         credentials:true

//     })
// )


app.use(cors(
))
// app.use(cors({
//   origin: 'https://mycollege-deploy-git-main-nishants-projects-abe79550.vercel.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.use(express.static(path.resolve(__dirname, "frontend", "build")));
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });

//on refresh was not able to get this page on deplpyment because of this statement not mentioned
// server sends .get /login query which get from below statement. 
// server is requesting client routes.
app.get("/login", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });

app.get("/student-signup", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
  app.get("/teacher-signup", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
  app.get("/update-account", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
  app.get("/update-avatar", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
  app.get("/all-courses", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
  app.get("/my-courses", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
  app.get("/hallticket", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });

  app.get("/add-course", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
  app.get("/course/:courseId", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
  app.get("/all-notifications", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
  app.get("/events", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
  app.get("/today-events", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
  app.get("/other-events", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
  app.get("/add-event", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
  app.get("/my-events", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
  app.get("/event/:eventId", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
  app.get("/marksheet", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
  app.get("/applications", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
  
  app.get("/applicant/:applicantid", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });


// this is to configure how much json data will be accepted by server
// do it
app.use(express.json({limit: "16kb"}))

// as we open google .com and search something that appears on the url like google.com+Nishant this + is encoding
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.urlencoded({extended:false}))
// this is to store files we want to store for us
app.use(express.static("public"))
// this is to configure users cookies
app.use(cookieParser())


console.log("hi");


// routing 
import userRouter from './routes/user.routes.js'

import courseRouter from './routes/course.routes.js'

import notificationRouter from './routes/notification.routes.js'

import eventRouter from './routes/event.routes.js'

import notesRouter from './routes/notes.routes.js'

import applicationRouter from './routes/application.routes.js'

import marksheetRouter from './routes/marksheet.routes.js'
// route declaration


// so when url is http://localhost:8000/api/v1/users we go to userrouter ie inside user.routes.js
console.log("user router");
app.use('/api/v1/users',userRouter)

app.use('/api/v1/courses',courseRouter)

app.use('/api/v1/notifications',notificationRouter)

app.use('/api/v1/events',eventRouter)

app.use('/api/v1/notes',notesRouter)

app.use('/api/v1/applications',applicationRouter)

app.use('/api/v1/marksheets',marksheetRouter)

export {app}
