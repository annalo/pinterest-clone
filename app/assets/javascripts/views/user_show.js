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
    if(this.type === "boards") {
      this.indexBoards();
    } else if(this.type === "pins") {
      this.indexPins();
    } else if(this.type === "settings") {
      this.editUser();
    }
    return this;
  },
  
  indexBoards: function() {
    var view = new PinterestClone.Views.BoardsIndex({ 
      model: this.model,
      collection: this.boards 
    });
    this.$("#views").append(view.render().$el);
  },
  
  indexPins: function() {
    var view = new PinterestClone.Views.PinsIndex({ 
      model: this.model,
      collection: this.pins 
    });
    this.$("#views").append(view.render().$el);
  },

  editUser: function() {
    var view = new PinterestClone.Views.UserEdit({ 
      model: this.model,
    });
    this.$("#views").append(view.render().$el);
  }
});