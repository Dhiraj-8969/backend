const express = require('express');
const router = express.Router();
const Menu = require('./../models/menuItem');

router.post('/', async(req, res) => {
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

router.get('/', async(req, res) => {
    try {
        const data = await Menu.find();
        console.log('Data fetched');
        res.status(200).json(data)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.get('/:taste', async(req, res) => {
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

module.exports = router;