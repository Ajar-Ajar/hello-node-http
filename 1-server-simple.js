const http    = require('http');
const marker = require('@ajar/marker'); 

require('dotenv').config();
// const PORT = process.env.PORT;
// const HOST = process.env.HOST;
const { PORT, HOST } = process.env;

//create an http web server
const server = http.createServer( (req,res)=> {
    res.end(`Hello from server`);
    marker.magenta(req.method,req.url);
});

//have the server listen to a given port
server.listen(PORT,HOST, err => {
    if(err) marker.error(err);
    else marker.magenta(`🌎  listening on`,`http://${HOST}:${PORT}`);
});
