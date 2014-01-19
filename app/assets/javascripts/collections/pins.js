PinterestClone.Collections.Pins = Backbone.Collection.extend({
  model: PinterestClone.Models.Pin,
  url: "/api/pins"
});