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