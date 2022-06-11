//CONFIGURATION SERVER

import express from "express";
import { engine } from "express-handlebars";
import session from 'express-session';
import flash from 'connect-flash';
import multer from 'multer';

import path from "path";
import morgan from "morgan";

//IMPORT LOCAL
import routesHero from "./routes/index";

const app = express();
import "./database";

app.set("port", process.env.PORT || 3000);
app.set("views", process.cwd() + "/src/views");

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout: "main",
  })
);
app.set("view engine", ".hbs");

app.use(session({ 
  secret: 'v$werve crudDecember',
  resave: false,
  saveUninitialized: false
}))

// Cfg  multer
const storage = multer.diskStorage({
  destination: path.join(process.cwd(), 'src/public/uploads/'),
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

app.use(multer({
  storage: storage,
  dest: path.join(process.cwd(), 'src/public/uploads/'), 
}).single('avatar'));

app.use(flash());
app.use(morgan("dev"));
app.use(express.static(path.join(process.cwd() + "/src/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  app.locals.error = req.flash('error');
  next();
})

//Use routes imported
app.use(routesHero);

app.listen(app.get("port"), () => {
  console.log("server on port " + app.get("port"));
});

