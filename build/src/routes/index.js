"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.render("routes/home");
});
router.get("/signup", (req, res) => {
    res.render("routes/signup");
});
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_1.default(req.body);
    const userReg = yield user.save();
    res.redirect(`/publics/user/${userReg._id}`);
}));
router.get("/signin", (req, res) => {
    res.render("routes/signin");
});
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { email, password } = req.body;
    const query = yield user_1.default.findOne({ email });
    if (password == query.password) {
        res.redirect(`/publics/user/${query._id}`);
    }
    else {
        req.flash('error', 'the data entered is invalid');
        res.redirect(req.path);
    }
}));
router.get('/publics/user/:_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const user = yield user_1.default.findById(_id).exec();
    res.render('routes/userView', user);
}));
router.get('/publics/user/:_id/edit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const userFind = yield user_1.default.findById(_id).exec();
    res.render('routes/edit', userFind);
}));
router.post('/publics/user/:_id/edit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { _id } = req.params;
    console.log(req.file);
    // Extraed information from body
    const { username, email, password, description, linkFb, linkWsp, linkGit } = req.body;
    const dataUpdate = {
        username,
        email,
        password,
        description,
        socialLinks: {
            linkFb,
            linkWsp,
            linkGit,
        }
    };
    // edit avatar
    const newAvatar = (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname;
    if (newAvatar) {
        yield user_1.default.findOneAndUpdate({ _id }, { avatar: `/uploads/${newAvatar}` });
    }
    // edit information
    yield user_1.default.findByIdAndUpdate({ _id }, dataUpdate);
    res.redirect(`/publics/user/${_id}`);
}));
exports.default = router;
