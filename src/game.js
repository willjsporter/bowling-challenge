function Game() {
  this.score = 0;
  this.scorecard = []; //1d
  this.framelist=[]; //2d
  this.allowedToRoll = true
};

Game.prototype.bowl = function(value){
  if(!this.allowedToRoll){throw new Error("Game is over, no more bowling!")}

  var frameNo = this.framelist.length
  if(frameNo!==0){
    var notStrike = (this.framelist.last()[0]!==10);
    var secondGo = (this.framelist.last()[1]==null);
  }

  if(frameNo===0){
  this.framelist.push([value,null]);
  }
  else if(frameNo<10 && secondGo && notStrike) {
    this.framelist.last()[1] = value;
  }
  else if(frameNo<9) {
    this.framelist.push([value,null]);
  }
  else if(frameNo===9 && !secondGo){
    this.framelist.push([value, null, null]);
  }
  else if (frameNo===10 && secondGo){
    this.framelist.last()[1]=value
    if(this.framelist.last()[0]+this.framelist.last()[1]<10){
      this.allowedToRoll=false
    }
  }
  else if(frameNo===10 && this.framelist.last()[2]===null){
    this.framelist.last()[2] = value;
    this.allowedToRoll=false
  }
//either last one is [x,null] or [x,y] at this stage. Want to update if it's [x,y] and push new frame if it's [x,null]
  if(this.scorecard.length===10){this.scorecard[10]+=value;}
  else if(this.framelist.last()[1]!==null){this.scorecard[this.scorecard.length-1] += value;}
  else if(this.framelist.last()[1]===null){this.scorecard.push(this.scorecard.last()+value);}

};

if (!Array.prototype.last){
  Array.prototype.last = function(){
    if(this.length==0){return null}
    else{return this[this.length -1];}
  };

};
