PinterestClone.Views.PinEdit = Backbone.View.extend({
  tagName: "form",
  
  template: JST["pins/edit"],
  
  render: function() {
    var renderedContent = this.template({ pin: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});