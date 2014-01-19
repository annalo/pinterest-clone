PinterestClone.Routers.Router = Backbone.Router.extend({
  initialize: function(users, $rootEl) {
    this.users = users;
    this.$rootEl = $rootEl;
  },

  routes: {
    "": "home",
    "boards/new": "newBoard",
    "users/:id(/:type)": "showUser",
    "users/:user_id/boards/:id(/:type)": "showBoard",
    "users/:user_id/boards/:id/edit": "editBoard"
  },
  
  home: function() {
    // change to pins: this.model.get("pins")?
    var view = new PinterestClone.Views.Home({ collection: this.boards });
    this._swapView(view);
  },
  
  showUser: function(id, type) {
    var user = this.users.get(id);
    var boards = user.get("boards");
    var view = new PinterestClone.Views.UserShow({ 
      model: user, 
      collection: boards,
      type: type
    });
    this._swapView(view);
  },
  
  showBoard: function(user_id, id, type) {
    var user = this.users.get(user_id);
    var board = user.get("boards").get(id);
    var view = new PinterestClone.Views.BoardShow({ 
      model: board,
      type: type
    });
    this._swapView(view);
  },
    
  newBoard: function() {
    var newBoard = new PinterestClone.Models.Board();    
    var view = new PinterestClone.Views.BoardForm({ model: newBoard });    
    this._swapView(view);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});