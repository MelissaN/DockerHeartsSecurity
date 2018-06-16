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

	*/

class Roomcanvas {
	constructor(character, canvasdiv){
		this.character = character
		this.canvasdiv = document.getElementById("canvasdiv")
		this.canvasdiv.style.width = window.innerWidth
		this.canvasdiv.style.height = window.innerHeight
	}


	scroll(){
		this.canvasdiv.scrollLeft = this.character.x - Math.floor(window.innerWidth / 2)
		this.canvasdiv.scrollRight = this.character.y - Math.floor(window.innerHeight / 2)
	}
}