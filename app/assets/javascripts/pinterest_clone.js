window.PinterestClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function() {
    console.log("Initializing!");
    var currentUser = JSON.parse($("#bootstrapped_current_user").html());
    var $rootEl = $("#content");
    
    if(currentUser) {

      var pins = new PinterestClone.Collections.BoardsPins();
      pins.fetch({
      success: function() {
        // render header
        var header = new PinterestClone.Views.Header({ 
          model: currentUser,
          collection: pins
        });
        $("#header").html(header.render().$el);

        // start router
        new PinterestClone.Routers.Router($rootEl, pins);
        Backbone.history.start();
      },
      
      error: function() { console.log("Fetch failed.") }
      });
    } else {
      
      console.log("No user signed in.")
    }
  }
};

$(document).ready(function(){
  PinterestClone.initialize();
});
