

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
