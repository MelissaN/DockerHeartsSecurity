class Home {
	constructor(){
		this.uid 	= undefined;
		this.username	= undefined;
		this.alterego	= undefined;
		this.views  	= [];
		this.others 	= {};
		this.othersList = [];
		this.files	= {};
		this.selectedfile	= undefined;
		this.socket 		= {};
		this.socket.disconnect 	= () => {};
		this.directions 	= [[], [], [], []];
		this.directionsalt	= [[], [], [], []];
		this.update 		= this.updateOthers();
	}

	connectSocket(){
		this.socket = io.connect('http://18.221.73.238')
		this.socket.on("update", this.update)
		this.socket.on("drop", this.drop())
	}

	disconnectSocket(){
		this.socket.disconnect()
	}

	updateOthers(){
			let homie = this;
		return function(other) {
			if (homie.others[other.uid] === undefined)
			{
				if (other.uid === homie.uid)
					homie.others[homie.uid] = homie.character
				else
					homie.others[other.uid] = new Character(homie);
				homie.othersList.push(other.uid);
				homie.others[other.uid].uid = other.uid;
			}
			let zeno = homie.others[other.uid]; // character should timer up automatically
			zeno.timer = 0;
			zeno.heart = other.heart
			if (other.uid !== homie.uid)
			{
				zeno.direction = other.direction;
				zeno.walking = other.isWalking;
				zeno.xx = other.xx;
				zeno.yy = other.yy;
			}
		}

	}

	deleteOther(other)  {
		if (other.uid !== this.uid && other.timer >= 3600 * 8)
		{
			this.others[other.uid] = undefined;
			let x = this.othersList.indexOf(other.uid)
			if (x > -1)
				this.othersList.splice(x, 1);
		}
	}

	drop(){
		let homie = this
		return function(newfile){
			homie.files[newfile.key] = newfile
		}
	}
}