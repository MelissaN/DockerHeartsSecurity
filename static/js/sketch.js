///////////////////////////////////
/////// functions 
/////////////////////////////////////////
function deleteOther(other)  {
	if (other.uid !== uid && other.timer >= 3600 * 8)
	{
		others[other.uid] = undefined;
		let x = othersList.indexOf(other.uid)
		if (x > -1)
			othersList.splice(x, 1);
	}
}
function updateOthers(other) {
//	console.log(other);
	if (others[other.uid] === undefined)
	{
		others[other.uid] = new Character(directions);
		othersList.push(other.uid);
		others[other.uid].uid = other.uid;
	}
	let zeno = others[other.uid];
	zeno.timer = 0;
	if (other.uid !== uid)
	{
		zeno.direction = other.direction;
		zeno.walking = other.isWalking;
		zeno.xx = other.xx;
		zeno.yy = other.yy;
	}


}
////////////////////////////////////////


///////////////////////////////////////////
///////// load in all images /////////////
//////////////////////////////////////////
const R = 0, L = 1, U = 2, D = 3; 
let directions = [[], [], [], []] // holds all images
let char = 'Zack', dir = 'static/lockusprites/';
const poses = ['Right', 'Left', 'Back', 'Front'];
let bg = 0;

function preload() {
	for (let i = 0; i < 3; i++){
		directions[R][i] = loadImage(dir + char + poses[R] + i + '.png')
		directions[L][i] = loadImage(dir + char + poses[L] + i + '.png')
		directions[U][i] = loadImage(dir + char + poses[U] + i + '.png')
		directions[D][i] = loadImage(dir + char + poses[D] + i + '.png')
	}
}

////////////////////////////////////////////
////////////////////////////////////////////
///////////////////////////////////////////
/////////  create user's character ////////
///////////////////////////////////////////
let frames = 0;
let REFRESH = 600;
let socket = io.connect('http://18.221.73.238');
let uid = Date.now();
let others = {};
let othersList = [];
//others[uid] = new Character(directions);
updateOthers({uid:uid, isWalking:0, direction:3});
let zatch = others[uid];
socket.uid = uid;
/////////////////////////////////////////////////////
//// keyboard needs socket object to do emits. ///////
//////////////////////////////////////////////////
let keyboard = new Keyboard(document, zatch, socket); 
///////////////////////////////////////////////////
///////////////////////////////////////////
socket.on('update', updateOthers);
/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
/////////   setup function ///////////
//////////////////////////////////////
function setup(){
	createCanvas(500, 500)
	background(bg)
}
/////////////////////////////////////////////////////////////////////////////////////////
/////////// drawing phase //////////////////////
///////////////////////////////////////////////

function draw(){
	background(bg);
	frames += 1;
	oListCopy = othersList.slice();
	for (let pid of oListCopy){
		let player = others[pid];
		player.update();
		player.timer += 1;
		let img = player.image;
		let x = player.x;
		let y = player.y;
		image(img, x, y);
		deleteOther(player);
	}
//	socket.emit("update", 
//		{direction:me.direction,
//		uid:uid, isWalking: me.isWalking,
//		xx:me.xx, yy:me.yy});
/*
	zatch.update();
	let img = zatch.image;
	let x = zatch.x;
	let y = zatch.y;
	image(img, x, y);
*/
}

////////////////////////////////////////////////
////////////////////////////////////////////////
