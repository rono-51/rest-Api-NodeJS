"use strict";
//CONFIGURATION SERVER
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = require("express-handlebars");
const express_session_1 = __importDefault(require("express-session"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
//IMPORT LOCAL
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
require("./database");
app.set("port", process.env.PORT || 3000);
app.set("views", process.cwd() + "/src/views");
app.engine(".hbs", (0, express_handlebars_1.engine)({
    extname: ".hbs",
    layoutsDir: path_1.default.join(app.get("views"), "layouts"),
    partialsDir: path_1.default.join(app.get("views"), "partials"),
    defaultLayout: "main",
}));
app.set("view engine", ".hbs");
app.use((0, express_session_1.default)({
    secret: 'v$werve crudDecember',
    resave: false,
    saveUninitialized: false
}));
// Cfg  multer
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(process.cwd(), 'src/public/uploads/'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
app.use((0, multer_1.default)({
    storage: storage,
    dest: path_1.default.join(process.cwd(), 'src/public/uploads/'),
}).single('avatar'));
app.use((0, connect_flash_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.static(path_1.default.join(process.cwd() + "/src/public")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    app.locals.error = req.flash('error');
    next();
});
//Use routes imported
app.use(index_1.default);
app.listen(app.get("port"), () => {
    console.log("server on port " + app.get("port"));
});


