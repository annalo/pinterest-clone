PinterestClone.Models.Board = Backbone.Model.extend({
  urlRoot: "/api/boards",
  
  parse: function(board) {
  	var user = board.user;
    var pins = board.pins;

    board.user = new PinterestClone.Models.User(user, { parse: true });
    board.pins = new PinterestClone.Collections.Pins(pins, { parse: true });
    return board;
  }
});