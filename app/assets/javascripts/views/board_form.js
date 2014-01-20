PinterestClone.Views.BoardForm = Backbone.View.extend({
  events: { 
    "click #cancel": "closeModal",
    "click #submit-board": "submit"
  },
  
  tagName: "form",
  
  template: JST["boards/form"],
  
  render: function() {
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    return this;
  },
  
  closeModal: function() {
    debugger;
    $("#board-edit-modal").modal("close");
    
  },
  
  submit: function(event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    
    this.model.set(attrs);
    
    this.model.save({}, {
      success: function(model) {
        $("board-edit-modal").modal("toggle");
        Backbone.history.navigate("#/users/" + model.get("user_id") + "/boards", { trigger: true });
      }
    });
  }
});