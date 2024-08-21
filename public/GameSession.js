
class gameSession{
  constructor(name, perlin){
    this.mapLandMarks = [[]]
    this.name = name
    this.inGame = true
    this.showGame = true
    this.perlin = perlin
    this.wall = loadImage('assets/wall.jpg');
    this.floorImg = loadImage('assets/floor.png')
    this.playerImg = loadImage('assets/randomGuy.gif')
    this.EvilPlayerImg = loadImage('assets/evilGuy.gif')
    this.gunImg = loadImage('assets/gun.png')
    this.map = this.perlin.genMap()
    this.player = new player(this.x, this.y, this.playerImg, pData.id, pData.role, this.EvilPlayerImg)
    //checks length of lobby and if only one player the player sends map data to all other clients
    this.readMap("hospital.txt") // pushes selected landmark tilemaps to mapLandMarks
    this.readMap("hospital.txt")
    this.readMap("hospital.txt")
    this.readMap("hospital.txt")
    this.readMap("hospital.txt")
   


    
  }
play(Ldata){
  
  

  if(cData.length < 2){//checks length of lobby and if only one player the player sends map data to all other clients
    socket.emit("lobbyData", [this.map, this.mapLandMarks])
    
  }
  if(Ldata.map !== null){ //sets map to the map sent by the server
    this.perlin.mapObj = Ldata.map
  }
  if(Ldata.mapLandMarks !== null){ //sets map to the map sent by the server

    this.mapLandMarks = Ldata.mapLandMarks
  }

  push()

    translate(windowWidth / 2 - pPos.x, windowHeight / 2 - pPos.y);
    this.perlin.drawMap(pPos.x, pPos.y)
    this.movement()
    
   

    for(let i = 0; i<this.mapLandMarks[0].length; i++){
      if(pPos.x - windowWidth*2 < this.mapLandMarks[0][i][0][0] && pPos.x + windowWidth > this.mapLandMarks[0][i][0][0] && pPos.y - windowHeight-windowHeight/2< this.mapLandMarks[0][i][0][1] && pPos.y + windowHeight+200 > this.mapLandMarks[0][i][0][1]){//checks if each landmark is in the viewport and if it is draws the landmark (i.e chunking algorythm)
      this.drawMap(this.mapLandMarks[0][i], this.mapLandMarks[0][i][0][0], this.mapLandMarks[0][i][0][1])
        }

    }
    

    
    
    
    
    for(let i = 0; i < cData.length; i++){
      fill(0)
      //current lobby players list

      if(cData[i].health>0){
      if(cData[i].loc !== null && cData[i].id !== pData.id){
        if(cData[i].role == "hunted"){
          image(this.playerImg, cData[i].loc.x, cData[i].loc.y, 60,60)// spawn other Hunted 
        }
        else{
          image(this.EvilPlayerImg, cData[i].loc.x, cData[i].loc.y, 60,60)
        }
        
        image(this.gunImg, cData[i].loc.x+40,cData[i].loc.y+30,20,20)
        text(cData[i].name, cData[i].loc.x-30, cData[i].loc.y-20)//name above players
        
        
        
      }
      else if(cData[i].id == pData.id){
        pData.health = cData[i].health
        pData.role = cData[i].role
        this.player.role = cData[i].role
        
      }

    }
      
      
    }
  pop()
  for(let i = 0; i < cData.length; i++){
    text(i+") "+ cData[i].name, 150, (i*25)+50)
  }
  
    textSize(50)
    fill(0)
    text("Lobby: " + Ldata.name, 500, 50)
    textSize(25)
    text("Lobby players(max: 9):", 200, 25)
    text("Health: " + pData.health, 200, windowHeight-75)
    text("Your Name: " + this.name, 500, 100)
    
    

    
    
    pData.id = pid//player id
    pData.loc = pPos//sending player position to be sent to server
    pData.name = "guest-" + pid.substring(0,3)
    pData.bullets = this.player.bullets
    socket.emit("locUpdate", pData);// request game state update and sends current player data
    socket.emit("timer")
    if(Ldata.map != null){
      this.perlin.mapObj = Ldata.map
    }
    
    
                           
  
    
    
   
    
    

     
       this.player.x = pPos.x
       this.player.y = pPos.y
       this.player.img = this.playerImg
       this.player.show(cData)
         
     
     
     
  
    
    if(cData.timeTilStart > -1){

      fill(0)
      text("The Game Shall Begin in:", windowWidth/2, 50)
      text(cData.timeTilStart, windowWidth/2, 76)
      textSize(25)
      
    }
    else if(cData.timeTilStart < 0){

      fill(0)
      text("The Game Has Begun!!!", windowWidth/2, 50)
      textSize(25)

    }
    
    
  }
  getT(){
    return this.t
  }

 



