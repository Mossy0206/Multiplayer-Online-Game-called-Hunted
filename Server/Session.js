
const game = require('./game.js')

module.exports = class Lobby{
  constructor(express, app, server, io, name){
    this.express = express
    this.app = app
    this.server = server
    this.io = io
    this.users = []
    this.size = 9
    this.roomName = name
    this.pos = name
    this.gameType = new game(this.express,this.app,this.server,this.io,this.roomName)
    this.t = 10
    this.started = false
    this.map = null
    
    
    console.log(this.roomName + " created;")
    this.serverInfo = ({
      name: this.roomName,
      lobbyPos: this.pos,
      players: this.users,
      timeTilStart: 30,
      map:  null,
      users: this.users,
      mapLandMarks: null
    })
    

    
  }

  getCap(){
    return this.users.length //gets the current amount of players in server.
  }
  
  getfull(){
    if(this.users.length === 9){//returns true if server is full 
      return true
    }
    else{return false}
  }
  joinLob(sock){
    sock.join(this.roomName)
    
    
    let playerInfo = ({ //creates player object to store player data
      name: "",
      id: sock.id,
      loc: null,
      type: null
      
     })
    
   

    
    
    this.io.to(playerInfo.id).emit("lobbyData", (this.serverInfo)) //sends server data to client on joining lobby.
    this.io.to(playerInfo.id).emit("inGame", (this.gameType.gameStarted))//tells player they are in the game
    this.users.push(playerInfo) // apopends player object to user array
   
   
    //console.log(sock.id+" joined "+ this.roomName)
    //console.log(this.users)
    
  }

  update(socket){
    this.serverInfo.users = this.users

     
  
    //console.log(this.gameType.t)
   
    
        
       
        
      
    

      socket.on("locUpdate", (data) => {//sends updates games state when requested by client
        
        this.gameType.update(this.users)
        

        socket.server.in(this.roomName).emit("locUpdate", this.users).broadcast;
        
        
         for(let i = 0; i<this.users.length; i++){
           if(this.users[i].id === data.id){
             this.users[i].id = data.id
             this.users[i].loc = data.loc//updates gamestate
             this.users[i].name = data.name
             this.users[i].bullets = data.bullets
             this.users[i].health = data.health
             
             
           }
         }

        
      })


    socket.on("lobbyData", (data) => { // sends lobby data when requested by client
      
      
      if(this.serverInfo.map == null){
        this.serverInfo.map = data[0]
      }
      if(this.serverInfo.mapLandMarks == null){
        this.serverInfo.mapLandMarks = data[1]
        
      }
      socket.server.in(this.roomName).emit("lobbyData", this.serverInfo);
      })

  }
  disconnect(socket){
    for(let i = 0; i < this.users.length; i++){//checks index of disconnected user
      if(this.users[i].id === socket.id){
        this.users.splice(i, 1);// removes player if disconnected
        
      }
    }
    
  }
}


  


  




  

  // console.log(this.roomName + "-" + this.gameType)
      
  //       for(let i = 0; i<this.users.length; i++){
        
  //           this.users[i].type = "hunted"
  
  //       }
  //       this.users[Math.floor(Math.random() * this.users.length)].type = "hunter"
  //       console.log(this.users)
      
      
  //     }