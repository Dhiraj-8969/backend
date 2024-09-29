const express = require('express');
const app = express();
const db = require('./db.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person = require('./models/Person.js');
const Menu = require('./models/menuItem.js');

app.get('/', () => {
    res.send('welcome to my hotel... How i can help you ?,we have list of menus')
})

app.post('/parson', async(req, res) => {
    try {
        const data = req.body
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/person', async(req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/Menu', async(req, res) => {
    try {
        const data = req.body
        const newMenu = new Menu(data);
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/menu', async(req, res) => {
    try {
        const data = await Menu.find();
        console.log('Data fetched');
        res.status(200).json(data)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }
})
app.get('/person/:worktype', async(req, res) => {
    try {
        const worktype = req.params.worktype;
        if (worktype == 'manager' || worktype == 'chef' || worktype == 'waiter') {
            const response = await Person.find({ work: worktype });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: "invalid work type" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Erorr' });
    }
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})