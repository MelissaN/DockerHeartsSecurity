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

class Navbar {
	constructor(home){
		this.home = home
		this.div = document.createElement("div")
		this.div.style.display = "block"
		this.div.style.height = "100px"
		this.loginButton = document.createElement("button")
		this.loginButton.addEventListener("click", this.login())
		let gameboy = document.getElementById("gameboy")
		gameboy.appendChild(this.div)
	}

	login(){
		let homie = this.home;
		return function(){
			homie.views[0].display()
		}
	}
}

class View {
	// resize, later
	constructor(home){
		this.home = home;
		this.home.views.push(this);
		this.div = document.createElement("div");
		let gameboy = document.getElementById("gameboy");
		gameboy.appendChild(this.div);
	}

	hide(){
		this.div.style.display = "none";
	}

	display(){
		for (let view of this.home.views)
			view.hide();
		this.div.style.display = "flex";
		this.reentry();
	}

	reentry(){

	}
}

class Login extends View {
	constructor(home){
		super(home)
		this.usernameBox = document.createElement("div")
		this.userLabel	 = document.createElement("p")
		this.userInput	 = document.createElement("input")
		this.userText	 = document.createTextNode("Public Name:")
		this.userLabel.appendChild(this.userText)
		this.usernameBox.appendChild(this.userLabel)
		this.usernameBox.appendChild(this.userInput)
		this.div.appendChild(this.usernameBox)

		this.alteregoBox = document.createElement("div")
		this.alterLabel	 = document.createElement("p")
		this.alterInput	 = document.createElement("input")
		this.alterText	 = document.createTextNode("Alterego:")
		this.alterLabel.appendChild(this.alterText)
		this.alteregoBox.appendChild(this.alterLabel)
		this.alteregoBox.appendChild(this.alterInput)
		this.div.appendChild(this.alteregoBox)

		this.submitButton = document.createElement("button")
		this.submitText	 = document.createTextNode("Enter")
		this.submitButton.appendChild(this.submitText)
		this.div.appendChild(this.submitButton)
		this.submitButton.addEventListener("click", this.submit())
	}

	submit() {
		let username = this.userInput
		let alterego = this.alterInput
		let homie = this.home

		return function() {
			if (username.value === "" || alterego.value === "")
				return
			else {
				homie.uid = username.value + '/' + Date.now()
				homie.username = username.value
				homie.alterego = alterego.value
				homie.connectSocket();
				homie.views[2].display()
			}
		}

	}

	reentry() {
		this.home.disconnectSocket();
		// also send a delete uid signal out
			// if uid is set
	}

}

class Lobby extends View {
	constructor(home){
		super(home)
	}
}

class Interface {
	constructor(home){
		this.home = home
		this.div = document.createElement("div")
		this.canvasdiv = document.createElement("div")
		this.instructions = document.createElement("p")
		this.instructions.innerHTML = "a, w, s, d, to move"
		this.div.appendChild(this.instructions)
		this.canvasdiv.setAttribute("id", "canvasdiv")
		this.canvasdiv.style.position = "absolute"
		this.canvasdiv.style.left = "0"
		this.canvasdiv.style['overflow-x'] = "scroll"
		this.canvasdiv.style.width = "300px"

		this.chatdiv = document.createElement("div")
		this.chatdiv.setAttribute("id", "chatdiv")
		this.chatdiv.style.position = "absolute"
		this.chatdiv.style.left = "300px"
		this.chatdiv.style.border = "solid 1px red"
		this.chatdiv.style.width = "300px"
		this.chatdiv.style.height = "500px"

		this.chat = document.createElement("ul")
		this.chat.setAttribute("id", "interface_chat")

		this.message = document.createElement("input")
		this.message.setAttribute("id", "interface_message")
		this.submit = document.createElement("button")
		this.submit.innerHTML = "send"
		this.submit.setAttribute("id", "interface_submit")

		this.chatdiv.appendChild(this.chat)
		this.chatdiv.appendChild(this.message)
		this.chatdiv.appendChild(this.submit)

		this.div.appendChild(this.canvasdiv)
		this.div.appendChild(this.chatdiv)
	}

		appendMessage(){
			let ul = this.chat
			return function(msg) {
				let li = document.createElement("li")
				li.innerHTML = msg.username + ": " + msg.msg
				ul.appendChild(li)
			}
		}

		sendMessage(){
			let socket = this.home.socket
			let home = this.home
			let input = this.message
			return function(){
				socket.emit("message", {username:home.username, msg:input.value})
				input.value = ""
			}
		}
}

class Room extends View {
	constructor(home, uinterface){
		super(home)
		this.interface 	= uinterface
		this.div.appendChild(this.interface.div)
		this.character 	= undefined
		this.keyboard  	= undefined
		this.room 		= 0 //lobby
	}

	// might need an exit() function -  to send delete signal
	// maybe just change room to lobby
		// turn off keyboard and notepad listeners
		// or try to make them more singular
	reentry(){
		this.character 	= new Character(this.home)
		this.keyboard 	= new Keyboard(this.character)
		this.notepad 	= new Notepad(this.character)
		this.home.character = this.character
		this.home.socket.on("message", this.interface.appendMessage())
		this.home.update({uid:this.home.uid, isWalking:0, direction:3,
				xx:0, yy:0, heart:this.character.heart});
		this.interface.submit.addEventListener("click", this.interface.sendMessage())
	}
}


// functions 
// ------------------------------------------------------------

function windowResized(){
	// deal with this later
}


// setup
// ------------------------------------------------------------
	// create home object
	// create view objects 

let home 		= new Home();
let navbar 		= new Navbar(home);
let login 		= new Login(home);
let lobby 		= new Lobby(home);
let uinterface	 	= new Interface(home);
let room 		= new Room(home, uinterface);



// algorithm
// ------------------------------------------------------------

login.display();
