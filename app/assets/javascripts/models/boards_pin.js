PinterestClone.Models.BoardsPin = Backbone.Model.extend({
  urlRoot: "/api/boards_pins",

	parse: function(pin) {
		var board = pin.board;
		var user = pin.user;

		pin.board = new PinterestClone.Models.Board(board, { parse: true });
		pin.user = new PinterestClone.Models.User(user, { parse: true });

		return pin;
	},

  name: "boardsPin"
});