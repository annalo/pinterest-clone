PinterestClone.Views.BoardShow = Backbone.View.extend({
  initialize: function(options) {
    this.listenTo(this.model, "change", this.render);
    this.model.fetch();
    this.user = options.user;
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
      var renderedContent = this.template({ 
        board: this.model,
        pins: this.collection
      });
      this.$el.html(renderedContent);
            
      var pinsView = new PinterestClone.Views.PinsIndex({ 
        model: that.user,
        collection: that.collection 
      });
      $("#pins-wrapper").append(pinsView.render().$el);
    }
    
    return this;
  },
  
  edit: function() {
    var view = new PinterestClone.Views.BoardForm({ model: this.model });
    $("#modal-body-board-edit").append(view.render().$el);
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