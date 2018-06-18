'''
grid.py module of map matricies.

this module holds maps we can write by hand, like so:
map_matrix = [
	['t', 't', 't', 't', 't'],
	['t', 't', 't', 't', 't'],
	['t', 't', 't', 't', 't'],
	['t', 't', 't', 't', 't'],
	['s', 't', 't', 't', 't']
]

Guards:
Everyone is within the boundaries of the map.
	No negative x or y values.
	No values greater than the map's length and height.

'''

sizes = {
			't': [1, 1],
			'w': [2, 2]
		}

plains = [
	['t', 't', 't', 't', 't'],
	['t', 't', 't', 't', 't'],
	['t', 't', 't', 't', 't'],
	['t', 't', 't', 't', 't'],
	['s', 't', 't', 't', 't']
]

#only a snake can swim
river6 = [
	['s', 't', 'w', 't', 's'],
	['t', 't', 'w', 't', 't'],
	['w', 'w', 's', 'w', 'w'],
	['t', 't', 'w', 't', 't'],
	['s', 't', 'w', 't', 's']
]

''' js must render the objects to match the screen's resolution,
but we can still decide the size of the objects here '''

plainsObjects = [
		[[('bush', 20, 20, 10)], ('t', 1), ('t', 1), ('t', 1), ('t', 1)], 
		[('t', 1), ('t', 1), ('t', 1), ('t', 1), ('t', 1)], 
		[('t', 1), ('t', 1), ('t', 1), ('t', 1), ('t', 1)], 
		[('t', 1), ('t', 1), ('t', 1), ('t', 1), ('t', 1)], 
		[('t', 1), ('t', 1), ('t', 1), ('t', 1), ('t', 1)], 
		[('t', 1), ('t', 1), ('t', 1), ('t', 1), ('t', 1)] 	
]


river6 = [
		[('t', 1), ('t', 1), ('w', 1), ('t', 1), ('t', 1)], 
		[('t', 1), ('t', 1), ('w', 1), ('t', 1), ('t', 1)], 
		[('t', 1), ('t', 1), ('s', 1), ('t', 1), ('t', 1)], 
		[('t', 1), ('t', 1), ('t', 1), ('t', 1), ('t', 1)], 
		[('t', 1), ('t', 1), ('t', 1), ('t', 1), ('t', 1)], 
		[('t', 1), ('t', 1), ('t', 1), ('t', 1), ('t', 1)] 	
]

bush = lambda x, y, z: ('bush_green', x, y, z)

