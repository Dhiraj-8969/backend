const express = require('express');
const app = express();
const db = require('./db.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const path = require('path')

//middleware function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next();
}
app.use(logRequest);
app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

const menuRoutes = require('./routes/menuRoutes.js');
const personRoutes = require('./routes/personRoutes.js');
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(3000, () => {
    console.log('listening on port 3000');
})