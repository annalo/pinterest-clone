PinterestClone.Views.PinEdit = Backbone.View.extend({
  events: { 
    "click #cancel": "closeModal",
    "click #submit-pin": "submit",
    "click #delete-pin": "delete"
  },
  
  tagName: "form",
    
  template: JST["pins/edit"],
  
  render: function() {
    var renderedContent = this.template({ 
      pin: this.model,
      boards: this.collection
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  closeModal: function() {
    $("#modal").modal("hide");
  },
  
  submit: function(event) {
    var attrs = this.$el.serializeJSON();
    
    this.model.set(attrs);
    
    this.model.save({}, {
      success: function(model) {
        $("#modal").modal("hide");
        $(".modal-backdrop").remove();
        Backbone.history.navigate("#/users/" + model.get("user_id") + "/pins", { trigger: true });
      }
    });
  },
  
  delete: function() {
    this.model.destroy({
      success: function(model) {
        var user_id = model.get("user_id");
        
        $("#modal").modal("hide");
        $(".modal-backdrop").remove();
        Backbone.history.navigate("/users/" + user_id, { trigger: true });
      }
    });
  }
});