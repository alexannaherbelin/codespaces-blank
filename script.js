document.getElementById("startSimulation").addEventListener("click", simulationSetup);

//Creates an "organism" object which has properties x, y, and velocity which all begin at 0, and a state which begina as alive.
const organism = {
    x: 0, 
    y: 0, 
    velocity: 0, 
    state: "alive"
};
console.log(organism.state);





//I used a class not a object.
// //Creates an "organism" class which has properties x, y, and velocity, and a state.
// class organism {
//     constructor(x, y, velocity, state){
//         this.x = x;
//         this.y = y;
//         this.veloctiy = velocity;
//         this.state = state;
//     };
// };

// //creates an organism called a girrafe with starting x, y, and velocity values of 0, with an "alive" state.
// const girrafe = new organism(0, 0, 0, "alive");

// console.log(girrafe);



//This will set up the space for the simulation
function simulationSetup(){

}
