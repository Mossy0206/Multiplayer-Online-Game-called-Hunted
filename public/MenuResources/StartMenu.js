
class StartMenu {
  constructor(type) {
    this.type = "start" // menu type
    this.start = new Button(windowWidth/2-windowWidth/6, windowHeight/6*1, windowWidth/3, windowHeight/8, "Start",[204, 102, 0], [178,34,34]);
    this.account = new Button(windowWidth/2-windowWidth/6, windowHeight/6*2, windowWidth/3, windowHeight/8, "Create Account", [204, 102, 0], [178,34,34]);
    this.items = [this.start, this.account]
  }

  show(){ // displays all features of menu.
    background(0)
    for(let i = 0; i<this.items.length; i++){
      this.items[i].display()
    }
  }

  event(x,y){ // returns the label of the button that has been pressed
    for(let i = 0; i<this.items.length; i++){
      if(this.items[i].contains(x,y)){
        return this.items[i].label
      }
    }
  }
}

