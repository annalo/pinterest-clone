PinterestClone.Views.PinForm = Backbone.View.extend({
  template0: JST["pins/form"],
  template1: JST["pins/edit_upload"],
  template2: JST["pins/edit_web"],
  
  initialize: function(options) {
    this.type = options.type;
    this.boards = new PinterestClone.Collections.Boards();
    if(this.type === "new") {
      this.template = this['template0'];
    } else {
      var url = this.model.get("url")
      if(url === null || url === "") {
        this.template = this['template1'];
      } else {
        this.template = this['template2'];
      }
    }
  },
  
  events: { 
    "submit form": "submit",
    "click #cancel": "closeModal",
    "click #delete-pin": "delete",
    "click #close": "delete"
  },
    
  render: function() {
    var that = this
    this.boards.fetch({
      success: function() {
        var renderedContent = that.template({
          pin: that.model,
          boards: that.boards,
        });
        that.$el.html(renderedContent);
      }
    });
    return this;
  },
  
  closeModal: function() {
    $("#modal").modal("hide");
  },
  
  submit: function(event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON();
    debugger;

    this.model.set(attrs);
    this.model.save({}, {      
      success: function(model) {
        $("#modal").modal("hide");
        $(".modal-backdrop").remove();
        Backbone.history.navigate("#/pins/" + model.id, { trigger: true });
      }
    });
  },
  
  delete: function() {
    this.model.destroy({
      success: function(model) {
        console.log("model was deleted")        
        $("#modal").modal("hide");
        $(".modal-backdrop").remove();
        window.history.back();
      }
    });
  }
});