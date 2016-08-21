var express=require('express')
var fs=require('fs')
var port=(process.env.PORT || 3000)
var app=express()
app.get('/',function(req,res){
    res.writeHead(200,{'content-type':'text/plain'})
    var src=fs.createReadStream('readme.md');
    src.pipe(res);
})

app.get('/api/whoami',function(req,res){
  var userAgent=req.headers['user-agent'].split('(')[1];
  var os=userAgent.split(')')[0];
  var ipAddr = req.headers["x-forwarded-for"];

  if (ipAddr){
    var list = ipAddr.split(",");
    ipAddr = list[list.length-1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }
    console.log(ipAddr);
  var object={
    "ipaddress":ipAddr||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress,
    "language":req.headers['accept-language'].split(',')[0],
    "software":os
  }
  console.log(object);
  res.send(object);
})
app.listen(port)
