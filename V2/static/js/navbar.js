class Navbar {
	constructor(home){
		this.home = home
		this.home.navbar = this
		this.div = document.createElement("div")
		this.div.setAttribute("id", "navbar")
		this.div.style.display = "block"
		this.div.style.margin = 0
		this.height = Math.floor(window.innerHeight / 20)
		this.div.style.height = this.height
		this.loginButton = document.createElement("button")
		this.loginButton.addEventListener("click", this.login())
		this.div.appendChild(this.loginButton)
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
