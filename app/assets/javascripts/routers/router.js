PinterestClone.Routers.Router = Backbone.Router.extend({
  initialize: function($rootEl, pins, currentUser) {
    this.pins = pins;
    this.$rootEl = $rootEl;
  },

  routes: {
    "": "home",
    "boards": "indexBoards",
    "pins/:id(/:type)": "showPin",
    "users/:id(/:type)": "showUser",
    "users/:user_id/boards/:id(/:type)": "showBoard"
  },

  home: function() {
    var view = new PinterestClone.Views.PinsIndex({ collection: this.pins });
    this._swapView(view);
  },

  indexBoards: function() {
    var that = this;
    var boards = new PinterestClone.Collections.Boards();
    boards.fetch({
      success: function() {
        var view = new PinterestClone.Views.BoardsIndex({
          collection: boards,
          type: "all"
        });
        that._swapView(view);
      }
    })
  },

  showBoard: function(user_id, id, type) {
    var that = this;
    var board = new PinterestClone.Models.Board({ id: id });
    board.fetch({
      success: function() {
        var view = new PinterestClone.Views.BoardShow({
          model: board,
          type: type
        });
        that._swapView(view);
      }
    });
  },

  showPin: function(id, type) {
    var pin = this.pins.get(id);
    var view = new PinterestClone.Views.PinShow({
      model: pin,
      type: type
    });
    this._swapView(view);
  },

  showUser: function(id, type) {
    var that = this;
    var user = new PinterestClone.Models.User({ id: id });
    user.fetch({
      success: function() {
        var view = new PinterestClone.Views.UserShow({
          model: user,
          type: type
        });
        that._swapView(view);
      }
    });
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});