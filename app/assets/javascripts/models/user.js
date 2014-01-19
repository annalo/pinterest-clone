PinterestClone.Models.User = Backbone.Model.extend({
  urlRoot: "/users",
  
  parse: function(user) {
    var boards = user.boards
    user.boards = new PinterestClone.Collections.Boards(boards, { parse: true });
    return user;
  }
});