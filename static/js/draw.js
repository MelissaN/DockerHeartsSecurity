
//home

const R = 0, L = 1, U = 2, D = 3; 
let char = 'Zack'
let chargirl = 'Zoe'
let charalien = 'alien'
let dir = 'static/lockusprites/';
const poses = ['Right', 'Left', 'Back', 'Front'];
let bg = 0;

function preload() {
	for (let i = 0; i < 3; i++){
		home.directions[R][i] = loadImage(dir + char + poses[R] + i + '.png')
		home.directions[L][i] = loadImage(dir + char + poses[L] + i + '.png')
		home.directions[U][i] = loadImage(dir + char + poses[U] + i + '.png')
		home.directions[D][i] = loadImage(dir + char + poses[D] + i + '.png')

		home.dirgirl[R][i] = loadImage(dir + chargirl + poses[R] + i + '.png')
		home.dirgirl[L][i] = loadImage(dir + chargirl + poses[L] + i + '.png')
		home.dirgirl[U][i] = loadImage(dir + chargirl + poses[U] + i + '.png')
		home.dirgirl[D][i] = loadImage(dir + chargirl + poses[D] + i + '.png')
			
		home.diralien[R][i] = loadImage(dir + charalien + poses[R] + i + '.png')
		home.diralien[L][i] = loadImage(dir + charalien + poses[L] + i + '.png')
		home.diralien[U][i] = loadImage(dir + charalien + poses[U] + i + '.png')
		home.diralien[D][i] = loadImage(dir + charalien + poses[D] + i + '.png')

		home.directionsalt[R][i] = loadImage(dir + 'snake' + poses[R] + i + '.png')
		home.directionsalt[L][i] = loadImage(dir + 'snake' + poses[L] + i + '.png')
		home.directionsalt[U][i] = loadImage(dir + 'snake' + poses[U] + i + '.png')
		home.directionsalt[D][i] = loadImage(dir + 'snake' + poses[D] + i + '.png')
	}
}

function setup(){
	let canvas = createCanvas(3000, 3000)
	canvas.parent('canvasdiv')
	//uinterface.canvasdiv.appendChild(canvas)
	background(bg)
}

function draw(){
	background(bg);
	stroke(0);
	fill(150);
	for (let [key, value] of Object.entries(home.files)){
		if(home.selectedfile !== undefined && home.selectedfile === value)
			stroke(255)
		else stroke(0)
		rect(value.x, value.y, 10, 15);
	}
	let oListCopy = home.othersList.slice();
	for (let pid of oListCopy){
		let player = home.others[pid];
		player.update();
		player.timer += 1;
		let img = player.image;
		let x = player.x;
		let y = player.y;
		image(img, x, y);
		home.deleteOther(player);
		room.roomcanvas.scroll()
	}
}
