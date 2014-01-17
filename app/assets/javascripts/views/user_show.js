PinterestClone.Views.UserShow = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, "change", this.render);
    this.model.fetch();
  },
  
  template: JST["users/show"],
  
  render: function() {
    var renderedContent = this.template({
      user: this.model,
      boards: this.collection
    });
    this.$el.html(renderedContent);
    return this;
  }
});