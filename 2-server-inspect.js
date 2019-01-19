const http    = require('http');
const url     = require('url');
const marker = require('@ajar/marker'); 
const {White,Yellow,Magenta,Red} = marker.constants;

require('dotenv').config();
const { PORT, HOST } = process.env;

//create an http web server
const server = http.createServer( (req,res)=> {
       //write the response header
       res.setHeader('some-header','some-value');
       res.writeHead(200,{
           'Content-type':'text/plain',
           'some':'ting',
           'agenda':'sports'
        });
       
       const parsedUrl = url.parse(req.url,true);
       const pathname = parsedUrl.pathname;
       const queryStringObject = parsedUrl.query;
       const headers = req.headers;

        //log the request method + url + response status code
       marker.cyan(`req.url:`,req.url);
       marker.cyan(`method:`,req.method);
       marker.cyan(`status:`,res.statusCode);
       marker.cyan(`pathname:`,pathname);
       marker.obj(queryStringObject,`queryStringObject: `);
       marker.obj(headers,`headers:`);
       marker.cyan(`user-agent:`,headers['user-agent']);
       marker.cyan(`host:`,headers.host);
       marker.cyan(`referer:`,headers.referer);
       marker.cyan(`connection:`,headers.connection);

       //console.dir(headers)

       res.end(`response from server`);
       // test this url in the browser: 
       // http://localhost:3000/users/lister?month=April&temp=32
});

server.listen(PORT,HOST, err => {
    if(err) marker.error(err);
    else marker.magenta(`🌎  listening on`,`http://${HOST}:${PORT}`);
});
