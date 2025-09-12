
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
//ctx.fillStyle = "green";
//ctx.fillRect(0, 0, 150, 75);
// ctx.beginPath();
// ctx.arc(100, 100, 50, 0, 2 * Math.PI);
// ctx.fillStyle = "green";
// ctx.lineWidth = 2;
// ctx.fill();
// ctx.stroke();

//var specificAnimalsTotal = 0;
const specificAnimals = [{type: "girrafe", count: 0, eats: ["plant"]}, {type: "lion", count: 0, eats: ["girrafe", "zebra"]}, {type: "zebra", count: 0, eats: ["plant"]}, {type: "tiger", count: 0, eats: ["zebra", "girrafe"]}]
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
const worldPlants = [];
const numberOfRandomPlants = 100
const organismSize = 10


//At what value do you want the animals to starve to death?
const starveValue = 10000;

//creates a plant class 
class Plants{
    static knownStates = ["alive", "dead"]
    static maximumBoundary = 999;
    constructor(x, y, state, timealive){
        if(typeof x === "number"){
            if(Math.abs(x) > Organism.maximumBoundary){
                throw new Error("ERROR: X Value is out of range. (" + x + ") Maximum X value: +/-" + Organism.maximumBoundary);
            }
            this.x = x;
        }else{
            throw new Error("ERROR: X is Not A Number- " + x);
        }

        if(typeof y === "number"){
            if(Math.abs(y)>Organism.maximumBoundary){
                throw new Error("ERROR: Y Value is out of range. (" + y + ") Maximum Y value: +/-" + Organism.maximumBoundary);
            }
            this.y = y;
        }else{
            throw new Error("ERROR: Y is Not A Number- " + y);
        }

        if(Plants.knownStates.includes(state)){
            this.state = state;
        }else{
            throw new Error("ERROR: Unknown State- " + state + " Valid States: " + Plants.knownStates);
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
    }
}

//Creates an "Organism" class which has properties x, y, and speed, and a state.\
class Organism {
//    static knownAnimalTypes = ["girrafe", "frog", "cat", "dog"];

