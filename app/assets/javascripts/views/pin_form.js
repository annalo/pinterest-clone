PinterestClone.Views.PinForm = Backbone.View.extend({
  template0: JST["pins/form"],
  template1: JST["pins/edit_upload"],
  template2: JST["pins/edit_web"],
  
  initialize: function(options) {
    this.type = options.type;
    
    // determines which template to render
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

  tagName: "form",
  
  events: { 
    "click #cancel": "closeModal",
    "click #delete-pin": "delete",
    "click #create-board": "createBoard",
    "click #submit-pin-button": "submit"
  },
  
  render: function() {
    var renderedContent = this.template({ pin: this.model });
    this.$el.html(renderedContent);
    
    var listView = new PinterestClone.Views.BoardsList();
    this.$("#boards-list-wrapper").append(listView.render().$el);
    
    return this;
  },
  
  closeModal: function() {
    $("#modal").modal("hide");
  },
  
  submit: function(event) {
    var that = this;
    event.preventDefault();
    var attrs = this.$el.serializeJSON().pin;

    this.model.set(attrs);
    this.model.save({}, {      
      success: function(model) {
        $("#modal").modal("hide");
        $(".modal-backdrop").remove();
        
        // if new pin, redirect to user board show page
        if(that.type === "new") {
          var board = model.get("board");
          Backbone.history.navigate(
            "#/users/" + board.get("user_id") + "/boards/" + board.id, 
            { trigger: true });

        // if editing pin, close modal (back to original page)
        } else {
          $("#modal").modal("hide");
          $(".modal-backdrop").remove();
        }
      }
    });
  },
  
  delete: function() {
    this.model.destroy({
      success: function(model) {
        console.log("model was deleted")        
        $("#modal").modal("hide");
        $(".modal-backdrop").remove();
      }
    });
  }
});