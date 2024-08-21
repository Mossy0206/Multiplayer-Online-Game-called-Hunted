
class startLobby{
  
  constructor(type) {
    this.type = "startLobby"
    this.start = new Button(windowWidth/8*6, windowHeight/6*5, windowWidth/5, windowHeight/9, "lobbyStart",[204, 102, 0], [178,34,34]);
    this.items = [this.start]
  }

  show(){
    background(0)
    for(let i = 0; i<this.items.length; i++){
      this.items[i].display()
    }
  }

  

  event(x,y){
    for(let i = 0; i<this.items.length; i++){
      if(this.items[i].contains(x,y)){
        return this.items[i].label
      }
      
    }
  }

  


  
  
}