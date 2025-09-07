document.getElementById("startSimulation").addEventListener("click", simulationSetup);



//var specificAnimalsTotal = 0;
const specificAnimals = [{type: "girrafe", count: 0, eats: [""]}, {type: "lion", count: 0, eats: ["girrafe", "zebra"]}, {type: "hal", count: 0, eats: [""]}, {type: "ning", count: 0, eats: [""]}]
const knownAnimalTypes = specificAnimals.map((x) => x.type);

// for (var b = 0; b < specificAnimals.length; b++){
//     specificAnimalsTotal += specificAnimals[b];
//}
//console.log(specificAnimalsTotal);
function animalSearchFood(needle){
    for(i = 0; i < specificAnimals.length; i++){
        if(specificAnimals[i].type === needle){
            return specificAnimals[i].eats;
        }
    }
}
//How many random animals do you want to create?
const numberOfRandomAnimals = 100;
const allDirections = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest", "stayput"];
const worldPopulation = [];


//At what value do you want the animals to starve to death?
const starveValue = 100;



//Creates an "organism" class which has properties x, y, and speed, and a state.\
class organism {
//    static knownAnimalTypes = ["girrafe", "frog", "cat", "dog"];

    static knownStates = ["alive", "dead", "wounded", "starving"];
    static maximumBoundary = 999;
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

        if(knownAnimalTypes.includes(type)){
            this.type = type;
        }else{
            throw new Error("ERROR: Unknown Type- " + type + " Valid Types: " + knownAnimalTypes);
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
    const temp = new organism(0, 0, Math.floor(Math.random() * 100)/* this sets the organism's speed to anything from 0 to 99.*/, "alive", knownAnimalTypes[Math.floor(Math.random() * knownAnimalTypes.length)], 5, 0, 0);
    worldPopulation.push(temp);
}


specificAnimals.forEach(animal => {
//    console.log (animal.type + ": " + animal.count);
    for (var i = 0; i < animal.count; i++){
        const temp = new organism(0, 0, Math.floor(Math.random() * 100)/* this sets the organism's speed to anything from 0 to 99.*/, "alive", animal.type, 5, 0, 0);
        worldPopulation.push(temp);
    }
})






console.log(worldPopulation);


//Test Cases Here v
//creates an organism called a girrafe with starting x, y, and speed values of 0, with an "alive" state.
//const girrafe0 = new organism(0, 9, 10, "alive", "girrafe", 0, 0, 0);
//const girrafe1 = new organism(10000, 0, 0, "dead", "girrafe");
//const girrafe3 = new organism(0, 0, 0, "hal", "girrafe");
//const girrafe2 = new organism(0, 0, 0, "alive", "chicken");
// const girrafe = new organism(0, 0, 0, "alive", "girrafe");
// const frog = new organism(0, 0, 0, "alive", "frog");
// const cat = new organism(0, 0, 0, "alive", "cat");
// const dog = new organism(0, 0, 0, "alive", "dog");
//console.log(girrafe0);
//console.log(girrafe0, girrafe1, girrafe2, girrafe3);

function updateSimulation(){
    //This checks if an organism has food, and if it doesnt starts a starving count. When this reaches the starve value, the animals state becomes "dead".
    for(var i = 0; i < worldPopulation.length; i++){
        console.log(worldPopulation[i]);
        if(worldPopulation[i].food === 0){
            worldPopulation[i].state = "starving";
        }else if(worldPopulation[i].food > 0){
            worldPopulation[i].food -= 1
        }
        if(worldPopulation[i].starvecount >= starveValue){
            worldPopulation[i].state = "dead";
        }else if(worldPopulation[i].state === "starving"){
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
        if(worldPopulation[i].state != "dead" ){
            worldPopulation[i].timealive += 1
        }
    }

    //This will cause the organisms to move in a random direction(up, down, left, right, or diagonal) by the speed.
    for(var i = 0; i < worldPopulation.length; i++){
        if(worldPopulation[i].state === "dead"){
            console.log("Dead Animals cant fly");
        }else{
            //North is decreasing y, South is increasing y.
            //East is increasing x, West is decreasing x.
            var direction = allDirections[Math.floor(Math.random() * allDirections.length)];
            console.log("the direction is: " + direction + " "+ worldPopulation[i].type + i);
            if(direction === "north"){
                worldPopulation[i].y -= worldPopulation[i].speed
            }
            if(direction === "northeast"){
                worldPopulation[i].y -= worldPopulation[i].speed
                worldPopulation[i].x += worldPopulation[i].speed
            }
            if(direction === "east"){
                worldPopulation[i].x += worldPopulation[i].speed
            }
            if(direction === "southeast"){
                worldPopulation[i].y += worldPopulation[i].speed
                worldPopulation[i].x += worldPopulation[i].speed
            }
            if(direction === "south"){
                worldPopulation[i].y += worldPopulation[i].speed    
            }
            if(direction === "southwest"){
                worldPopulation[i].y += worldPopulation[i].speed
                worldPopulation[i].x -= worldPopulation[i].speed
            }
            if(direction === "west"){
                worldPopulation[i].x -= worldPopulation[i].speed
            }
            if(direction === "northwest"){
                worldPopulation[i].y -= worldPopulation[i].speed
                worldPopulation[i].x -= worldPopulation[i].speed
            }
        }
        if(worldPopulation[i].x > organism.maximumBoundary){
            worldPopulation[i].x = organism.maximumBoundary;
        }
        if(worldPopulation[i].x < -organism.maximumBoundary){
            worldPopulation[i].x = -organism.maximumBoundary;
        }
        if(worldPopulation[i].y > organism.maximumBoundary){
            worldPopulation[i].y = organism.maximumBoundary;
        }
        if(worldPopulation[i].y < -organism.maximumBoundary){
            worldPopulation[i].y = -organism.maximumBoundary;
        }
        
    }

    //Checking distance between animals for collision
    for(var i = 0; i < worldPopulation.length; i++){
        for(var j = 0; j < worldPopulation.length; j++){
            if(i != j && worldPopulation[i].state != "dead" && worldPopulation[j].state != "dead"){
                if(worldPopulation[i].x === worldPopulation[j].x && worldPopulation[i].y === worldPopulation[j].y){
                    //Animals eat eachother
                    if(worldPopulation[i].state != "dead"){
                        var onTheMenu = animalSearchFood(worldPopulation[i].type)
                        if(onTheMenu.includes(worldPopulation[j].type)){
                            console.log("There was a murder: " + worldPopulation[i].type + i + " ate " + worldPopulation[j].type + j );
                            worldPopulation[j].state = "dead";
                            worldPopulation[i].starvecount = 0;
                            worldPopulation[i].state = "alive";
                            worldPopulation[i].food += 10;
                        }
                    }
                    //console.log("Organisms collided (i & j are in the same place i: " + i + " j: " + j);
                }
            }
        }
    }
}

//This calls the function updateSimulation every second(1000 milliseconds)
setInterval(updateSimulation, 10000);



//This will set up the space for the simulation
function simulationSetup(){

}
