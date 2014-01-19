PinterestClone.Views.Home = Backbone.View.extend({
  template: JST["home"],
  
  render: function() {
    var renderedContent = this.template({ pins: this.collection });
    this.$el.html(renderedContent);
    return this;
  }
})