/* This class handles room collision.

	translate's boundaries.py matricies into character boundaries

	formula:

		boundaries:
		character finds the cell it's in
			by using its x y position and display ratio to deduce the index in pixelmap

		display:
		obj matrix accompanies pixel map
			img_name of object
			index
			x_offset
			y_offset
			width
			height

		findindex(pixelmap, x, y, width, height):
			p_width  = len(pixelmap)
			p_height = len(pixelmap[0])
			ratiowidth  = width / p_width
			ratioheight = height / p_height

			i = Math.floor(x / ratiowidth)
			j = Math.floor(y / ratioheight)

			return (i, j)

		findboundaries(pixelmap, i, j):
			'''returns object of boundaries {up: none, left: (200, 200), down: none, right: none}'''

		character variables:
			pixelmap
			x
			y

		character step algorithm:
			findindex
			findboundaries

		all boundary objects are contained within a cell of a pixel_matrix
		
		a boundary obj contains:
			cell_idx
			xoffset 
			yoffset
			width
			height

				- so boundary objects whose sizes overflow a cell are the map designers fault
			block(character):
				dir = character.direction
				if (dir === 'U')
					if (inrange(character))

			inrange(character):
				dir = character.direction
				if (dir === 'U')
					if (character.x > )

			
		subclasses 
			impassable
			passable

			block(character, index)

			given a character (x, y, direction, width, height, poisoned, canvaswidth, canvasheight)
				it can determine whether true or false

		each map will have it's own object mapping
			t: 
			h:
			w:

			bush:
			rock:
			house:
*/