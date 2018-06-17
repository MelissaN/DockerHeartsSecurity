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

		this.genderboy = document.createElement("input")
		this.gendergirl = document.createElement("input")
		this.genderboy.setAttribute('type', 'checkbox')
		this.gendergirl. setAttribute('type', 'checkbox')
		this.div.appendChild(this.genderboy)
		this.div.appendChild(document.createElement('br'))
		this.div.appendChild(this.gendergirl)
		this.div.appendChild(document.createElement('br'))

		this.submitButton = document.createElement("button")
		this.submitText	 = document.createTextNode("Enter")
		this.submitButton.appendChild(this.submitText)
		this.div.appendChild(this.submitButton)
		this.submitButton.addEventListener("click", this.submit())

                this.instructions = document.createElement("p")
                this.instructions.innerHTML = "a, w, s, d, to move"
                this.div.appendChild(this.instructions)

	}

	submit() {
		let genderboy = this.genderboy
		let gendergirl = this.gendergirl
		let username = this.userInput
		let alterego = this.alterInput
		let homie = this.home

		return function() {
			if (username.value === "" || alterego.value === "")
				return
			if (!genderboy.checked && !gendergirl.checked)
				return
			else {
				homie.uid = username.value + '/' + Date.now()
				homie.username = username.value
				homie.alterego = alterego.value
				if (genderboy.checked && gendergirl.checked)
					homie.gender = 'alien'
				if (genderboy.checked)
					homie.gender = 'boy'
				else homie.gender = 'girl'
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
