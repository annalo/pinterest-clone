PinterestClone.Views.PinShow = Backbone.View.extend({
  initialize: function(options) {
    this.type = options.type;
  },

  events: {
    "click a": "redirect",
    "click #edit-pin": "edit"
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

  redirect: function(event) {
    event.preventDefault();
    var url = $(event.currentTarget).data("url");

  },
  
  edit: function(event) {
    event.preventDefault();
    var view = new PinterestClone.Views.PinForm({ 
      model: this.model,
      type: "edit"
    });
    
    $(".modal-content").html(view.render().$el);
    $("#modal").modal("show");
  }
});