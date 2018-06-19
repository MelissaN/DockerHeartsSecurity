class Room extends View {
	constructor(home, uinterface){
		super(home)
		this.interface 	= uinterface
		this.div.appendChild(this.interface.div)
		this.character 	= undefined
		this.keyboard  	= undefined
		this.room 		= 0 //lobby
		this.roomcanvas = undefined
	}

	// might need an exit() function -  to send delete signal
	// maybe just change room to lobby
		// turn off keyboard and notepad listeners
		// or try to make them more singular
	reentry(){
		this.character 	= new Character(this.home)
		this.roomcanvas = new RoomCanvas(this.character)
		this.keyboard 	= new Keyboard(this.character)
		this.notepad 	= new Notepad(this.character)
		this.home.character = this.character
		this.home.socket.on("message", this.interface.appendMessage())
		this.home.socket.emit('update',{uid:this.home.uid, isWalking:0, direction:3,
				xx:0, yy:0, heart:this.character.heart, gender:this.character.gender});
		this.interface.submit.addEventListener("click", this.interface.sendMessage())
	}

}
