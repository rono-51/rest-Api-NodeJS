import express from 'express';
import {engine} from 'express-handlebars';
import path from 'path';
import morgan from 'morgan'

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', process.cwd() + '/src/views');

app.engine('.hbs', engine({
    extname: '.hbs', 
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
}));
app.set('view engine', '.hbs')

app.use(morgan('dev'))
app.use(express.static(path.join(process.cwd(), 'src/public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.listen(app.get('port'), () => {
    console.log('server on port ' + app.get('port'));
});

