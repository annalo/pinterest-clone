PinterestClone.Views.BoardForm = Backbone.View.extend({
  tagName: "form",
  
  template: JST["boards/form"],
  
  events: { "click button": "submit"}, 

  render: function() {
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    return this;
  },
  
  submit: function(event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    
    this.model.set(attrs);
    
    this.model.save({}, {
      success: function(model) {
        Backbone.history.navigate("/boards/" + model.id, { trigger: true });
      }
    });
  }
});