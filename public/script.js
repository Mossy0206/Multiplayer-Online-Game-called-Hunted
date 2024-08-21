const socket = io(); // create new instance
var pid = "" //player id
var lobby
pPos = null // player position
var name = "" // player name
var randLobby = null
var debug = false
var tim
var perlin
var map

var initData = ({ //initalisation data
  name: name
})
var cData = ({ // current player data
  id: null,
  loc: null,
  type: null,
  timeTilStart: 0,
  bullets: [],
  health: -1,
  windowWidth: 0,
  windowHeight: 0,
  role: null,
  
})


var Ldata = ({ //lobby data
  name: this.roomName,
  lobbyPos: this.pos,
  players: this.users,
  timeTilStart: 30,
  map:  null,
  users: this.users,
  mapLandMarks: null,
  
})

function preload(){
  perlin = new perlinGen()
  
}

function dataListeners(){


  socket.on("timer", (t) => { //update lobby data
    cData.timeTilStart = t
    tim = t
    console.log("t")
    console.log(t)
    //randlobby.showGame = true
    
    
  });

   socket.on("locUpdate", (locdata) => {//update game state (cData)
     cData = locdata
     cData.timeTilStart = tim

     
     
     
   })

  socket.on("lobbyData", (lobdata) => { //update lobby data
    Ldata = lobdata
    
    
    //console.log(lobdata.timeTilStart)
    
    
    
    
  });

  socket.on("gameConfig", (configData) => { //update lobby data
    t = configData
    
    
    
  });

  socket.on("gameStarted", (map) => { //update lobby data
    if(!randLobby.inGame){
      socket.emit("gameStarted", (socket.id))
      randLobby.inGame = true
      console.log(map)
    }
      
    });
    
    

  socket.on("inGame", (data) => { //update lobby data
    if(data == true){
      randLobby.showGame = false
      
    }
    
    
  });

  socket.on("map", (mapObj) => { 
    randLobby.perlin.mapObj = mapObj
    console.log("map")

  });

  
}

 


function handShake(){ //sets up server connect
  socket.emit("connection"); // tell server that someone opened the page
  socket.on("conn_successful", () => { // server confirms connection
    console.log("Server_Reachable");
    pid = socket.id
    
    
    
  });
  

}






function setup() {
  currentStage = new StartMenu()
  
  
  //randLobby.map = perlin.genMap()
  pPos = createVector(int(random(0, 5000)), int(random(0, 5000)))
  

  handShake()
  createCanvas(windowWidth, windowHeight);
  console.log(windowWidth, windowHeight)
  
  background(100);
  frameRate(30)
  pData = {
    name: "guest-" + pid.substring(0,3),
    id: pid,
    loc: createVector(int(random(0, 10000)),int(random(0, 10000))),
    bullets: [],
    health: 100,
    role: "hunted",
  
  }
  
  
  

  
}

function draw() {
  clear()//clears canvas
  //
  
  if(currentStage === "startSingleRandLobby"){// starts a single player lobby
    startSingleRandLobby()
    cData.timeTilStart = tim
    
    
    
  }else{currentStage.show()}//shows the menu if current stage is a menu
  
  

  
  //curent position
  
}






function keyPressed(){
  if(keyCode == 113){ //F2 for debug info
    debug = !debug
    console.log("debug: " + debug)
    if(debug == true){diagnostics = setInterval(showInfo, 2000)}
    else{diagnostics = 0}
  }



  if (keyCode === 32) {
    randLobby.player.shoot()

  }
}

function showInfo(){//show debug info
  setInterval(() => {// ping calculation
    const start = Date.now();
    socket.emit("ping", () => {
    const duration = Date.now() - start;
    console.log(duration);
    });
  }, 2000);

}

function startSingleRandLobby(){
  dataListeners()
  if(randLobby === null){
    randLobby = new gameSession("guest-"+socket.id.substring(0,3), perlin)
  

    
    
    //randLobby.showGame = showGame
    //randLobby.inGame = inGame
    socket.emit("randomMatchmaking")

  
  
  
  }
  randLobby.play(Ldata)
  
}




function mouseClicked() { // runs anytime mouse is clicked
  if(typeof currentStage === 'object'){
    
    if(currentStage.event(mouseX, mouseY) === "lobbyStart"){ //checks if the start menu is clicked
      currentStage = "startSingleRandLobby"
    }
    else if(currentStage.event(mouseX, mouseY) === "Create Account"){ // checks if create account button clicked
       currentStage = new accountMenu()
    }
    else if(currentStage.event(mouseX, mouseY) === "Start"){ // checks if create account button clicked
      currentStage = new startLobby()
    }
  }
}

