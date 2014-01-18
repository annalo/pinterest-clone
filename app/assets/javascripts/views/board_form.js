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
    
    function success(model) {
      var user_id = model.get("user_id")
      Backbone.history.navigate("/users/" + user_id, { trigger: true });
    }
    
    this.model.set(attrs);
    
    if(this.model.isNew()) {
      this.collection.create(this.model, {
        success: function(model) {
          debugger;
          success(model);
        }
      });
    } else {
      this.model.save({}, {
        success: success()
      });
    }
  }
});