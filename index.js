var app = require('./server/server.js');

var port = process.env.PORT || 8081;

app.listen(port);

console.log('server listening on port ', port);