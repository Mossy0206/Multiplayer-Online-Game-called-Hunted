const express = require("express"); // use express
const app = express(); // create instance of express
const server = require("http").Server(app); // create server 
const io = require("socket.io")(server); // create instance of socketio
const lobby = require('./Session.js')//imports my lobby session class.

lobbys = []//where all lobbys on this server will go
userLobbys = [] // array of all socket id's connected and their room
app.use(express.static("public")); // use "public" directory for static files
lobbys.push(new lobby(express,app,server,io, lobbys.length))// starts new lobby.




initRandomMatchmaking()



function initRandomMatchmaking(){
  io.on("connection", socket => {// runs when someone opens web page
    socket.on("ping", (callback) => {//debugging data and use to get ping and dubugging info.
     callback();
   });
    
   socket.on("connection", () => { // when server recieves connection
     
     socket.emit("conn_successful");//confirm connection successful
   });
    
    socket.on("randomMatchmaking", () => { // when server recieves randomMatchmaking signal
      let full = true; //local variable that that flags false if there is an empty lobby but stays true if all lobbys are full.
      for(let i = 0; i<lobbys.length; i++){
       if(lobbys[i].getfull()){//checks if the lobby is full, and if it is full creates new lobby and joins it.
         full = true;
         
       }
       else if(!lobbys[i].getfull()){//checks if the lobby is full, and if its not full it joins the lobby and stops searching for another lobby.
         full = false
         lobbys[i].joinLob(socket)
         userLobbys.push([socket.id, i])
         break //break if space in server
       }
        
    }
    if(full){//creates new server if full and connects the new player.
      lobbys.push(new lobby(express,app,server,io, lobbys.length))
      lobbys[lobbys.length-1].joinLob(socket)
      userLobbys.push([socket.id, lobbys.length-1])
      
    }
     
     
     
     for(let i = 0; i<lobbys.length; i++){
       lobbys[i].update(socket)
       //updates all lobbys to latest game state.
       
     }
  });

     
     socket.on('disconnect', () => { //runs if a socket disconnects
       
       for(let i = 0; i<userLobbys.length; i++){// searches for the socket that disconnected in userLobbys to get its room index.
      
        if(socket.id === userLobbys[i][0]){
         
          lobbys[userLobbys[i][1]].disconnect(socket)//disconnects socket from the room
          userLobbys.splice(i, 1);//removes from the userLobbys when disconnected
          console.log(socket.id + " disconnected;")
        }
         

      }
       for(let i = 0; i<lobbys.length; i++){
         if(lobbys[i].getCap() === 0){
           lobbys.splice(i, 1)
            console.log("lobby-" + i + " removed")//removes a lobby if its empty.
         }
       }
      
      

   });
     
     
     
   });


server.listen(2456); // run server
}

function newLobby(full){
  if(full){//creates new server if full and connects the new client.
      lobbys.push(new lobby(express,app,server,io, lobbys.length))
      lobbys[lobbys.length-1].joinLob(socket)
      userLobbys.push([socket.id, lobbys.length-1])
      
    }
}


