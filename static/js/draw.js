// functions
function findpoint(pixelmap, i, j){
		// finds the index of position x, y on the pixel map
		return {x: j * pixelmap.ratiox, y: i * pixelmap.ratioy}
	}

function drawland(pixelmap, mapkey){
	let map = pixelmap.map
	for(let row = 0; row < pixelmap.map.length; row++)
		for(let col = 0; col < pixelmap.map[row].length; col++){
			let tile = map[row][col]
			let imgwidth = pixelmap.canvaswidth / map[row].length
			let imgheight = pixelmap.canvasheight / map.length
			let x = imgwidth * col
			let y = imgheight * row
			image(mapkey['t'], x, y, imgwidth, imgheight)
			if (tile === 'w')
				image(mapkey['w'], x, y, imgwidth, imgheight)
		}
}


function drawhazards(pixelmap, mapkey){
	let map = pixelmap.map
	for(let row = 0; row < pixelmap.map.length; row++)
		for(let col = 0; col < pixelmap.map[row].length; col++){
			let tile = map[row][col]
			if (tile !== s && tile !== t){
				let imgwidth = pixelmap.canvaswidth / map[row].length
				let imgheight = pixelmap.canvasheight / map.length
				let x = imgwidth * col
				let y = imgheight * row
				image(mapkey[tile], x, y, imgwidth, imgheight)
			}
		}
}

function drawtile(pixelmap, mapkey, row, col){
	let map = pixelmap.map
	if (row >= map.length || col >= map[row].length)
		return;
	let tile = map[row][col]
	let imgwidth = pixelmap.canvaswidth / map[row].length
	let imgheight = pixelmap.canvasheight / map.length
	let x = imgwidth * col
	let y = imgheight * row
	image(mapkey['t'], x, y, imgwidth, imgheight)
	image(mapkey[tile], x, y, imgwidth, imgheight)
}

function drawhazard(pixelmap, mapkey, row, col){
	let map = pixelmap.map
	if (row >= map.length || col >= map[row].length)
		return;
	let tile = map[row][col]
	if (tile !== s && tile !== t){
				let imgwidth = pixelmap.canvaswidth / map[row].length
				let imgheight = pixelmap.canvasheight / map.length
				let x = imgwidth * col
				let y = imgheight * row
				image(mapkey[tile], x, y, imgwidth, imgheight)
			}
}

function refreshtiles(){

}

//home
let dir = 'static/lockusprites/';
//let h='h', t='t', s='s', w='w', sp='sp', p='p', b='b', bb='bb', bbb='bbb'
// these variables defined in main

let mapkeydemo = {t: undefined, h: undefined, w: undefined}

const R = 0, L = 1, U = 2, D = 3; 
let char = 'Zack'
let chargirl = 'Zoe'
let charalien = 'alien'

const poses = ['Right', 'Left', 'Back', 'Front'];
let bg = 0;
let cw = 1000
let ch = 2000
let m = 
[
[h, h, h, h, h, h, h, h, h, h],
[s, t, t, t, t, t, t, t, t, t],
[h, h, h, h, h, h, h, h, t, t],
[t, t, t, t, t, t, t, t, t, t],
[h, h, h,t, t, h, h, h, h, h],
[sp, t, t, t, t, t, t, t, t, t],
[h, h, w, w, w, w, w, w, h,h],
[t, t, t, t, t, t, t, t, t, t],
[h, h, t, t, h, h, t, t, h, h],
[h, h, h, h, sp, h, h, h, h, h]
]
let pixelmapdemo = {
	map: dungeon,
	canvaswidth: cw,
	canvasheight: ch,
	ratiox: cw / m.length,
	ratioy: ch / m[0].length
}

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

	mapkeydemo['t'] = loadImage(dir + 'tilegrass.png')
	mapkeydemo['h'] = loadImage(dir + 'tiletree.png')
	mapkeydemo['w'] = loadImage(dir + 'tilewater.png')
	mapkeydemo['s'] = loadImage(dir + 'tilegrass.png')
	mapkeydemo['sp'] = loadImage(dir + 'tilepurpletree.png')
	mapkeydemo['p'] = loadImage(dir + 'tileactivetree.png')
	mapkeydemo['b'] = loadImage(dir + 'tiledarktree.png')
	mapkeydemo['bb'] = loadImage(dir + 'tiledarktree.png')
	mapkeydemo['bbb'] = loadImage(dir + 'tiledarktree.png')
}

function setup(){
	let canvaswidth = pixelmapdemo.canvaswidth
	let canvasheight = pixelmapdemo.canvasheight
	home.pixelmap = pixelmapdemo
	console.log(home.pixelmap)
	let canvas = createCanvas(canvaswidth, canvasheight)
	canvas.parent('canvasdiv')
	//uinterface.canvasdiv.appendChild(canvas)
	let pixelmap = home.pixelmap
	background(bg)
	drawland(pixelmap, mapkeydemo)
	drawhazards(pixelmap, mapkeydemo)
}

function draw(){
	let pixelmap = home.pixelmap
	let map 	 = pixelmap.map
	if (frameCount % 60 == 0){
		background(bg); // move this
		drawland(pixelmap, mapkeydemo) // replace this 
	}
	stroke(0);
	fill(150);

	// cleans character tile
	for (let [key, value] of Object.entries(home.others)){
		let player = value;
		let x = player.x;
		let y = player.y;
		let idx = player.findindex(x, y)
		drawtile(pixelmap, mapkeydemo, idx['row'], idx['col'])
		drawtile(pixelmap, mapkeydemo, idx['row'] + 1, idx['col'])
		drawtile(pixelmap, mapkeydemo, idx['row'], idx['col'] + 1)
	}

	for (let [key, value] of Object.entries(home.files)){
		if(home.selectedfile !== undefined && home.selectedfile === value)
			stroke(255)
		else stroke(0)
		rect(value.x, value.y, 10, 15);
	}

	for (let [key, value] of Object.entries(home.others)){
		let player = value;
		let x = player.x;
		let y = player.y;
		player.update();
		player.timer += 1;
		let img = player.image;
		image(img, x, y, 25, 40);
		home.deleteOther(player);
		room.roomcanvas.scroll()
	}
	//if (frameCount % 60 == 0){
	//	drawhazards(pixelmap, mapkeydemo)
	//}
}
