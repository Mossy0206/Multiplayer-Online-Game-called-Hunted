
class accountMenu {
  
  constructor(type) {
    this.type = "createAccount"
    this.start = new Button(windowWidth/2-windowWidth/6, windowHeight/6*1, windowWidth/3, windowHeight/8, "name",[204, 102, 0]);
    this.account = new Button(windowWidth/2-windowWidth/6, windowHeight/6*2, windowWidth/3, windowHeight/8, "password", [204, 102, 0]);
    this.items = [this.start, this.account]
  }

  show(){
    background(0)
    for(let i = 0; i<this.items.length; i++){
      this.items[i].display()
    }
  }

  end(){
    
  }

  event(x,y){
    for(let i = 0; i<this.items.length; i++){
      if(this.items[i].contains(x,y)){
        return this.items[i].label
      }
      
    }
  }

  


  
  
}

