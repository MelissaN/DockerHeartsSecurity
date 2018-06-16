// contains classes to handle mouse clicks on the canvas
// notepad class 
	// listens to mouse clicks
	// appears and disappears
		// contains text area
		// contains buttons
		// requires canvas 
		// requires list of file objects (home)
			// to determine what buttons/actions to show

class Notepad {
	constructor(character){
		this.character = character
		this.home = character.home
		this.socket = this.home.socket;
		this.height = 200
		this.width = 150
		this.left = 0
		this.top = 0

		this.doc = document
		this.div = document.createElement("div")
		this.div.setAttribute("id", "notepad")
		this.div.style.display = "none"
		this.div.style.position = "absolute"
		this.div.style.height 	= this.height + "px"
		this.div.style.width 	= this.width + "px"
		this.div.style.border	= "solid 1px blue"
		this.canvasdiv = document.getElementById("canvasdiv")
		this.canvasdiv.appendChild(this.div) // it exists hidden now

		this.textarea		= document.createElement("textarea")
		this.textarea.style.height = (this.height - 25) + "px"
		this.textarea.style.width = this.div.style.width
		this.div.appendChild(this.textarea)

		this.dropbtn		= this.makeButton("drop")
		this.dropbtn.addEventListener("click", this.dropFile())

		this.collectbtn		= this.makeButton("collect")
		this.collectbtn.addEventListener("click", this.collectFile())

		this.editbtn		= this.makeButton("edit")
		this.editbtn.addEventListener("click", this.editFile())

		this.open = false
		this.file = undefined

		this.toggle = this.makeToggle()
		this.canvasdiv.addEventListener("click", this.toggle)
	}

	makeButton(string){
		let ele = document.createElement("button")
		ele.innerHTML = string
		ele.style.display = "none"
		this.div.appendChild(ele)
		return ele
	}


	makeToggle(){
		// decides what value is in textarea
			// based on read, write, or update mode
		let notepad 	= this
		let pad		= this.div
		let text	= this.textarea
		let check	= this.checkFile()
		let drop	= this.dropbtn
		let edit	= this.editbtn
		let collect	= this.collectbtn
		let homie	= this.home
		return function(){
			if (notepad.open){
				let active = document.activeElement.tagName
				console.log(active)
				if (active !== "TEXTAREA"){
					notepad.open = false
					pad.style.display = "none"
					if (active !== "BUTTON")
						homie.selectedfile = undefined
				}
			}
			else {
				drop.style.display = "none"
				edit.style.display = "none"
				collect.style.display = "none"

				notepad.open = true
				notepad.left = mouseX
				notepad.top = mouseY
				pad.style.left = notepad.left
				pad.style.top = notepad.top
				pad.style.display = "block"
				text.focus()
				if (check()){
					let uid = homie.selectedfile.uid
					text.value = homie.selectedfile.text
					if(homie.uid === uid){
						edit.style.display = "inline-block"
					}
					else{
						collect.style.display = "inline-block"
					}
					
				}
				else{
					drop.style.display = "inline-block"
				}
			}

		}
		

	}

	dropFile(){
		let soc = this.socket
		let homie = this.home
		let chr = this.character
		let text = this.textarea
		let notepad = this
		return function(){
			let key = notepad.left +'.'+notepad.top
			soc.emit("drop", {text: text.value, 
					  uid: homie.uid,
					  username: homie.username,
					  alterego: homie.alterego,
					  x:notepad.left, 
					  y:notepad.top,
					  key:key})
			homie.selectedfile = undefined
		}
	}

	checkFile(){
		let notepad = this
		let homie = this.home
		return function() {
			for (let [key, value] of Object.entries(homie.files)){
				let lt = value.x
				let rt = value.x + 10
				let tp = value.y
				let bt = value.y + 15
				let l = notepad.left
				let t = notepad.top
				if ((l > lt) && (l < rt) && (t > tp) && (t < bt)){
					homie.selectedfile = value
					return true
				}
			}
			homie.selectedfile = undefined
			return false
		}
	}

	collectFile(){
		// file must be defined at this point
		// will get back to this
		let soc = this.socket
		let homie = this.home
		return function(){
			let key = homie.selectedfile.key
			soc.emit('collect', {filekey:key, uid:homie.uid})
			homie.selectedfile = undefined
		}
	}

	editFile(){
		let soc = this.socket
		let homie = this.home
		let chr = this.character
		let text = this.textarea
		let notepad = this
		return function(){
			let key = homie.selectedfile.key
			let sfile = homie.selectedfile
			soc.emit("drop", {text: text.value, 
					  uid: homie.uid,
					  username: homie.username,
					  alterego: homie.alterego,
					  x:sfile.x, 
					  y:sfile.y,
					  key:key})
			homie.selectedfile = undefined
		}
	}
}
