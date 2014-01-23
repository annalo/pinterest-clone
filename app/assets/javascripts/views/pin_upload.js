PinterestClone.Views.PinUpload = Backbone.View.extend({  
  initialize: function() {
  },
  
  events: {
    "submit form#upload-pin-form": "submit",
    "change input[type=file]": "encodeFile"
  },
  
  template: JST["pins/upload"],
  
  render: function() {
    var renderedContent = this.template({});
    this.$el.html(renderedContent);
    return this;
  },
  
  encodeFile: function(event) {
    var that = this;
    var file = event.currentTarget.files[0];
    
    console.log(file);
    
    var reader = new FileReader();
    reader.onload = function(event) {
      console.log(event.target.result);
      that.model.set({ img: event.target.result });      
    }
    reader.onerror = function(stuff) {
      console.log("error", stuff);
      console.log(stuff.getMessage());
    }
    reader.readAsDataURL(file);
  },
  
  submit: function(event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON();
    
    this.model.set();

    var view = new PinterestClone.Views.PinForm({ 
      model: this.model,
      type: "new"
    });

    $("#modal-body").empty();
    $("#modal-body").append(view.render().$el);
    $("#modal").modal("show");
  }
});