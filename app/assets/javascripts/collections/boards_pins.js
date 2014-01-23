PinterestClone.Collections.BoardsPins = Backbone.Collection.extend({
	model: PinterestClone.Models.BoardsPin,
  url: "/api/boards_pins",

  name: "boardsPins"
});