PinterestClone.Routers.Router = Backbone.Router.extend({
  initialize: function(boards, $rootEl) {
    this.boards = boards;
    this.$rootEl = $rootEl;
  },

  routes: {
    "": "home",
    "boards": "indexBoards",
    "boards/new": "newBoard",
    "users/:id(/:type)": "showUser",
    "users/:user_id/boards/:id": "showBoard"
  },
  
  home: function() {
    var view = new PinterestClone.Views.Home({ collection: this.boards });
    this._swapView(view);
  },
  
  showUser: function(id, type) {
    var user = new PinterestClone.Models.User({ id: id });
    var view = new PinterestClone.Views.UserShow({ 
      type: type,
      model: user, 
      collection: this.boards
    });
    this._swapView(view);
    // this.indexBoards();
  },
  
  // indexBoards: function() {
  //   var view = new PinterestClone.Views.BoardsIndex({ collection: this.boards });
  //   $("#views").append(view.render().$el);
  // },
  
  showBoard: function(id) {
    var board = this.boards.get(id);
    var view = new PinterestClone.Views.BoardShow({ model: board });
    this._swapView(view);
  },
    
  newBoard: function() {
    var newBoard = new PinterestClone.Models.Board();    
    var view = new PinterestClone.Views.BoardForm({ 
      model: newBoard,
      collection: this.boards
    });    
    this._swapView(view);
  },
  
  editBoard: function() {
    var board = this.boards.get(id);
    var view = new PinterestClone.Views.BoardForm({ model: board });
    this._swapView(view);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});