/* will need a resize listener to change size of chat div */
class Interface {
	constructor(home){
		this.home = home
		this.div = document.createElement("div")
		this.canvasdiv = document.createElement("div")
		this.canvasdiv.setAttribute("id", "canvasdiv")
		this.canvasdiv.style.position = "absolute"
		this.canvasdiv.style.left = "0"
		this.canvasdiv.style['overflow-x'] = "scroll"
		this.canvasdiv.style.width = "300px"

		this.chatdiv = document.createElement("div")
		this.chatdiv.setAttribute("id", "chatdiv")
		this.chatdiv.style.position = "fixed"
		//this.chatdiv.height = Math.floor(window.innerHeight / 4)
		//this.chatdiv.width = Math.floor(window.innerWidth / 5)
		//this.chatdiv.style.top = window.innerHeight - this.chatdiv.height
		//this.chatdiv.style.width = this.chatdiv.width
		//this.chatdiv.style.height = this.chatdiv.height
		this.chatdiv.style.border = "solid 1px red"
		this.chatdiv.style.color = "gray"

		this.chat = document.createElement("ul")
		this.chat.setAttribute("id", "interface_chat")
		this.chat.height = Math.floor(window.innerHeight / 4)
		this.chat.width = Math.floor(window.innerWidth / 5)
		this.chat.style['overflow-y'] = 'scroll'
		this.chat.style['overflow-x'] = 'hidden'
		this.chat.style['height'] = this.chat.height
		this.chat.style['width'] = this.chat.width

		this.message = document.createElement("input")
		this.message.setAttribute("id", "interface_message")
		this.messagediv = document.createElement('div')
		this.messagediv.appendChild(this.message)

		this.submit = document.createElement("button")
		this.submit.innerHTML = "send"
		this.submit.setAttribute("id", "interface_submit")
		this.submitdiv = document.createElement('div')
		this.submitdiv.appendChild(this.submit)

		this.chatdiv.appendChild(this.chat)
		this.chatdiv.appendChild(this.messagediv)
		this.chatdiv.appendChild(this.submitdiv)
		this.chatdiv.height = this.chat.height + this.messagediv.clientHeight + this.submitdiv.clientHeight
		this.chatdiv.width = this.chat.width
		this.chatdiv.style.top = window.innerHeight - this.chatdiv.height - (this.chatdiv.height / 1.2)
		this.chatdiv.style.left = window.innerWidth - this.chatdiv.width
		

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
