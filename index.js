// var fs = require('fs');
// var os = require('os');
// var user = os.userInfo();
// console.log(user.username);
// fs.appendFile('greeting.txt', 'Hi ' + user.username + '!\n', () => {
//     console.log('file is created');
// })
// console.log(fs);

var _ = require('lodash')
var notes = require('./note.js');

var age = notes.age;
var a = notes.addnum(age, 10);
console.log(a);

var data = ['person', 'person', 1, 4, 'name', 'name', 1, 2];
var dataf = _.uniq(data);
console.log(dataf);