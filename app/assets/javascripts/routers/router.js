PinterestClone.Routers.Router = Backbone.Router.extend({
  initialize: function(boards, $rootEl) {
    this.boards = boards;
    this.$rootEl = $rootEl;
  },

  routes: {
    "": "home",
    "users/:id": "showUser",
    "boards/:id": "showBoard"
  },
  
  home: function() {
    var view = new PinterestClone.Views.Home({ collection: this.boards });
    this._swapView(view);
  },
  
  showUser: function(id) {
    var user = new PinterestClone.Models.User({ id: id });
    var view = new PinterestClone.Views.UserShow({ 
      model: user, 
      collection: this.boards
    });
    this._swapView(view);
  },
  
  newBoard: function() {
    
  },
  
  showBoard: function(id) {
    var board = this.boards.get(id);
    var view = new PinterestClone.Views.BoardShow({ model: board });
    this._swapView(view);
  },
  
  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});