const http    = require('http');
const marker = require('@ajar/marker'); 

require('dotenv').config();
const { PORT, HOST } = process.env;

//create an http web server
const server = http.createServer( (req,res)=> {
    const start = process.hrtime();
   
    res.end(`Hello from server`,()=> { 
        const [seconds,nanoseconds] = process.hrtime(start);
        const milliseconds = seconds * 1000 + nanoseconds / 1e6;
        marker.magenta(req.method,req.url,`, ${milliseconds} ms ⏱️ `);
    });
    
});

//have the server listen to a given port
server.listen(PORT,HOST, err => {
    if(err) marker.error(err);
    else marker.magenta(`🌎  listening on`,`http://${HOST}:${PORT}`);
});
