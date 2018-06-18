/* Character Class

Class needs to be controllable from the keyboard and from code 
 - Which means the class will have data feilds. 
 - If a keyboard listener is attached, data fields should change accordingly
 - Let's make character with data fields and with functions that change those fields 

 Data Fields 
  - x, y
  - direction
  - frame (0 - 2)
  - img_matrix []
  - current_img

  Keyboard
  - probably a keyboard system exetrnal to the character
  - character can expose an actions api

  Main Methods
   - update()
   	- res = findindex(self.pixelmap, self.x, self.y, self.canvas.width, self.canvas.height)
   	- i = res[0]
   	- j = res[1]
   	- newxx = self.xx + sp * w, newyy = self.yy + sp * w
   	- self.boundaries = findboundaries(self.pixelmap, i, j)
   - findboundaries(pixelmap, i, j)

  Convert character's globalx and globaly to reflect position within current pixel cell
  (perform calculation on position character would like to move to)
  	rx = relative x (to be)
  	cx = this.x (to be)
  	i =  column (to be)
  	ratiox = canvaswidth
	j = row
	ratioy = canvasheight
	
  	rx = cx - (i * ratiox)
  	ry = cy - (j * ratioy)

  	need to send character a pixelmap, canvaswidth, and canvasheight
	
	0. pixelmap, canvaswidth, canvasheight
	00. object matrix
  	1. findindex (canvaswidth / pixelmap.length, canvasheight / pixelmap[xindex].length) (check)
  	then I can 
  		stay within edges (check)
  		decide whether to pass or not, given a new direction, x, and y (check)
  		decide whether to pass or not, given an object (later)
  		spawn (check)
*/

class Character {
	constructor(h) {
		this.home = h;
		this.pixelmap = this.home.pixelmap
		this.map	= this.pixelmap.map

		this.ratioy	= this.pixelmap.canvasheight / this.map.length
		this.ratiox	= this.pixelmap.canvaswidth / this.map[0].length

		this.gender = this.home.gender
		this.img_mtrx = h.directions;
		this.img_girl = h.dirgirl;
		this.img_alien = h.diralien;
		this.img_mtrxalt = h.directionsalt;
		this.heart = true;
		this.spawn = this.spawnpoint(this.map)
		this.x = this.spawn['x'] * this.ratiox;
		this.y = this.spawn['y'] * this.ratioy;
		this.xx = 0;
		this.yy = 0;
		this.cdir = 3;
		this.cframe = 0;
		this.cc = 0;
		this.walkSpeed = 2.4;
		this.isWalking = 0;

	}

	get direction(){
		return this.cdir;
	}
	set direction(dir){
		this.cdir = dir;
	}

	set walking(num){
		this.isWalking = num;
	}

	go(){
		this.isWalking = 1;
	}

	stop(){
		this.isWalking = 0;
	}

	get image(){
		let gen = this.gender
		if (this.heart)
			if (gen == 'boy')
				return this.img_mtrx[this.cdir][this.cframe];
			else if (gen == 'girl')
				return this.img_girl[this.cdir][this.cframe];
			else
				return this.img_alien[this.cdir][this.cframe];
		else
			return this.img_mtrxalt[this.cdir][this.cframe];
	}

	findindex(x, y){
		// finds the index of position x, y on the pixel map
		let pixelmap = this.pixelmap.map
		let width	 = this.pixelmap.canvaswidth
		let height	 = this.pixelmap.canvasheight
		let ratioy	 = height / pixelmap.length

		let i = Math.floor(y / ratioy)
		let ratiox	 = width / pixelmap[i].length
		let j = Math.floor(x / ratiox)

		return {row: i, col: j}
	}

	testedges(x, y, row, col){
		let tile = this.pixelmap.map[row][col]
		if (tile === 'h')
			return false
		if (tile === 'w' && this.heart)
			return false
		return true
	}

	spawnpoint(map){
		// determine spawn point
		let spawnpoints = []
		for (let row = 0; row < map.length; row++)
			for (let col = 0; col < map[row].length; col++)
				if (map[row][col] == 's')
					spawnpoints.push({y: row, x: col})

		console.log(spawnpoints)
		return spawnpoints[Math.floor(random(0, spawnpoints.length))]
	}

	update(){
		const R = 0, L = 1, U = 2, D = 3;
		let l = this.img_mtrx[this.cdir].length;
		let w = this.isWalking;
		let seq = [0,1,0,2]

		this.cc += 1;
		this.cframe = 0;
		if (w === 1){
			this.cframe = seq[Math.floor(this.cc / this.slow) % seq.length];
		}
		let sp = this.walkSpeed;
		let newxx = this.xx
		let newyy = this.yy

		switch (this.cdir){
			case R:
				newxx += sp * w; // if xx < boundaries['R'] good, else xx = xx
				break;
			case L:
				newxx -= sp * w;
				break;
			case U:
				newyy -= sp * w;
				break;
			case D:
				newyy += sp * w;
				break;
		}
		let newx = Math.floor(newxx);
		let newy = Math.floor(newyy);
		let idx = this.findindex(newx, newy)
		if (this.testedges(newx, newy, idx['row'], idx['col']))
		{
			this.x = Math.floor(this.xx);
			this.y = Math.floor(this.yy);
		}
	}


}
