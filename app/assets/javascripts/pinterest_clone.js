window.PinterestClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log("Initializing!");
    var pins = new PinterestClone.Collections.Pins();
    var $rootEl = $("#content");
    
    pins.fetch({
      success: function() {
        new PinterestClone.Routers.Router($rootEl, pins);
        Backbone.history.start();
      },
      
      error: function() { console.log("No user logged in/fetch failed.") }
    });
  }
};

$(document).ready(function(){
  PinterestClone.initialize();
});
