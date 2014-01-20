PinterestClone.Views.PinWeb = Backbone.View.extend({
  initialize: function(options) {
    this.type = options.type;
  },
  
  events: {
    "click #next": "extractImgs"
  },
  
  template: JST["pins/web"],
  
  render: function() {
    var renderedContent = this.template({});
    this.$el.html(renderedContent);
    return this;
  }
});