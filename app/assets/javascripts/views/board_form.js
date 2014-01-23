PinterestClone.Views.BoardForm = Backbone.View.extend({
  events: { 
    "click #cancel": "closeModal",
    "submit form#board-form": "submit",
    "click #delete-board": "delete"
  },
    
  template: JST["boards/form"],
  
  render: function() {
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    return this;
  },
  
  closeModal: function() {
    var type = $(event.target).attr("data-id");
    
    $("#modal").modal("hide");
    
    if(type === "new") {
      window.history.back();
    }
  },
  
  submit: function(event) {
    event.preventDefault();
    var name = $("#board_name").val();

    var attrs = $("#board-form").serializeJSON().board;
    this.model.set(attrs);
    this.model.save({}, {
      success: function(model) {
        $("#modal").modal("hide");
        $(".modal-backdrop").remove();
        Backbone.history.navigate("#/users/" + model.get("user_id") + "/boards", { trigger: true });
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