describe("Game", function() {
  var game;

  beforeEach(function() {
    game = new Game();
  });

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

  it("should update scorecard each roll when there are no strikes or spares", function() {
    game.bowl(1);
    expect(game.scorecard[0]).toEqual(1)
    game.bowl(8);
    expect(game.scorecard[0]).toEqual(9)
    game.bowl(9);
    expect(game.scorecard[0]).toEqual(9)
    expect(game.scorecard[1]).toEqual(18);
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

});
