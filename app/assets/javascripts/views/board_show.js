PinterestClone.Views.BoardShow = Backbone.View.extend({
  initialize: function(options) {
    this.listenTo(this.model, "change", this.render);
    this.type = options.type;
  },
  
  template: JST["boards/show"],
    
  render: function() {
    var that = this;
    if(this.type === "edit") {
      this.edit();
    } else if(this.type === "delete") {
      this.delete();
    } else {
      var renderedContent = this.template({ board: this.model });
      this.$el.html(renderedContent);
    }
    this.pinsIndex();
    
    return this;
  },
  
  pinsIndex: function() {
    var user = this.model.get("user");
    var pins = this.model.get("pins");
    
    var pinsView = new PinterestClone.Views.PinsIndex({ 
      model: user,
      collection: pins
    });
    this.$("#pins-wrapper").append(pinsView.render().$el);
  },
  
  edit: function(event) {
    event.preventDefault();
    var board_id = $(event.target).attr("data-id");
    var board = this.collection.get(board_id);
    var view = new PinterestClone.Views.BoardForm({ model: board });
    
    $(".modal-content").empty();
    $(".modal-content").append(view.render().$el);
    $("#modal").modal("toggle");
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