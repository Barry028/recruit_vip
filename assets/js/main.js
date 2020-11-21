        ;
        (function($) {

          $.Main = {

            init: function() {

              $(document).ready(function(e) {

                // Extends jQuery
                $.Main.helpers.extendjQuery();
                // Botostrap Tootltips
                $('[data-toggle="tooltip"]').tooltip();
                // Botostrap Popover
                $('[data-toggle="popover"]').popover();

                // Set Background Image Dynamically
                if ($('[data-bg-img-src]').length) $.Main.helpers.bgImage($('[data-bg-img-src]'));

                // Detect Internet Explorer (IE)
                $.Main.helpers.detectIE();

                $.BackToGo.init('.js-go-to');

                function testAnim(x) {
                  $('#animationSandbox').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $(this).removeClass();
                  });
                };

                $('.js--triggerAnimation').click(function(e) {
                  e.preventDefault();
                  var anim = $('.js--animations').val();
                  testAnim(anim);
                });

                $('.js--animations').change(function() {
                  var anim = $(this).val();
                  testAnim(anim);
                });

              });

              $(window).on('load', function(e) {



              });

            },

            components: {

            },

            helpers: {

              Math: {

              },
              /**
               * Sets background-image dynamically.
               *
               * @param jQuery collection
               *
               * @return jQuery|undefined
               */
              bgImage: function(collection) {

                if (!collection || !collection.length) return;

                return collection.each(function(i, el) {

                  var $el = $(el),
                    bgImageSrc = $el.data('bg-img-src');

                  if (bgImageSrc) $el.css('background-image', 'url(' + bgImageSrc + ')');

                });

              },

              /**
               * Extends basic jQuery functionality
               *
               * @return undefined
               */
              extendjQuery: function() {

                $.fn.extend({

                  /**
                   * Runs specified function after loading of all images.
                   *
                   * @return Deferred
                   */
                  imagesLoaded: function() {

                    var $imgs = this.find('img[src!=""]');

                    if (!$imgs.length) {
                      return $.Deferred().resolve().promise();
                    }

                    var dfds = [];

                    $imgs.each(function() {
                      var dfd = $.Deferred();
                      dfds.push(dfd);
                      var img = new Image();
                      img.onload = function() {
                        dfd.resolve();
                      };
                      img.onerror = function() {
                        dfd.resolve();
                      };
                      img.src = this.src;
                    });

                    return $.when.apply($, dfds);

                  }

                });

              },


              /**
               * Detect Internet Explorer (IE)
               *
               * @return version of IE or false, if browser is not Internet Explorer
               */

              detectIE: function() {

                var ua = window.navigator.userAgent;

                var msie = ua.indexOf('MSIE ');
                if (msie > 0) {
                  // IE 10 or older => return version number
                  var ieV = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
                  document.querySelector('body').className += 'ie ie' + ieV + ' ';
                }

                var trident = ua.indexOf('Trident/');
                if (trident > 0) {
                  // IE 11 => return version number
                  var rv = ua.indexOf('rv:');
                  var ieV = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
                  document.querySelector('body').className += 'ie ie' + ieV + ' ';
                }

                var edge = ua.indexOf('Edge/');
                if (edge > 0) {
                  // IE 12 (aka Edge) => return version number
                  var ieV = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
                  document.querySelector('body').className += 'ie ie' + ieV + ' ';
                }

                // other browser
                return false;

              },

            },

            settings: {
              rtl: false
            }

          };

          $.Main.init();

        })(jQuery);