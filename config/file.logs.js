const fs = require('fs');
const path = require('path');

const logsStream = fs.createWriteStream( path.join(__dirname , ".." , "logs" , "morgan.log" ) , { flags : 'a'}) 

module.exports = { logsStream } ;