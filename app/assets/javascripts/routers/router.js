PinterestClone.Routers.Router = Backbone.Router.extend({
  initialize: function($rootEl, pins) {
    this.pins = pins;
    this.$rootEl = $rootEl;
  },

  routes: {
    "": "home",
    "pins/new(/:type)": "newPin",
    "pins/:id(/:type)": "showPin",
    "boards/new": "newBoard",
    "users/:id(/:type)": "showUser",
    "users/:user_id/boards/:id(/:type)": "showBoard"
  },
  
  home: function() {
    var view = new PinterestClone.Views.PinsIndex({ collection: this.pins });
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
  
  newPin: function(type) {
    event.preventDefault();
    var newPin = new PinterestClone.Models.Pin();
    if(type === "web") {
      var view = new PinterestClone.Views.PinWeb({ 
        model: newPin,
        collection: this.pins
      });
    } else if(type === "upload") {
      var view = new PinterestClone.Views.PinUpload({ 
        model: newPin,
        collection: this.pins
      });
    }

    $("#modal-body").empty();
    $("#modal-body").append(view.render().$el);
    $("#modal").modal("toggle");
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