document.getElementById("startSimulation").addEventListener("click", simulationSetup);



//var specificAnimalsTotal = 0;
const specificAnimals = [{type: "girrafe", count: 1}, {type: "frog", count: 2}, {type: "cat", count: 3}, {type: "dog", count: 4}]
// for (var b = 0; b < specificAnimals.length; b++){
//     specificAnimalsTotal += specificAnimals[b];
//}
//console.log(specificAnimalsTotal);

const numberOfRandomAnimals = 5;
const worldPopulation = [];



//Creates an "organism" class which has properties x, y, and speed, and a state.\
class organism {
    static knownAnimalTypes = ["girrafe", "frog", "cat", "dog"];
    static knownStates = ["alive", "dead", "wounded"];
    static maximumBoundary = 9999;
    constructor(x, y, speed, state, type){
        //(0,0) is at the middle of the grid and we allow negative positions. We do not allow numbers with their abs. value greater than the bounds of the canvas
        if(typeof x === "number"){
            if(Math.abs(x) > organism.maximumBoundary){
                throw new Error("ERROR: X Value is out of range. (" + x + ") Maximum X value: +/-" + organism.maximumBoundary);
            }
            this.x = x;
        }else{
            throw new Error("ERROR: X is Not A Number- " + x);
        }

        if(typeof y === "number"){
            if(Math.abs(y)>organism.maximumBoundary){
                throw new Error("ERROR: Y Value is out of range. (" + y + ") Maximum Y value: +/-" + organism.maximumBoundary);
            }
            this.y = y;
        }else{
            throw new Error("ERROR: Y is Not A Number- " + y);
        }

        if(typeof speed === "number"){

            if(speed < 0){
                throw new Error("ERROR: Speed Value is Not A Positive Number. (" + speed + ")");
            }else{
                this.speed = speed;
            }
        }else{
            throw new Error("ERROR: Speed Value is Not A Number- " + speed);
        }


        if(organism.knownStates.includes(state)){
            this.state = state;
        }else{
            throw new Error("ERROR: Unknown State- " + state + " Valid States: " + organism.knownStates);
        }

        if(organism.knownAnimalTypes.includes(type)){
            this.type = type;
        }else{
            throw new Error("ERROR: Unknown Type- " + type + " Valid Types: " + organism.knownAnimalTypes);
        }
        

    };
};

for (var i = 0; i < numberOfRandomAnimals; i++){
    const temp = new organism(0, 0, 0, "alive", organism.knownAnimalTypes[Math.floor(Math.random() * organism.knownAnimalTypes.length)]);
    worldPopulation.push(temp);
}
//const fishy = 

specificAnimals.forEach(animal => {
//    console.log (animal.type + ": " + animal.count);
    for (var i = 0; i < animal.count; i++){
        const temp = new organism(0, 0, 0, "alive", animal.type);
        worldPopulation.push(temp);
    }
})






console.log(worldPopulation);


//Test Cases Here v
//creates an organism called a girrafe with starting x, y, and speed values of 0, with an "alive" state.
const girrafe0 = new organism(0, 9, -10, "alive", "girrafe");
//const girrafe1 = new organism(10000, 0, 0, "dead", "girrafe");
//const girrafe3 = new organism(0, 0, 0, "hal", "girrafe");
//const girrafe2 = new organism(0, 0, 0, "alive", "chicken");
// const girrafe = new organism(0, 0, 0, "alive", "girrafe");
// const frog = new organism(0, 0, 0, "alive", "frog");
// const cat = new organism(0, 0, 0, "alive", "cat");
// const dog = new organism(0, 0, 0, "alive", "dog");
console.log(girrafe0);
//console.log(girrafe0, girrafe1, girrafe2, girrafe3);



//This will set up the space for the simulation
function simulationSetup(){

}
