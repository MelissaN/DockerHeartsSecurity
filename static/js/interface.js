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