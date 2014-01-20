PinterestClone.Views.UserShow = Backbone.View.extend({
  initialize: function(options) {
    this.type = options.type;
    this.boards = this.model.get("boards");
    this.pins = this.model.get("pins");
  },
  
  template: JST["users/show"],
  
  render: function() {
    var renderedContent = this.template({
      user: this.model,
    });
    
    this.$el.html(renderedContent);
    if(this.type === "pins") {
      this.indexPins();
    } else {
      this.indexBoards();
    }
    return this;
  },
  
  indexBoards: function() {
    var view = new PinterestClone.Views.BoardsIndex({ collection: this.boards });
    this.$("#views").append(view.render().$el);
  },
  
  indexPins: function() {
    var view = new PinterestClone.Views.PinsIndex({ 
      model: this.model,
      collection: this.pins 
    });
    this.$("#views").append(view.render().$el);
  }
});