    static knownStates = ["alive", "dead", "wounded", "starving"];
    static maximumBoundary = 999;
    constructor(x, y, speed, state, type, food, starvecount, timealive){
        //(0,0) is at the middle of the grid and we allow negative positions. We do not allow numbers with their abs. value greater than the bounds of the canvas
        
        if(typeof x === "number"){
            if(Math.abs(x) > Organism.maximumBoundary){
                throw new Error("ERROR: X Value is out of range. (" + x + ") Maximum X value: +/-" + Organism.maximumBoundary);
            }
            this.x = x;
        }else{
            throw new Error("ERROR: X is Not A Number- " + x);
        }

        if(typeof y === "number"){
            if(Math.abs(y)>Organism.maximumBoundary){
                throw new Error("ERROR: Y Value is out of range. (" + y + ") Maximum Y value: +/-" + Organism.maximumBoundary);
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


        if(Organism.knownStates.includes(state)){
            this.state = state;
        }else{
            throw new Error("ERROR: Unknown State- " + state + " Valid States: " + Organism.knownStates);
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
    const temp = new Organism(0, 0, Math.floor(Math.random() * 5) + .25/* this sets the Organism's speed to anything from 0 to 1.*/, "alive", knownAnimalTypes[Math.floor(Math.random() * knownAnimalTypes.length)], 5, 0, 0);
    worldPopulation.push(temp);
}

for (var i = 0; i < numberOfRandomPlants; i++){
    const temp = new Plants(0, 0, "alive", 0);
    worldPlants.push(temp);
}

specificAnimals.forEach(animal => {
//    console.log (animal.type + ": " + animal.count);
    for (var i = 0; i < animal.count; i++){
        const temp = new Organism(0, 0, Math.floor(Math.random() * 5) + .25/* this sets the Organism's speed to anything from 0 to 1.*/, "alive", animal.type, 5, 0, 0);
        worldPopulation.push(temp);
    }
})

//console.log(worldPopulation);
//Test Cases Here v
//creates an Organism called a girrafe with starting x, y, and speed values of 0, with an "alive" state.
//const girrafe0 = new Organism(0, 9, 10, "alive", "girrafe", 0, 0, 0);
//const girrafe1 = new Organism(10000, 0, 0, "dead", "girrafe");
//const girrafe3 = new Organism(0, 0, 0, "hal", "girrafe");
//const girrafe2 = new Organism(0, 0, 0, "alive", "chicken");
// const girrafe = new Organism(0, 0, 0, "alive", "girrafe");
// const frog = new Organism(0, 0, 0, "alive", "frog");
// const cat = new Organism(0, 0, 0, "alive", "cat");
// const dog = new Organism(0, 0, 0, "alive", "dog");
//console.log(girrafe0);
//console.log(girrafe0, girrafe1, girrafe2, girrafe3);

function updateSimulation(){
    ctx.fillStyle = 'white'; 
    ctx.fillRect(0, 0, c.width, c.height);

    //This checks if an Organism has food, and if it doesnt starts a starving count. When this reaches the starve value, the animals state becomes "dead".
    for(var i = 0; i < worldPopulation.length; i++){

        if(worldPopulation[i].food === 0 && worldPopulation[i].state != "dead"){
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

    //This will make Organisms appear at a random position to start using math.random
    for(var i = 0; i < worldPopulation.length; i++){
        if(worldPopulation[i].x === 0){
            if(worldPopulation[i].timealive === 0){
                worldPopulation[i].x = Math.floor(Math.random() * (Organism.maximumBoundary + 1));
            }
        }
        if(worldPopulation[i].y === 0){
            if(worldPopulation[i].timealive === 0){
                worldPopulation[i].y = Math.floor(Math.random() * (Organism.maximumBoundary + 1));
            }
        }
        if(worldPopulation[i].state != "dead" ){
            worldPopulation[i].timealive += 1
        }
    }

    //This will make Plants appear at a random position to start using math.random
    for(var i = 0; i < worldPlants.length; i++){
        if(worldPlants[i].x === 0){
            if(worldPlants[i].timealive === 0){
                worldPlants[i].x = Math.floor(Math.random() * (Plants.maximumBoundary + 1));
            }
        }
        if(worldPlants[i].y === 0){
            if(worldPlants[i].timealive === 0){
                worldPlants[i].y = Math.floor(Math.random() * (Plants.maximumBoundary + 1));
            }
        }
        if(worldPlants[i].state != "dead" ){
            worldPlants[i].timealive += 1
        }
    }

    //This will cause the Organisms to move in a random direction(up, down, left, right, or diagonal) by the speed.
    for(var i = 0; i < worldPopulation.length; i++){
        if(worldPopulation[i].state === "dead"){
            //console.log("Dead Animals cant fly");
        }else{
            //North is decreasing y, South is increasing y.
            //East is increasing x, West is decreasing x.
            var direction = allDirections[Math.floor(Math.random() * allDirections.length)];
            //console.log("the direction is: " + direction + " "+ worldPopulation[i].type + i);
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
        if(worldPopulation[i].x > Organism.maximumBoundary){
            worldPopulation[i].x = Organism.maximumBoundary;
        }
        if(worldPopulation[i].x < 0){
            worldPopulation[i].x = 0;
        }
        if(worldPopulation[i].y > Organism.maximumBoundary){
            worldPopulation[i].y = Organism.maximumBoundary;
        }
        if(worldPopulation[i].y < 0){
            worldPopulation[i].y = 0;
        }
    }

    //Checking distance between animals for collision
    for(var i = 0; i < worldPopulation.length; i++){
        for(var j = 0; j < worldPopulation.length; j++){
            if(i != j && worldPopulation[i].state != "dead" && worldPopulation[j].state != "dead" && worldPopulation[j].timealive != 0){
                if(Math.abs(worldPopulation[i].x - worldPopulation[j].x) < organismSize && Math.abs(worldPopulation[i].y - worldPopulation[j].y) < organismSize){
                    //Animals eat eachother 
                    var onTheMenu = animalSearchFood(worldPopulation[i].type);
                    if(onTheMenu.includes(worldPopulation[j].type)){
                        console.log("There was a murder: " + worldPopulation[i].type + i + " ate " + worldPopulation[j].type + j );
                        worldPopulation[j].state = "dead";
                        worldPopulation[i].starvecount = 0;
                        worldPopulation[i].state = "alive";
                        worldPopulation[i].food += 1000;
                    }

                    //Animals Reproduce
                    if(worldPopulation[i].state != "dead" && worldPopulation[i].type === worldPopulation[j].type && worldPopulation[i].food >= 10/*The organism has to have at least 10 food to reproduce*/ && worldPopulation[j].food >= 10 && worldPopulation[i].timealive >= 10 && worldPopulation[j].timealive >= 10){
                        const temp = new Organism(worldPopulation[i].x, worldPopulation[i].y, Math.floor(Math.random() * 5) + .25/* this sets the Organism's speed to anything from 0 to 1.*/, "alive", worldPopulation[i].type, 5, 0, 0);
                        worldPopulation.push(temp);
                        console.log("baby: " + worldPopulation[i].type + " " + i + " and " + worldPopulation[j].type + " " + j);
                        worldPopulation[i].food -= 10
                        worldPopulation[j].food -= 10
                    }
                }
            }
        }
    }

    //Checking if a plant gets eaten by an organism
    for(let i = 0; i < worldPopulation.length; i++){
        for(let j = 0; j < worldPlants.length; j++){
            if(worldPopulation[i].state != "dead" && worldPlants[j].state != "dead"){//checking plant and animal arent dead
                if(Math.abs(worldPopulation[i].x - worldPlants[j].x) < organismSize && Math.abs(worldPopulation[i].y - worldPlants[j].y) < organismSize){
                    var isHerbivore = animalSearchFood(worldPopulation[i].type)
                    if(isHerbivore.includes("plant")){
                        console.log("There was a plant murder: " + worldPopulation[i].type + i + " ate plant: " + j );
                        worldPlants[j].state = "dead";
                        worldPopulation[i].starvecount = 0;
                        worldPopulation[i].state = "alive";
                        worldPopulation[i].food += 1000;
                    }
                }
            }
        }
    }

        //Drawing the Plants
    for(var i = 0; i < worldPlants.length; i++){
        ctx.beginPath();
        ctx.arc(worldPlants[i].x, worldPlants[i].y, organismSize, 0, 2 * Math.PI);
        if(worldPlants[i].state === "alive"){
            ctx.fillStyle = "purple";
        }else{
            ctx.fillStyle = "black";
        }

        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
    }


    //Drawing the Organisms
    for(var i = 0; i < worldPopulation.length; i++){
        ctx.beginPath();
        ctx.arc(worldPopulation[i].x, worldPopulation[i].y, organismSize, 0, 2 * Math.PI);
        if(worldPopulation[i].state === "alive"){
            ctx.fillStyle = "green";
        }else if(worldPopulation[i].state === "starving"){
            ctx.fillStyle = "yellow";
        }else{
            ctx.fillStyle = "red";
        }

        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
    }

    //Displaying information on organisms
    var aliveOrganisms = 0;
    var deadOrganisms = 0;
    var starvingOrganisms = 0; 
    var alivePlants = 0;
    for(var i = 0; i < worldPopulation.length; i++){
        if(worldPopulation[i].state === "alive"){
            aliveOrganisms += 1
        }
        if(worldPopulation[i].state === "dead"){
            deadOrganisms += 1
        }
        if(worldPopulation[i].state === "starving"){
            starvingOrganisms += 1
        }
    }
    for(var i = 0; i < worldPlants.length; i++){
        if(worldPlants[i].state === "alive"){
            alivePlants += 1
        }
    }
    document.getElementById("data").innerHTML = "Number of Alive Organisms: " + aliveOrganisms + "<br>Number of Dead Organisms: " + deadOrganisms + "<br>Number of Starving Organisms: " + starvingOrganisms + "<br>Number of Alive Plants: " + alivePlants;
}

//This calls the function updateSimulation every second(1 millisecond)
setInterval(updateSimulation, 1);
