class projectile {// basically them same as pathfind.js but i made it myself so its better and simpler and inputs do not change as its for bullets.

  constructor(startingVect, targetVect, inSpeed, realStart){
    this.startVect = startingVect
    this.targ = targetVect
    this.realStart = realStart
    this.desired = createVector(0,0)
    this.final = createVector(0,0)
    this.real = createVector(0,0)
    //this.projs = projs
    this.speed = inSpeed
    this.angle = Math.atan2(this.targ.y - this.startVect.y - 0, this.targ.x - this.startVect.x - 0);
  }
  aim(){
    this.desired = this.targ.sub(this.startVect)
    this.desired.setMag(this.speed)


  }
  fire(){
    
    this.final = this.startVect.add(this.desired) 
    this.real = this.realStart.add(this.desired)
    
    
    
    return this.final
}




}