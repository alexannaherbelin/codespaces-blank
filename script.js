
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
const specificAnimals = [{type: "girrafe", count: 0, eats: ["plant"]}, {type: "lion", count: 0, eats: ["girrafe"]}, {type: "zebra", count: 0, eats: ["plant"]}, {type: "tiger", count: 0, eats: ["zebra"]}]
const knownAnimalTypes = specificAnimals.map((x) => x.type);
//How many random animals do you want to create?
const numberOfRandomAnimals = 500;
//const allDirections = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest", "stayput"];
const worldPopulation = [];
const worldPlants = [];
const numberOfRandomPlants = 1000
const organismSize = 10
const alivePlantgraph = []
const numAliveLionsgraph = []
const numAliveTigersgraph = []
const numAliveZebrasgraph = []
const numAliveGirrafesgraph = []
const hurricanesize = 20
const naturalDisasterslist = []
const naturalDisasters = 5
const directions = [-1, 0, 1]
//when do animals starve?
const starveValue = 10000;

function animalSearchFood(needle){
    for(i = 0; i < specificAnimals.length; i++){
        if(specificAnimals[i].type === needle){
            return specificAnimals[i].eats;
        }
    }
}

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
    static knownStates = ["alive", "dead", "wounded", "starving"];
    static maximumBoundary = 999;
    constructor(x, y, speed, state, type, food, starvecount, timealive, breedCooldown, breedTimer){
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

        if(typeof breedCooldown === "number"){
            if(breedCooldown < 0){
                throw new Error("ERROR: Breed Cooldown Value is Not A Positive Number. (" + breedCooldown + ")");
            }else{
                this.breedCooldown = breedCooldown;
            }
        }else{
            throw new Error("ERROR: Breed Cooldown Value is Not A Number- " + breedCooldown);
        }

        if(typeof breedTimer === "number"){
            if(breedTimer < 0){
                throw new Error("ERROR: Breed Timer Value is Not A Positive Number. (" + breedTimer + ")");
            }else{
                this.breedTimer = breedTimer;
            }
        }else{
            throw new Error("ERROR: Breed Timer Value is Not A Number- " + breedTimer);
        }
    };
};

class Disaster {
    constructor(x, y, speed, radius){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.radius = radius;
    }
    
    hurricane(){
        for(let i = 0; i < worldPopulation.length; i++){
            if (worldPopulation[i].state != "dead") {
                if(Math.abs(worldPopulation[i].x - this.x) <= this.radius && Math.abs(worldPopulation[i].y - this.y) <= this.radius){
                    worldPopulation[i].state = "dead";
                }
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "orange";
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
    }
}

let myChart;
function initializeChart() {
    const ctx = document.getElementById("myChart").getContext("2d");

    myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "Alive Plants",
                data: [],
                borderColor: "red",
                fill: false
            }, {
                label: "Alive Lions",
                data: [],
                borderColor: "yellow",
                fill: false
            }, {
                label: "Alive Tigers",
                data: [],
                borderColor: "green",
                fill: false
            }, {
                label: "Alive Zebras",
                data: [],
                borderColor: "purple",
                fill: false
            }, {
                label: "Alive Girrafes",
                data: [],
                borderColor: "pink",
                fill: false
            }]
        },
        options: {
            animation: false,
            responsive: true
        }
    });
}

initializeChart();

for(let i = 0; i < naturalDisasters; i++){
    naturalDisasterslist.push(new Disaster(Math.floor(Math.random() * (Plants.maximumBoundary + 1)),Math.floor(Math.random() * (Plants.maximumBoundary + 1)), 10, hurricanesize))
    naturalDisasterslist[i].hurricane(naturalDisasterslist[i].x, naturalDisasterslist[i].y, 50, 20);
}

for (var i = 0; i < numberOfRandomAnimals; i++){
    const temp = new Organism(0, 0, Math.floor(Math.random() * 5) + .25/* this sets the Organism's speed to anything from 0 to 1.*/, "alive", knownAnimalTypes[Math.floor(Math.random() * knownAnimalTypes.length)], 500, 0, 0, 10, 0);
    worldPopulation.push(temp);
}

for (var i = 0; i < numberOfRandomPlants; i++){
    const temp = new Plants(0, 0, "alive", 0);
    worldPlants.push(temp);
}

specificAnimals.forEach(animal => {
    for (var i = 0; i < animal.count; i++){
        const temp = new Organism(0, 0, Math.floor(Math.random() * 5) + .25/* this sets the Organism's speed to anything from 0 to 1.*/, "alive", animal.type, 500, 0, 0, 100, 0);
        worldPopulation.push(temp);
    }
})

function move(input){
    for(var i = 0; i < input.length; i++){
        if(input[i].state != "dead"){
            //North is decreasing y, South is increasing y.
            //East is increasing x, West is decreasing x.
            let speedX = input[i].speed * directions[Math.floor(Math.random() * directions.length)]
            let speedY = input[i].speed * directions[Math.floor(Math.random() * directions.length)]
            input[i].x += speedX
            input[i].y += speedY

            if(input[i].x > Organism.maximumBoundary){
                input[i].x = Organism.maximumBoundary;
            }
            if(input[i].x < 0){
                input[i].x = 0;
            }
            if(input[i].y > Organism.maximumBoundary){
                input[i].y = Organism.maximumBoundary;
            }
            if(input[i].y < 0){
                input[i].y = 0;
            }
        }
    }
}

