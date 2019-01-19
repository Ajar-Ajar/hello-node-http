const http    = require('http');
const marker = require('@ajar/marker'); 
const {White,Yellow,Magenta,Red} = marker.constants;

require('dotenv').config();
const { PORT, HOST } = process.env;

const server = http.createServer((req,res)=> {

        const start = process.hrtime();
        
        let content;
        // res.setHeader('Content-Type', 'text/plain')
        res.setHeader('Content-type','text/html')
        res.statusCode = 200;
        let status_color = Yellow;

        //basic routing
        switch (req.url){
            case '/':
                content = template('<< Welcome home >>')
                break;
            case '/users':
                content = template('They say each User has a Persona')
                break;
            case '/places':
                content = template("Oh, the Places<br/>You'll Go!")
                break;
            default :
                res.statusCode = 404;
                status_color = Red;
                content = template("Not all who wonder<br/>are lost...")
        }

        //write an <html> string response to the browser
        res.end(content, summarize);

        function summarize(){
            const [seconds,nanoseconds] = process.hrtime(start);
            const milliseconds = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);
            marker.cyan(`${req.method} ${White}${req.url} :: ${status_color}${res.statusCode}`,`| ${Magenta}${milliseconds} ms`);
        }
        
});

server.listen(PORT,HOST, err => {
    if(err) marker.error(err);
    else marker.magenta(`🌎  listening on`,`http://${HOST}:${PORT}`);
});

function template(msg){
    const styles = `
            body{
                font-family:arial;
                text-align:center;           
            }
            h1 {           
                margin:25vh auto;
                border:dashed cyan 3px;
                border-radius:12px;
                padding:2rem;
                width:22rem;
            }
            nav{
                border:lightgrey 1px dashed;
                display:flex;
                justify-content:center;
            }
            nav a{
                margin:1rem;
                color:darkgrey;
                font-weight:bold;
                text-decoration:none;
            }
            `

    return `
        <html>
            <head>
                <style>${styles}</style>
            </head>
            <body>
                <nav>
                    <a href="/">Home</a>
                    <a href="/users">Users</a>
                    <a href="/places">Places</a>
                    <a href="/wildcard">wildcard</a>
                </nav>
                <h1>${msg}</h1>
            </body>
        </html>
    `   
}