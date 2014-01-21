PinterestClone.Views.Home = Backbone.View.extend({
  events: {
    "click #pin-add-button": "add"
  },
  
  template: JST["home"],
  
  render: function() {
    var renderedContent = this.template({ pins: this.collection });
    this.$el.html(renderedContent);
    return this;
  },
  
  add: function(event) {
    event.preventDefault();
    var pin_id = $(event.currentTarget).val();
    var pin = this.collection.get(pin_id);
    
    var view = new PinterestClone.Views.BoardsPinForm({ model: pin });
    
    
    debugger;
  }
});