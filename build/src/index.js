"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = require("express-handlebars");
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.set('port', process.env.PORT || 3000);
app.set('views', process.cwd() + '/src/views');
app.engine('.hbs', (0, express_handlebars_1.engine)({
    extname: '.hbs',
    layoutsDir: path_1.default.join(app.get('views'), 'layouts'),
    partialsDir: path_1.default.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
}));
app.set('view engine', '.hbs');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.static(path_1.default.join(process.cwd(), 'src/public')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(app.get('port'), () => {
    console.log('server on port ' + app.get('port'));
});
