PinterestClone.Models.Pin = Backbone.Model.extend({
  urlRoot: "/api/pins",
  
  parse: function(pin) {
  	var board = pin.board;
    pin.board = new PinterestClone.Models.Board(board, { parse: true });

    if(this.collection && typeof(pin) === 'array') {
      this.collection.reset(pin);
    }
    
    return pin;
  }
});