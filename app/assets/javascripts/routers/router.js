PinterestClone.Routers.Router = Backbone.Router.extend({
  initialize: function($rootEl, pins) {
    this.pins = pins;
    this.$rootEl = $rootEl;
  },
  
  events: {
    "click .new-pin": "newPin",
    "click .new-board": "newBoard"
  },

  routes: {
    "": "home",
    "pins/:id(/:type)": "showPin",
    "boards/new": "newBoard",
    "users/:id(/:type)": "showUser",
    "users/:user_id/boards/:id(/:type)": "showBoard"
  },
  
  home: function() {
    var view = new PinterestClone.Views.Home({ collection: this.pins });
    this._swapView(view);
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
  
  newPin: function() {
    debugger;
    var newBoard = new PinterestClone.Models.Board();    
    var view = new PinterestClone.Views.BoardForm({ model: newBoard });    
    this._swapView(view);
  },
    
  newBoard: function() {
    event.preventDefault();
    var newBoard = new PinterestClone.Models.Board();    
    var view = new PinterestClone.Views.BoardForm({ model: newBoard });
    
    $("#modal-body").empty();
    $("#modal-body").append(view.render().$el);
    $("#modal").modal("toggle");
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});