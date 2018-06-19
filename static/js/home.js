class Home {
	constructor(){
		this.uid 	= undefined;
		this.username	= undefined;
		this.alterego	= undefined;
		this.gender		= undefined;
		this.pixelmap	= undefined;

		this.navbar 	= undefined;
		this.views  	= [];
		this.others 	= {};
		this.othersList = [];
		this.files	= {};
		this.selectedfile	= undefined;
		this.socket 		= {};
		this.socket.disconnect 	= () => {};
		this.directions 	= [[], [], [], []];
		this.dirgirl		= [[], [], [], []];
		this.diralien		= [[], [], [], []];
		this.directionsalt	= [[], [], [], []];
		this.update 		= this.updateOthers();
	}

	connectSocket(){
		this.socket = io.connect('http://18.221.73.238')
		this.socket.on("update", this.update)
		this.socket.on("drop", this.drop())
		this.socket.on("init", this.init())
	}

	disconnectSocket(){
		this.socket.disconnect()
		this.uid = undefined
	}

	init(){
		let homie = this
		return function(c_and_f){
			let characters  = c_and_f['characters']
			let files		= c_and_f['files']
			homie.files  = {}
			homie.others = {}
			for (let [key, value] of Object.entries(files))
				homie.files[key] = value
			
			for (let [key, value] of Object.entries(characters))
				homie.update(value)
		}
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
				zeno.gender = other.gender;
				zeno.direction = other.direction;
				zeno.walking = other.isWalking;
				zeno.xx = other.xx;
				zeno.yy = other.yy;
			}
		}

	}

	// make this server side later
	deleteOther(other)  {
		if (other.uid !== this.uid && other.timer >= 3600 * 8)
			this.others[other.uid] = undefined;
	}

	drop(){
		let homie = this
		return function(newfile){
			homie.files[newfile.key] = newfile
		}
	}
}
