class Button {
  constructor(x, y, width, height, label, col, altCol) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.label = label;
    this.col = col
    this.altCol = altCol
  }



  display() {
    // Draw the button
    fill(this.col);
    if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
      fill(this.altCol)
    }
    rect(this.x, this.y, this.width, this.height);

    // Draw the button label
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(this.label, this.x + this.width / 2, this.y + this.height / 2);
    
    
  }

  contains(x, y){
    // Check if a point (x, y) is inside the button's bounds
    return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height;
  }

  
}