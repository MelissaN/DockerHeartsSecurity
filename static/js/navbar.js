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