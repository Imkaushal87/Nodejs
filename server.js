const http = require("http");

const server = http.createServer(function(req,res){
    if(req.url === "/getSecretData"){
        res.end("Threr are no secret data.");
    }

    res.end("Hello world!");
});

server.listen(5000);