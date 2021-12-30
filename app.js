const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const PORT = process.env.PORT || 3000;
const app = express();
const sessionRouter = require('./src/router/sessionsRouter');
const adminRouter = require('./src/router/adminRouter');
const authRouter = require('./src/router/authRouter');
const googleRouter = require('./src/router/googleRouter');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'globomantics' }));

require('./src/config/passport.js')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/sessions', sessionRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/google', googleRouter);

app.get('/', (req, res)=> {
    res.render('index', { title: 'Node js', data: ['a', 'b', 'c'] });
});

app.listen(PORT, ()=> {
    debug(`listening on port ${chalk.green(PORT)}`);
});