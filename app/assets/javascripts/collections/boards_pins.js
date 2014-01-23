PinterestClone.Collections.BoardsPins = Backbone.Collection.extend({
	model: PinterestClone.Models.BoardsPin,
  url: "/api/boards_pins",
  
  comparator: function(model) {
  	return -model.get("updated_at");
  },

  name: "boardsPins"
});