  movement(){
    
    let speed = 5
    if (keyIsDown(87) && keyIsDown(68)) {//w
      pPos.y = pPos.y - Math.sqrt (speed/4)
      pPos.x = pPos.x + Math.sqrt (speed/4)
      console.log("wd")
    }
    else if(keyIsDown(65) && keyIsDown(87)){
      pPos.y = pPos.y - Math.sqrt (speed/4)
      pPos.x = pPos.x - Math.sqrt (speed/4)
      console.log("wa")
    }
    else if (keyIsDown(87)) {//w
      pPos.y= pPos.y - speed
      console.log("w")
    }
     
     if (keyIsDown(65)) {//a
      pPos.x = pPos.x - speed
    }  
    if(pPos.x < 3500){
      if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {//d
       pPos.x = pPos.x + speed
    }
    }
    if(pPos.y < 3500){
      if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {//s
        pPos.y = pPos.y + speed
      }
    }
    
  }

  async readMap(url) {
      const response = await fetch(url); //gets text file fromselected url
      const text = await response.text(); //reads text file
      this.mapLandMarks[this.mapLandMarks.length-1].push(this.txtToArr(text, this.mapLandMarks)); //converts text file to array and pushes to mapLandMarks array
    console.log(this.mapLandMarks)

  }

  txtToArr(txt, mapLandMarks){

      let coord = this.randomCoord(mapLandMarks) //gets valid random coordinates for landmark location.
      let arr = [[coord[0], coord[1]],[ ]] //sets up array for the landmark with the random location.
      for(let i = 1; i < txt.length; i++){ //loops through each character in text file
        if(txt[i] != ","){
          arr[arr.length-1].push(txt[i]) //pushes character to array if it is not a comma
  
        }
        else if(txt[i] == ","){ //if comma is found pushes array to mapLandMarks array to increase y axis by 1
          arr.push([])
  
        }
      }
      //console.log(arr)
  
  
      return arr
    }



  randomCoord(landmarks){
      let x = random(0,4000)
      let y = random(0,4000)
  
  
      // for(let i = 0; i < landmarks[0].length; i++){ //loops through all landmarks
      //   if(Math.abs(landmarks[0][i][0][0] - x) < 500 && Math.abs(landmarks[0][i][0][1] - y) < 500){
      //     if(Math.abs(landmarks[0][i][0][0] - x) > Math.abs(landmarks[0][i][0][1] - y)){ //checks whether the random coord is too close to current landmarks.
      //     y = y + landmarks[0][i][0][0] - y//if to close, moves y coord
      //   }
      //     else{x = x + landmarks[0][i][0][0] - x} //if to close, moves x coord
  
      // }
      // }
      return [x,y] //return suitable location
    }
  
  
    drawMap(tile, x, y){
  
      for(let i = 0; i < tile.length; i++){ //loops through the y axis of tile map
        for(let j = 0; j < tile[i].length; j++){//loops through x axis of tile map
        if(tile[i][j] == 1){
          image(this.wall,(Number(j)*40)+x, (Number(i)*40)+y, 40, 40) //draws selected tile with location offset.
  
        }
          else if(tile[i][j] == 2){
            image(this.floorImg,(Number(j)*40)+x,(Number(i)*40)+y,40,40) //draws selected tile with location offset.
  
          }
      else{
  
        }
      }
    }
    }



  
}