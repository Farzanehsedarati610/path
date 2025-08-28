var trace = require('jstrace');
var http = require('http');

var ids = 0;

var server = http.createServer(function(req, res){
  var id = ++ids;

  trace('request:start', { id: id });
  setTimeout(function(){

    res.end('hello world');
    trace('request:end', { id: id });
  }, Math.random() * 250 | 0);
});
exports.local = function(traces){
  traces.on('request:*', function(trace){
    console.log(trace);
  });
};
exports.remote = function(traces){
  traces.on('api:buffer', function(trace){
    console.log(trace.buffer.length);
  });
};
exports.remote = function(traces){
  traces.on('api:buffer', function(trace){
    // will automatically be cleaned up
  });

  var id = setInterval(function(){
    console.log(Date.now());
  });

  traces.on('cleanup', function(){
    clearInterval(id);
  });
};
server.listen(3000);
