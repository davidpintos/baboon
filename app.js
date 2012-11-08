express = require('express');
app = module.exports = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');  
  app.use(express.static(__dirname + '/public'));
});

require('./routes')(app);
io = require('socket.io');


server = app.listen(8080);
sio = io.listen(server);
sio.sockets.on('connection', function (socket) {
    
    socket.on('startLine',function(e){
		console.log('Dibujando...');
		sio.sockets.emit('down',e);
	});

	socket.on('closeLine',function(e){
		console.log('Trazo Terminado');
		sio.sockets.emit('up',e);
	});

	socket.on('draw',function(e){
		sio.sockets.emit('move',e);
	});

	socket.on('clean',function(){
		console.log('Pizarra Limpia');
		sio.sockets.emit('clean',true);
	});

});