let stepCounter = 0;
function updateSimulation(){
    ctx.fillStyle = 'white'; 
    ctx.fillRect(0, 0, c.width, c.height);
    
    
    //This checks if an Organism has food, and if it doesnt starts a starving count. When this reaches the starve value, the animals state becomes "dead".
    for(var i = 0; i < worldPopulation.length; i++){
         //console.log(worldPopulation[i].breedCooldown + "ANDDDDDDD" + worldPopulation[i].breedTimer);
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
        if(worldPopulation[i].timealive >= 10000){
            worldPopulation[i].state = "dead";
            console.log(worldPopulation[i].type + i + "died of old age");
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
    for (var i = 0; i < worldPlants.length; i++){
    if(worldPlants[i].timealive === 0){
        worldPlants[i].x = Math.floor(Math.random() * (Plants.maximumBoundary + 1));
        worldPlants[i].y = Math.floor(Math.random() * (Plants.maximumBoundary + 1));
    }
    if(worldPlants[i].state != "dead" ){
        worldPlants[i].timealive += 1
    }
}

    //This will cause the Organisms to move in a random direction(up, down, left, right, or diagonal) by the speed.
    move(worldPopulation);
    //This causes hurricanes to move
    move(naturalDisasterslist);


        // to whom it may concern: Albinson thinks that this is 
        // definitely the better way to do this and while he agrees
        // not to "take off a lot of points", he does reserve
        // the right to take off a very small amount of points.  x < 2.
        //signed - Mr Matthew Albinson, 9/24 year of our lord 2025

        // if and/or when this solution is implemented, full point shall be
        // issued to said student.  Unless they are too demanding in which
        // case I reserve the right to take one point off for me troubles
    
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
                    if(worldPopulation[i].state != "dead" && worldPopulation[i].type === worldPopulation[j].type && worldPopulation[i].food >= 10/*The organism has to have at least 10 food to reproduce*/ && worldPopulation[j].food >= 10 && worldPopulation[i].timealive >= 100 && worldPopulation[j].timealive >= 100 && worldPopulation[i].breedTimer >= worldPopulation[i].breedCooldown && worldPopulation[j].breedTimer >= worldPopulation[j].breedCooldown){
                        const temp = new Organism(worldPopulation[i].x, worldPopulation[i].y, Math.floor(Math.random() * 5) + .25/* this sets the Organism's speed to anything from 0 to 1.*/, "alive", worldPopulation[i].type, 5, 0, 0, 100, 0);
                        worldPopulation.push(temp);
                        console.log("baby: " + worldPopulation[i].type + " " + i + " and " + worldPopulation[j].type + " " + j);
                        worldPopulation[i].food -= 10;
                        worldPopulation[j].food -= 10;
                        worldPopulation[i].breedTimer = 0;
                        worldPopulation[j].breedTimer = 0;
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
//ctx.fillText("L", worldPopulation[i].x, worldPopulation[i].y);
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
    }

    //Displaying information on organisms
    var aliveOrganisms = 0;
    var deadOrganisms = 0;
    var starvingOrganisms = 0; 
    var alivePlants = 0;
    var numAliveLions = 0;
    var numAliveTigers = 0;
    var numAliveZebras = 0;
    var numAliveGirrafes = 0;
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
        if(worldPopulation[i].type === "lion" && worldPopulation[i].state != "dead"){
            numAliveLions +=1

        }
        if(worldPopulation[i].type === "tiger" && worldPopulation[i].state != "dead"){
            numAliveTigers +=1
        }
        if(worldPopulation[i].type === "zebra" && worldPopulation[i].state != "dead"){
            numAliveZebras +=1
        }
        if(worldPopulation[i].type === "girrafe" && worldPopulation[i].state != "dead"){
            numAliveGirrafes +=1
        }
        if(worldPopulation[i].breedTimer <= worldPopulation[i].breedCooldown){
            worldPopulation[i].breedTimer += 1;
        }
    }
    for(var i = 0; i < worldPlants.length; i++){
        if(worldPlants[i].state === "alive"){
            alivePlants+= 1
        }
    }
    alivePlantgraph.push(alivePlants);
    numAliveGirrafesgraph.push(numAliveGirrafes);
    numAliveLionsgraph.push(numAliveLions);
    numAliveTigersgraph.push(numAliveTigersgraph);
    numAliveZebrasgraph.push(numAliveZebrasgraph);
    //(unslash following code if you want the graph to move to only encompass 100 data points)
    //if (alivePlantgraph.length > 100) {
    //    alivePlantgraph.shift();
     //   myChart.data.labels.shift();
       
    //}
    stepCounter++;


    for (let i = 0; i < naturalDisasterslist.length; i++) {
        naturalDisasterslist[i].hurricane();
        naturalDisasterslist[i].draw();
    }
    

    myChart.data.labels.push(stepCounter);
    myChart.data.datasets[0].data.push(alivePlants);
    myChart.data.datasets[1].data.push(numAliveLions);
    myChart.data.datasets[2].data.push(numAliveTigers);
    myChart.data.datasets[3].data.push(numAliveZebras);
    myChart.data.datasets[4].data.push(numAliveGirrafes);
    myChart.update();

    document.getElementById("data").innerHTML = "Number of Alive Organisms: " + aliveOrganisms + "<br>Number of Dead Organisms: " + deadOrganisms + "<br>Number of Starving Organisms: " + starvingOrganisms + "<br>Number of Alive Plants: " + alivePlants;
}

//This calls the function updateSimulation every _ milliseconds
setInterval(updateSimulation, 50);
