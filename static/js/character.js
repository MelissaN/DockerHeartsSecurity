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

  Methods
   - walk(direction)
   	- sets direction
   	- sets frame
   - stop()
    - sets frame
*/

class Character {
	constructor(h) {
		this.home = h;
		this.img_mtrx = h.directions;
		this.img_mtrxalt = h.directionsalt;
		this.heart = true;
		this.x = 0;
		this.y = 0;
		this.xx = 0;
		this.yy = 0;
		this.cdir = 3;
		this.cframe = 0;
		this.cc = 0;
		this.slow = 4;
		this.walkSpeed = 10;
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
		if (this.heart)
			return this.img_mtrx[this.cdir][this.cframe];
		else
			return this.img_mtrxalt[this.cdir][this.cframe];
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
		switch (this.cdir){
			case R:
				this.xx += sp * w;
				break;
			case L:
				this.xx -= sp * w;
				break;
			case U:
				this.yy -= sp * w;
				break;
			case D:
				this.yy += sp * w;
				break;
		}
		this.x = Math.floor(this.xx / this.slow);
		this.y = Math.floor(this.yy / this.slow);
	}


}
