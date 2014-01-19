PinterestClone.Models.Board = Backbone.Model.extend({
  urlRoot: "/api/boards",
  
  parse: function(board) {
    var pins = board.pins;
    board.pins = new PinterestClone.Collections.Pins(pins, { parse: true });
    return board;
  }
});