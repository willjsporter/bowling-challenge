function Game() {
  this.score = 0;
  this.scorecard = []; //1d - should only update when score confirmed
  this.framelist=[]; //2d - updates every throw
  this.allowedToRoll = true
  this.last3 = [null,null,null];
};

Game.prototype.bowl = function(value){

//breaks if the game is over
  if(!this.allowedToRoll){throw new Error("Game is over, no more bowling!")}


//sets some variables to shorten written code
  var frameNo = this.framelist.length
  if(frameNo!==0){
    var notStrike = (this.framelist.last()[0]!==10);
    var secondGo = (this.framelist.last()[1]==null);
  }

//updates the last three rolls
this.last3=[this.last3[1],this.last3[2],value]

//sorts out scoring for previous strikes and spares with the first condition catching issues early in the game
if(this.last3[0]===null){}
else if(this.last3[0] === 10) {
  this.scorecard.push(this.scorecard.last()+10+value+this.last3[1]
)}
else if(this.last3[0]+this.last3[1]===10&&this.framelist.last().last()!==null) {
  this.scorecard.push(this.scorecard.last()+10+value
)};
//condition in second else if prevents accidentally recording a spare
//if the previous two goes add to 10 but are from different frames


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
  // if(this.scorecard.length===10){this.scorecard[10]+=value;}
  // else if(this.framelist.last()[1]!==null){this.scorecard[this.scorecard.length-1] += value;}
  // else if(this.framelist.last()[1]===null){this.scorecard.push(this.scorecard.last()+value);}

  //scorecard should be updated at end of frame if no spare or strike, otherwise, wait until score is confirmed
  // if(this.framelist.length>0){
  if(this.framelist.last().last()===null){}
  else if(this.framelist.last()[0]+this.framelist.last()[1]<10){
    if(this.scorecard.length===0){this.scorecard.push(value+this.framelist[0][0]);}
    else{this.scorecard.push(value+this.framelist.last()[0]+this.scorecard.last());}
  }

};

if (!Array.prototype.last){
  Array.prototype.last = function(){
    if(this.length==0){return null}
    else{return this[this.length -1];}
  };

};
module.exports = Game
// {
//   Game: Game,
//   bowl:
// }
