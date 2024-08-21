class player{

  constructor(x,y,img, ID, role, img2){

    this.x = x
    this.y = y
    this.img = img
    this.id = ID
    this.weapon = new weapon(0,loadImage("assets/gun.png"),loadImage("assets/bullet.png"), ID)
    this.bullets = []
    this.role = role
    this.evilImg = img2
    
   

  }


  show(enemyProjs){
    console.log(this.role)

    this.bullets = this.weapon.fire(enemyProjs)
    

    if(mouseX < (windowWidth / 2) + pPos.x - pPos.x){
      push()
      
      translate(windowWidth / 2 + pPos.x+60, windowHeight / 2 - pPos.y);
      scale(1,-1)
      rotate(radians(180))
      this.weapon.equip(pPos.x, pPos.y)
      if(this.role == "hunted"){
       image(this.img, this.x, this.y, 60, 60)
      }
      else{
        image(this.evilImg, this.x, this.y, 60, 60)
      }
      


      pop()
    }
    else{
      push()
      
      translate(windowWidth / 2 - pPos.x, windowHeight / 2 - pPos.y);
      rotate(radians(0))
      this.weapon.equip(pPos.x, pPos.y)
      if(this.role == "hunted"){
       image(this.img, this.x, this.y, 60, 60)
      }
      else{
        image(this.evilImg, this.x, this.y, 60, 60)
      }

      
      pop()
    }
    
     
    
    
  }
  shoot(){
    this.weapon.shoot()
  }

  




  



}