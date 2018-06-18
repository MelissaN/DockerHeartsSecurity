/* this class controls the size of canvas div
	and the autoscrolling of the div

	it requires the character

	it tries to keep player in center of screen
		by changing scroll x and scroll y

	formula:
		center = ((width/2 + scrollX)) 
		center = characterX - scrollX
		scrollX = characterX - center

		scrollX = characterX - width/2

		scrollX = (characterX + characterWidth) - (width / 2)    // +charwidth
		scrollY = (characterY + characterHeight) - (height / 2)  // +charheight


	update:
		make it's focus be the mouse when the mouse moves
		toggle focus to character when character moves
	*/

class RoomCanvas {
	constructor(character){
		this.character = character
		this.home = this.character.home
		this.navbar = this.home.navbar
		this.canvasdiv = document.getElementById("canvasdiv")
		this.canvasdiv.style.width = window.innerWidth
		this.canvasdiv.style.height = window.innerHeight - this.navbar.height
	}


	scroll(){
		this.canvasdiv.scrollLeft = this.character.x - Math.floor(window.innerWidth / 2)
		this.canvasdiv.scrollTop = this.character.y - Math.floor((window.innerHeight - this.navbar.height) / 2)
	}
}
