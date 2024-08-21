class perlinGen{
  constructor(){
    this.mapObj = {
      n1: [],
      col: [],
      size: [],
    }
    this.size = 4000
    this.chunk = 25


    
  }

  drawMap(x,y){
    noStroke()

    var blockSize = 50
    

    x = Math.ceil(x / this.chunk) * this.chunk;
    y = Math.ceil(y / this.chunk) * this.chunk;
    let mapX = x/this.chunk
    let mapY = y/this.chunk
    
    //if (mapX <= blockSize){
    //  mapX = blockSize
   // }
    //if (mapY <= blockSize){
    //  mapY = blockSize
    //}
    //if (mapX >= (this.size/this.chunk) + blockSize){
    //  mapX = mapX-blockSize
    //}
    //if (mapY >= (this.size/this.chunk) - blockSize){
    //  mapY = mapY-blockSize
    //}
    //console.log(this.mapObj.n1)
    if(mapX-blockSize < 0){
      mapX = blockSize+1
    }
    if(mapY-blockSize < 0){
      mapY = blockSize+1
    }

    if(mapX+blockSize > this.size/this.chunk){
      mapX = mapX -  blockSize
    }
    if(mapY+blockSize > this.size/this.chunk){
      mapY = mapY -  blockSize
    }
      
      
    
    for(let i = mapX-blockSize; i < mapX+blockSize; i++){
        for(let j = mapY-blockSize; j < mapY+blockSize; j++){
          fill(this.mapObj.n1[i][j]*144, this.mapObj.n1[i][j]*238, this.mapObj.n1[i][j]*144)
          rect(i*this.chunk,j*this.chunk,this.chunk+10,this.chunk+10)
          //fill(0)



        }
      }
    
    
  //   else{
  //       for(let i = mapX-blockSize; i < mapX; i++){
  //       for(let j = mapY-blockSize; j < mapY; j++){
  //       fill(this.mapObj.n1[i][j]*144, this.mapObj.n1[i][j]*238, this.mapObj.n1[i][j]*144)
  //       rect(i*this.chunk,j*this.chunk,this.chunk+10,this.chunk+10)
  //           //fill(0)
  //         }
  //   }
  // }
   }


  genMap(){
    for(let i = 0; i < this.size/(this.chunk); i+=1){
      //this.mapObj.n1.push([])
      this.mapObj.n1.push([])
        for(let j = 0; j < this.size/(this.chunk); j+=1){
          let n = round(noise(i*0.01,j*0.01), 5)

          this.mapObj.n1[i].push(n)
          //console.log(i/3)

      }
    }

    this.mapObj.col = [144, 238, 144]
    this.mapObj.size = [9,9]
    console.log(this.mapObj)
    console.log("sadas|dfad")
    socket.emit('map', this.mapObj)
    return this.mapObj
  }

}


const round = (n, dp) => {
  const h = +('1'.padEnd(dp + 1, '0')) // 10 or 100 or 1000 or etc
  return Math.round(n * h) / h
}