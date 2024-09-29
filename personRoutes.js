const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const passport = require('../auth.js');
const app = express();
app.use(passport.initialize());

// const localAuthMiddleware = passport.authenticate('local', {
//     session: false
// });

const { jwtAuthMiddleware, generateToken } = require('./../jwt')
router.post('/signup', async(req, res) => {
    try {
        const data = req.body
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');
        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("token is: ", token);
        res.status(200).json({ response: response, token: token });
        // res.cookie("jwt", token, {
        //     expires: new Date(Date.now() + 300),
        //     httpOnly: true
        // });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
//login Router
router.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Person.findOne({ username: username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);
        console.log(token);
        res.status(200).json(token);
        // res.cookie("jwt", token, {
        //     expires: new Date(Date.now() + 300),
        //     httpOnly: true
        // });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erorr: 'Internal server Error' });
    }
})
router.get('/profile', jwtAuthMiddleware, async(req, res) => {
    try {
        const userData = req.user;
        const userId = userData.id;
        const user = await Person.findById(userId);
        res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erorr: 'Internal server Error' });
    }
})
router.get('/', jwtAuthMiddleware, async(req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/:worktype', async(req, res) => {
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
router.put('/:id', async(req, res) => {
    try {
        const personId = req.params.id;
        const updataPersonDatd = req.body;
        const response = await Person.findByIdAndUpdate(personId, updataPersonDatd, {
            new: true,
            runValidators: true,
        });

        if (!response) {
            return res.status(404).json({ erorr: 'Person not found' })
        }
        console.log('data updated');
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Erorr' });
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            return res.status(404).json({ erorr: 'Person not found' })
        }
        console.log('data delete');
        res.status(200).json({ message: 'person Deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Erorr' });
    }
})

module.exports = router;