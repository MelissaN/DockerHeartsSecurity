var socket = io.connect('http://18.221.73.238');

socket.on('connect', function(){
	socket.send('User has connected!');
});

