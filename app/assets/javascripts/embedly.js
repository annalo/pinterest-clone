var MONTHS = [
   'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]
 
// Turn a published and offset into the correct date format.
function localize(published, offset){
  if (!published){
    return null;
  }
  if (!offset){
    offset = 0;
  }
 
  var local = new Date();
  // Convert minutes to milliseconds here.
  var localOffset = local.getTimezoneOffset() * (60 * 1000);
 
  var date = new Date(published+offset+localOffset);
 
  return sprintf('%s %s, %s',
    MONTHS[date.getMonth()], date.getDate(), date.getFullYear());
}
 
$('.submit-pin-url .button').on('click', function(){
  // Get the URL and disable the input.
  var url = $('.submit-pin-url').prop('disabled', true).val();
 
  // Loading.
  $this = $(this);
  $this.html('<i class="fa fa-spin fa fa-spinner"></i>');
 
  $.embedly.extract(url)
    .progress(function(obj){
      // Reset the loading.
      $this.html('Try It');
      $('.submit-pin-url input').prop('disabled', false);
      // If the obj does not have an article, kill in with an aleart.
      if (! obj.content){
        $('.article-result').html(['<div class="alert-box alert">',
          '<p>No Article Found for this URL</p></div>'].join(''));
        return true;
      }
 
      // Limit the number of keywords, authors and entities
      obj.entities = obj.entities.slice(0,5)
      obj.keywords = obj.keywords.slice(0,5)
      obj.authors = obj.authors.slice(0,5)
 
      // Deal with the date math
      obj.date = localize(obj.published, obj.offset);
 
      // Use handlebars to create the HTML.
      var template = Handlebars.compile($('#article-template').html());
      var html = template(obj);
      $('.article-result').html(html);
 
      // Figure out what to do with some of the inline images.
      var parentWidth = $('.article-result').width();
      $('.article-result img').each(function(){
        if ($(this).width()/parentWidth < .6){
          $(this).addClass('inline')
        }
      });
    });
    debugger;
});


// 
// ;(function ( $, window, document, undefined ) {
//  
//   // Quick Library for dealing with Embedly Image Proxy
//  
//   var defaults = {
//     key:  null
//   };
//  
//   var EmbedlyImage = function (url, options) {
//     this.init(url, options);
//   };
//  
//   EmbedlyImage.prototype = {
//  
//     init: function(url, options){
//       this.url = url;
//  
//       if (! options.secure ){
//         options.secure = window.location.protocol === 'https'? true : false;
//       }
//  
//       this.options = $.extend( {}, defaults, options );
//     },
//     src: function(method, query){
//       var src = this.options.secure? 'https': 'http';
//  
//       src += '://i.embed.ly/1/image';
//       if (method){
//         src += '/'+method;
//       }
//  
//       // What the query string is going to look like.
//       var data = $.extend( {}, {url: this.url, key: this.options.key}, query);
//       return src + '?' + $.param(data);
//     },
//     elem: function(method, query){
//       return $('<img src="'+this.src(method, query)+'" />');
//     },
//     proxy: function(){
//       return this.elem();
//     },
//     resize: function(width, height, grow){
//       var query = {
//         width: width,
//         height: height
//       };
//       if (grow){
//         query.grow = true;
//       }
//       return this.elem('resize', query);
//     },
//     crop: function(width, height){
//       var query = {
//         width: width,
//         height: height
//       };
//       return this.elem('crop', query);
//     },
//     fill: function(width, height, color){
//       var query = {
//         width: width,
//         height: height,
//         color:color
//       };
//       return this.elem('fill', query);
//     }
//   };
//  
//   $.image = function(url, options){
//     return new EmbedlyImage(url, options);
//   };
//  
//   var ImageResize = function (url) {
//     this.init(url);
//   };
//  
//   ImageResize.prototype = {
//     init: function(url){
//       this.url = url;
//       this.current = this.size();
//       this.resize();
//     },
//     size: function(){
//       var width = $(window).width();
//       if (width <= 767) {
//         return 'small';
//       } else if (width >= 1279){
//         return 'large';
//       }
//       return 'medium';
//     },
//     resize: function(){
//       var data = {
//         key: '92b31102528511e1a2ec4040d3dc5c07'
//       };
//       var $elem;
//       if (this.current === 'small'){
//         $elem = $.image(this.url, data).resize(400, 400);
//       } else if (this.current ==='medium'){
//         $elem = $.image(this.url, data).resize(600, 600);
//       } else {
//         $elem = $.image(this.url, data).resize(800, 800);
//       }
//       $('.image-mobile-results').html('').append($elem);
//     },
//     listen: function(){
//       // wait for something to change.
//       var self = this;
//       $(window).on('resize', function(){
//         if (self.size() !== self.current){
//           self.current = self.size();
//           self.resize.call(self);
//         }
//       });
//     }
//   };
//   
//   $(document).ready(function(){
//     var FLICKR_API_KEY = 'YOUR_FLICKR_KEY';
//  
//     var urls = [];
//     var src_urls = [];
//     var data = {
//         key: 'YOUR_EMBEDLY_KEY'
//       };
//  
//     //Make the call to the flickr API
//     $.ajax({
//       url : 'http://api.flickr.com/services/rest/',
//       dataType: 'jsonp',
//       cache: true,
//       jsonp: false,
//       jsonpCallback:'jsonFlickrApi',
//       data: {
//         method: 'flickr.interestingness.getList',
//         api_key: FLICKR_API_KEY,
//         format: 'json'
//       }
//     }).done(function(results){
//       $.each(results.photos.photo, function(i, photo){
//         urls.push('http://www.flickr.com/photos/'+photo.owner+'/'+photo.id+'/');
//       });
//  
//       urls = urls.slice(0,42);
//       var $lis = $('.image-try-results');
//       //Get the flickr image urls with oEmbed
//       $.embedly.oembed(urls, { batch:10})
//         .done(function(res){
//           $.each(res, function(i, obj){
//             if(obj.type == 'photo' && obj.url){
//                 var $li = $('<li><img src="'+obj.url+'"/></li>')
//                 $lis.append($li);
//                 src_urls.push(obj.url);
//             }
//           });
//  
//           return false;
//         });
//     });
//   }