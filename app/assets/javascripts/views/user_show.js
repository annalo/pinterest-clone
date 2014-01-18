PinterestClone.Views.UserShow = Backbone.View.extend({
  initialize: function(options) {
    this.listenTo(this.model, "change", this.render);
    this.model.fetch();
    this.type = options.type;
  },
  
  template: JST["users/show"],
  
  render: function() {
    var renderedContent = this.template({
      user: this.model,
      boards: this.collection
    });
    
    this.$el.html(renderedContent);
    if(this.type === "pins") {
      // render pins
      console.log("no pins!")
    } else {
      this.indexBoards();
    }
    return this;
  },
  
  indexBoards: function() {
    var view = new PinterestClone.Views.BoardsIndex({ collection: this.collection });
    this.$("#views").append(view.render().$el);
  }
});