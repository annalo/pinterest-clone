PinterestClone.Models.User = Backbone.Model.extend({
  urlRoot: "/users",

  parse: function(user) {
    var boards = user.boards;
    var pins = user.pins;

    user.boards = new PinterestClone.Collections.Boards(boards, { parse: true });
    user.pins = new PinterestClone.Collections.BoardsPins(pins, { parse: true });
    return user;
  }
});