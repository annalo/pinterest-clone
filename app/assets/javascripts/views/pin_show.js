PinterestClone.Views.PinShow = Backbone.View.extend({
  initialize: function(options) {
    this.type = options.type;
  },
  
  template: JST["pins/show"],
  
  render: function() {
    if(this.type === "edit") {
      this.edit();
    } else if(this.type === "delete") {
      this.delete();
    } else {
      var renderedContent = this.template({ pin: this.model });
      this.$el.html(renderedContent);
    }
    
    return this;
  },
  
  edit: function() {
    var view = new PinterestClone.Views.PinForm({ model: this.model });
    this.$el.html(view.render().$el);
  },
  
  delete: function() {
    alert("Are you sure?"); // change to prettier alert
    
    this.model.destroy({
      success: function(model) {
        var user_id = model.get("user_id")
        Backbone.history.navigate("/users/" + user_id, { trigger: true });
      }
    });
  }
});