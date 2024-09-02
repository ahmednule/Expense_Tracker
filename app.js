const { sequelize, user, expenses } = require('./models');

const express = require('express');
const app = express();
const port = 3000;

const bcrypt = require('bcrypt');
const session = require('express-session');

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/signup', async (req, res) => {
    res.render('signup');
});

app.get('/login', async (req, res) => {
    res.render('login');
});

app.post('/signup', async (req, res) => {
    const {name, email, password1} = req.body;
    const hashedPassword = await bcrypt.hash(password1, 10);
    try{
        const User = await user.create({name, email, password1:hashedPassword});
        res.render('login');	
    }
    catch(err) {
        console.log(err);
        return res.status(500).send('Error');
    }
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const user1 = await user.findOne({where: {email, password1: password}});
    if (user1) {
        // res.render('dashboard', {name: user1.name});
        res.send('Welcome');
    } else {
        res.render('login');
        res.status(401).send('Invalid credentials');
    }
});



app.get('/dashboard', async (req, res) => {
    res.render('dashboard');
});

app.post('/dashboard', async (req, res) => {
    const {initialamount, description, amount} = req.body;

    try{
        const Expense = await expenses.create({initialamount, description, amount});
        res.render('dashboard', {initialamount: Expense.initialamount, description: Expense.description, amount: Expense.amount});
    }
    catch(err) {
        console.log(err);
        return res.status(500).send('Error');
    }
});




app.listen(port, async () => {
  console.log(`app listening at http://localhost:${port}`);
 await sequelize.authenticate();
    console.log('Connection to the database been established successfully.');
});