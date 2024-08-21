class weapon {
  constructor(typInt, gunImg, ammoImg, ID) {
    this.type = typInt
    this.weaponName = ""
    this.gunImg = gunImg;
    this.ammoImg = ammoImg
    this.offset = createVector(12, 15)
    this.bullets = []
    this.currentVect = createVector(0,0)
    this.gunLoc = createVector(0,0)
    this.ammoLoc = createVector(0,0)
    this.start = createVector(0,0)
    //this.dir = inDir
    this.id = ID
    this.loc = null


  }

  setDir(x){
    this.dir = x
  }

  equip(x,y) {
   this.ammoLoc = createVector(x + 30, y)//sets gun loc
    this.gunImg.resize(20,0)
    image(this.gunImg, x+40,y+30)
      
    
    



  }
  getType() {
    return this.type
  }



  shoot(){
    this.aimProjs(this.bullets)
    console.log("shoot")
  }
  fire(enemyProjs){
    this.showProjs(this.bullets, enemyProjs)
    return this.bullets
  }


  aimProjs(projs) {
    
    this.currentVect = createVector(windowWidth / 2, windowHeight / 2)
    this.targetVect = createVector(mouseX, mouseY)// target
    this.start = createVector(pPos.x, pPos.y)
    projs.push(new projectile(this.currentVect, this.targetVect, 20, this.start))//adds new projectile to the  array
    projs[this.bullets.length-1].aim() //gets vector to move the projectiles in of newly added projectile
  }


  showProjs(projs, enemyProjs) { //loops through the projectiles and shows there updated position and deletes them if they are off the screen.
  
    
   
    
      for (let i = 0; i < projs.length; i++) {


          
          this.loc = projs[i].fire()
        
         
           
           push();
         translate(this.loc.x, this.loc.y);
          //console.log(degrees(loc.heading()))
          rotate(projs[i].angle+radians(90));
          this.ammoImg.resize(10, 0)
          image(this.ammoImg, 0, 0, 10, 10)//.fire() returns updated position
          pop()
         
       

        

        if(dist(projs[i].desired.x, projs[i].desired.y,  projs[i].final.x,  projs[i].final.y) > 5000){
           projs.splice(i,1)
         }

        
        }

    for(let i = 0; i < enemyProjs.length; i++){
    if(typeof enemyProjs[i].bullets !== "undefined"){
      if(enemyProjs[i].id != this.id){
      
      
        for (let j = 0; j < enemyProjs[i].bullets.length; j++) {
          
           push()
  
       translate((enemyProjs[i].bullets[j].real.x-pPos.x+windowWidth/2), 
                 (enemyProjs[i].bullets[j].real.y-pPos.y+windowHeight/2));
           rotate(enemyProjs[i].bullets[j].angle+radians(90));
           this.ammoImg.resize(10, 0)
           image(this.ammoImg, 0, 0, 10, 10)//.fire() returns updated position
           pop()
         
          
        //console.log(degrees(loc.heading()))
        
      }
  }
      



 





    }
      

    }
  }









}