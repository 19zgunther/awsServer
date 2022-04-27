const data = `
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gunther</title>
</head>
<body style='background-color: rgba(30,30,30);'>
    <div style='color: white;'>
        Hello! This is the ttle..
    </div>
    <script>
        var ws = new WebSocket("ws://44.204.206.141:4000/");

        ws.addEventListener("open", () => {
                console.log("Connected - client");
                ws.send("How are you?");
        });
        
        ws.addEventListener('message', function (event) {
                console.log(event.data);
        });

        setInterval(function() {
                ws.send("My time is now");
        }, 5000);

    </script>
</body>
`

const http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(data);
  console.log("Request made to server.");
}).listen(3000);
console.log('Server running on Amazon EC2');

const websocket = require('ws');
const wss = new websocket.Server({port:4000});

wss.on("connection",  ws => {
    console.log("new client connected");
    // sending message
    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`)
    });
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has connected");
            });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});

        
