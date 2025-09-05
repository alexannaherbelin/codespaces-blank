document.getElementById("startSimulation").addEventListener("click", simulationSetup);



//var specificAnimalsTotal = 0;
const specificAnimals = [{type: "girrafe", count: 1}, {type: "frog", count: 2}, {type: "cat", count: 3}, {type: "dog", count: 4}]
// for (var b = 0; b < specificAnimals.length; b++){
//     specificAnimalsTotal += specificAnimals[b];
//}
//console.log(specificAnimalsTotal);

//How many random animals do you want to create?
const numberOfRandomAnimals = 5;

const worldPopulation = [];


//At what value do you want the animals to starve to death?
const starveValue = 5;



//Creates an "organism" class which has properties x, y, and speed, and a state.\
class organism {
    static knownAnimalTypes = ["girrafe", "frog", "cat", "dog"];
    static knownStates = ["alive", "dead", "wounded", "starving"];
    static maximumBoundary = 9999;
    constructor(x, y, speed, state, type, food, starvecount, timealive){
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
        

        if(typeof food === "number"){
            if(food < 0){
                throw new Error("ERROR: Food Value is Not A Positive Number. (" + food + ")");
            }else{
                this.food = food;
            }
        }else{
            throw new Error("ERROR: Food Value is Not A Number- " + food);
        }


        if(typeof starvecount === "number"){
            if(starvecount < 0){
                throw new Error("ERROR: Starve Count Value is Not A Positive Number. (" + starvecount + ")");
            }else{
                this.starvecount = starvecount;
            }
        }else{
            throw new Error("ERROR: Starve Count Value is Not A Number- " + starvecount);
        }


        if(typeof timealive === "number"){
            if(timealive < 0){
                throw new Error("ERROR: Time Alive Value is Not A Positive Number. (" + timealive + ")");
            }else{
                this.timealive = timealive;
            }
        }else{
            throw new Error("ERROR: Time Alive Value is Not A Number- " + timealive);
        }
    };
};

for (var i = 0; i < numberOfRandomAnimals; i++){
    const temp = new organism(0, 0, Math.floor(Math.random() * 100)/* this sets the organism's speed to anything from 0 to 99.*/, "alive", organism.knownAnimalTypes[Math.floor(Math.random() * organism.knownAnimalTypes.length)], 0, 0, 0);
    worldPopulation.push(temp);
}


specificAnimals.forEach(animal => {
//    console.log (animal.type + ": " + animal.count);
    for (var i = 0; i < animal.count; i++){
        const temp = new organism(0, 0, Math.floor(Math.random() * 100)/* this sets the organism's speed to anything from 0 to 99.*/, "alive", animal.type, 0, 0, 0);
        worldPopulation.push(temp);
    }
})






console.log(worldPopulation);


//Test Cases Here v
//creates an organism called a girrafe with starting x, y, and speed values of 0, with an "alive" state.
const girrafe0 = new organism(0, 9, 10, "alive", "girrafe", 0, 0, 0);
//const girrafe1 = new organism(10000, 0, 0, "dead", "girrafe");
//const girrafe3 = new organism(0, 0, 0, "hal", "girrafe");
//const girrafe2 = new organism(0, 0, 0, "alive", "chicken");
// const girrafe = new organism(0, 0, 0, "alive", "girrafe");
// const frog = new organism(0, 0, 0, "alive", "frog");
// const cat = new organism(0, 0, 0, "alive", "cat");
// const dog = new organism(0, 0, 0, "alive", "dog");
console.log(girrafe0);
//console.log(girrafe0, girrafe1, girrafe2, girrafe3);

function updateSimulation(){
    //This checks if an organism has food, and if it doesnt starts a starving count. When this reaches the starve value, the animals state becomes "dead".
    for(var i = 0; i < worldPopulation.length; i++){
        console.log(worldPopulation[i]);
        if(worldPopulation[i].food === 0){
            worldPopulation[i].state = "starving";
        }
        if(worldPopulation[i].starvecount >= starveValue){
            worldPopulation[i].state = "dead";
        }else if(worldPopulation[i].state = "starving"){
            worldPopulation[i].starvecount += 1;
        }
    }

    //This will make organisms appear at a random position to start using math.random
    for(var i = 0; i < worldPopulation.length; i++){
        if(worldPopulation[i].x === 0){
            if(worldPopulation[i].timealive === 0){
                worldPopulation[i].x = Math.floor(Math.random() * 10000);
            }
        }
        if(worldPopulation[i].y === 0){
            if(worldPopulation[i].timealive === 0){
                worldPopulation[i].y = Math.floor(Math.random() * 10000);
            }
        }
        worldPopulation[i].timealive += 1
    }

    //This will cause the organisms to move in a random direction(up, down, left, right, or diagonal) by the speed.
    for(var i = 0; i < worldPopulation.length; i++){
        var temp = worldPopulation[i].x 
        worldPopulation[i].x = temp + worldPopulation[i].speed

        temp = worldPopulation[i].y 
        worldPopulation[i].y = temp + worldPopulation[i].speed
    }

}

//This calls the function updateSimulation every second(1000 milliseconds)
setInterval(updateSimulation, 10000);



//This will set up the space for the simulation
function simulationSetup(){

}
