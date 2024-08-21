module.exports = class Game {
  constructor(express, app, server, io, roomName, socket) {
    this.express = express
    this.app = app
    this.server = server
    this.io = io
    this.roomName = roomName
    this.inGameUsers = []
    this.hunters = []
    this.hunted = []
    this.waitingUsers = []
    this.gameStarted = false
    this.timeTillStart = 10
    this.outGame = []
    this.socket;
    this.timerOn = true
    this.t
    this.users = []
    this.huntedDead = false
    this.huntersDead = false
    
    
  }


  update(users){

    
    
    
    if(this.gameStarted == false && users.length>2){
      this.startGame(users)
      
    }
    else{
      
      let add = users.length-(this.hunted.length+this.hunters.length)
      if(add>0){
        for(let i = 0; i<add; i++){
        users[users.length-(add+i)].role = "hunted"
        this.hunted.push(users[users.length-(add+i)])
        }
      }
      
      

    }
    
    
    
    
      for(let i = 0; i<users.length; i++){
        for(let j = 0; j<this.hunters.length; j++){
        if(this.hunters[j].id === users[i].id){
          //console.log(users[i].id + "is a hunter")
          users[i].role = "hunter"
          this.hunters[i] = users[i]
          
          
        }
      }
      

      for(let j = 0; j<this.hunted.length; j++){
        
        if(this.hunted[j].id === users[i].id){
          //console.log(users[i].id + "is a hunted")
          users[i].role = "hunted"
          this.hunted[j] = users[i]

        }
      }
    }
    
    this.collisionUpdate(users)
    this.checkStateOfGame(users)

}

  getTim(){
  return this.t
  }



  collisionUpdate(){
    console.log("Hunters" + this.hunters)
    console.log("Hunted " +this.hunted)
    console.log("----------------------------------------------------")
    
    
    if(this.hunted.length > 0 && this.hunters.length > 0){
      
    for(let i = 0; i<this.hunters.length; i++){
      for(let j = 0; j<this.hunted.length; j++){
        if(typeof this.hunters[i] !== "undefined" ||
          typeof this.hunted[j] !== "undefined"){

        
        
        for(let b = 0; b<this.hunters[i].bullets.length; b++){
          if(typeof this.hunters[i].bullets !== "undefined" || typeof this.hunted[j].bullets !== "undefined"){
         
          if(this.hunters[i].bullets[b].real.x > this.hunted[j].loc.x - 30 && this.hunters[i].bullets[b].real.x < this.hunted[j].loc.x + 30 && this.hunters[i].bullets[b].real.y > this.hunted[j].loc.y - 30 && this.hunters[i].bullets[b].real.y < this.hunted[j].loc.y + 30){
            
            
            this.hunted[j].health = this.hunted[j].health - 20
            if(this.hunted[j].health <= 0){
              this.hunters.push(this.hunted[j])
              this.hunters[this.hunters.length-1].role = "hunter"
              this.hunted.splice(j,1)
              
            }
            
            
          }
            
            
          
        
        
               

            if(typeof this.hunters[i].bullets !== "undefined" ||
    typeof this.hunted[j].bullets !== "undefined"){
        
        for(let c = 0; c<this.hunted[j].bullets.length; c++){
          

          if(this.hunted[j].bullets[c].real.x > this.hunters[i].loc.x - 30 && this.hunted[j].bullets[c].real.x < this.hunters[i].loc.x + 30 && this.hunted[j].bullets[c].real.y > this.hunters[i].loc.y - 30 && this.hunted[j].bullets[c].real.y < this.hunters[i].loc.y +30){
            this.hunters[i].health = this.hunters[i].health - 20
            if(this.hunters[i].health <= 0){
              this.hunted.push(this.hunted[i])
              this.hunted[this.hunted.length-1].role = "hunted"
              this.hunters.splice(i,1)
            }
          }
            
          }
            }
        }
          }
            
            

          
        }

          
        }
        
        


        }
      }

    
  }


  startGame(users){
    console.log("started")
    let ran = Math.floor(Math.random() * (users.length-1))
    users[ran].role = "hunter"
    this.hunted = users.slice()
    this.hunters.push(users[ran])
    this.hunted.splice(ran, 1)
    this.gameStarted = true
    console.log("hunters")
    console.log(this.hunters)
    console.log("hunted")
    console.log(this.hunted)
  }


  checkStateOfGame(users){
    if(this.gameStarted == true){
        for (let i = 0; i < this.hunted.length; i++) {
          if (this.hunted[i].health > 0) {
            this.huntedDead = false
            break
          }
          else if(this.hunted[i].health<=0){
            this.huntedDead = true
            this.hunters.push(this.hunted[i])
            this.hunters[this.hunters.length-1].health = 100
            this.hunted.splice(i, 1)
            
          }

        }
    }

   // if(this.huntedDead == true){
    //  this.startGame(users)
      
    //}
  }


  idCheck(list1, list2){
    for(let i = 0; i<list1.length; i++){
      for(let j = 0; j<list2.length; j++){
        if(list1[i].id === list2[j].id){
          return [i, j]
        }
      }
    }
    return false
    
  }
  
  
}
