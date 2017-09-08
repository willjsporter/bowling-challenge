describe("Game", function() {
  var game;

  beforeEach(function() {
    game = new Game();
  });

  describe("#framelist keeps track of frames", function() {

    it("should be able to store the score from each go in an array", function() {
      game.bowl(1);
      game.bowl(8);
      game.bowl(9);
      game.bowl(0);
      expect(game.framelist).toEqual([[1,8],[9,0]]);
    });

    it("should detect a strike and skip to the next go", function() {
      game.bowl(1);
      game.bowl(8);
      game.bowl(10);
      game.bowl(1);
      expect(game.framelist).toEqual([[1,8],[10,null],[1,null]]);
    });
  });

  describe("#scorecard updates at the right times", function() {

    it("#updates each roll when there are no strikes or spares", function() {
      game.bowl(1);
      expect(typeof(game.scorecard[0])).toEqual('undefined')
      game.bowl(8);
      expect(game.scorecard[0]).toEqual(9)
      game.bowl(9);
      game.bowl(0);
      expect(game.scorecard[1]).toEqual(18);
    });

    it("#updates after one more roll when there is a spare", function() {
      game.bowl(1);
      game.bowl(9);
      expect(typeof(game.scorecard[0])).toEqual('undefined')
    });

    it("#updates after two more rolls when there is a strike", function() {
      game.bowl(10);
      game.bowl(10);
      game.bowl(2);
      game.bowl(3);
      expect(game.scorecard[0]).toEqual(22);
      expect(game.scorecard[1]).toEqual(37);
      expect(game.scorecard[2]).toEqual(42);
      expect(typeof(game.scorecard[3])).toBe('undefined');
    });
  });

  describe("should prevent the player from bowling at the end of the tenth frame", function() {

    beforeEach(function() {
      for(i=0;i<18; i++){game.bowl(4)}
    });

    it("after 2 rolls if a strike or spare has not been acheived", function() {
      game.bowl(1);
      game.bowl(8);
      expect(function() {game.bowl(0)}).toThrowError("Game is over, no more bowling!");
    });

    it("after 3 rolls if a strike or spare has been acheived", function() {
      game.bowl(10);
      game.bowl(8);
      // expect(try {game.bowl(1)}; catch(err) {return err}).toBe(null);
      game.bowl(1);
      expect(function(){game.bowl(0)}).toThrowError("Game is over, no more bowling!");
    });
  });

  describe("the framelist is updated after strikes", function() {

    beforeEach(function() {
      for(i=0;i<3; i++){game.bowl(10)}
    });

    it("registers the next scores in the framelist following a series of strikes", function() {
      game.bowl(2);
      game.bowl(8);
      game.bowl(6);
      game.bowl(3);
      expect(game.framelist.length).toEqual(5);
      expect(game.framelist).toEqual([[10,null],[10,null],[10,null],[2,8],[6,3]]);
      expect(game.scorecard).toEqual([30,52,72,88,97]);
    });
  });
  describe("the framelist is updated after spares", function() {

    beforeEach(function() {
      for(i=0;i<2; i++){game.bowl(6);game.bowl(4)}
    });

    it("registers the next scores in the framelist following a series of strikes", function() {
      console.log(game.framelist); console.log(game.scorecard);
      game.bowl(10);
      console.log(game.framelist); console.log(game.scorecard);
      game.bowl(8);
      console.log(game.framelist); console.log(game.scorecard);
      game.bowl(2);
      console.log(game.framelist); console.log(game.scorecard);
      game.bowl(2);
      console.log(game.framelist); console.log(game.scorecard);
      game.bowl(3);
      console.log(game.framelist); console.log(game.scorecard);
      expect(game.framelist.length).toEqual(5);
      expect(game.framelist).toEqual([[6,4],[6,4],[10,null],[8,2],[2,3]]);
      expect(game.scorecard).toEqual([16,36,56,68,73]);
    });
  });

});
