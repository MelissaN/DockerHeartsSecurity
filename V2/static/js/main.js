

// functions 
// ------------------------------------------------------------

function windowResized(){
	// deal with this later
}


// setup
// ------------------------------------------------------------
	// create home object
	// create view objects 

let home 		= new Home();
let navbar 		= new Navbar(home);
let login 		= new Login(home);
let lobby 		= new Lobby(home);
let uinterface	 	= new Interface(home);
let room 		= new Room(home, uinterface);


// algorithm
// ------------------------------------------------------------

login.display();

// ------------------------------------------------------------
// maps 

let h='h', t='t', s='s', w='w', sp='sp', p='p', b='b', bb='bb', bbb='bbb'

let kouki = 
[
[s, t, t, t, t, t, w],
[sp,  t,  t, h, t, t, w],
[t,  h, w, w, t, t, w],
[t, t, w, w, t, t, w],
[t, sp, t, t, t, t, w],
[t, sp, t, t, t, t, w],
[t, t, w, w, t, t, w]
], koukiwidth = 700, koukiheight = 700;

let germ = 
[
['t', 't', 'h', 't', 't', 'h', 's'],
['t', 't', 't', 'sp', 't', 't', 's'],
['h', 't', 't', 'w', 't', 't', 'sp'],
['t', 't', 's', 't', 't', 'sp', 'w'],
['t', 's', 't', 'sp', 't', 't', 'h']
], germwidth = 800, germheight = 800;

let snakeriver = 
[
[h, h, h, h, h, h, h, h, h, h],
[s, t, t, t, t, t, t, t, t, t],
[h, h, h, h, h, h, h, h, t, t],
[t, t, t, t, t, t, t, t, t, t],
[h, h, h,t, t, h, h, h, h, h],
[sp, t, t, t, t, t, t, t, t, t],
[h, h, w, w, w, w, w, w, h,h],
[t, t, t, t, t, t, t, t, t, t],
[h, h, t, t, h, h, t, t, h, h],
[h, h, h, h, sp, h, h, h, h, h]
], snakeriverwidth = 500, snakeriverheight = 500;

let alexellis = [[h,t,s,t,h]], alexelliswidth = 1500, alexellisheight = 500

let dungeon = 
[
[h, h, h, h, h, h, h, h, h, h],
[s, t, t, t, t, t, t, t, t, t],
[h, h, h, h, h, h, h, h, t, t],
[t, t, t, t, t, t, t, t, t, t],
[h, h, h, t, t, h, h, h, h, h],
[h, t, t, t, t, t, t, t, t, t],
[h, h, w, w, w, w, w, w, h, h],
[t, t, t, t, t, t, t, t, t, t],
[h, h, t, t, h, h, t, sp, h, h],
[h, h, b, b, h, h, h, h, h, h],
[h, h, b, b, h, h, h, h, h, h],
[h, h, t, t, h, h, t, t, w, sp],
[h, h, t, t, t, t, t, h, h, h],
[h, h, t, t, h, h, h, h, h, h],
[h, h, bb, bb, h, h, h, h, h, h],
[h, h, w, w, h, h, h, h, h, h],
[h, h, w, w, h, h, h, h, h, h],
[h, sp, t, t, sp, h, h, h, h, h],
[h, sp, t, t, sp, h, h, h, h, h],
[h, sp, sp, sp, sp, h, h, h, h, h]
]