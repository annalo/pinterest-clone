PinterestClone.Routers.Router = Backbone.Router.extend({
  initialize: function(boards, $rootEl) {
    this.boards = boards;
    this.$rootEl = $rootEl;
  },
  routes: {
    "": "home"
  },
  
  home: function() {
    var view = new PinterestClone.Views.Home({ collection: this.boards });
    this._swapView(view);
  },
  
  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});