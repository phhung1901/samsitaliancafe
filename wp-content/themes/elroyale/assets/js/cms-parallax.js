(function($) { "use strict"; 
    jQuery(document).ready(function ($) {
        (function($, window, document, undefined) {
          var defaults = {
            viewportSelector: null,

            //Effect could be parallax or scrollReveal
            effectType: 'parallax',

            //Parallax options
            parallaxMaxOffset: 100,

            //Scroll Reveal options

            //Added when item is fully visible, removed when it's fully out of viewport
            scrollRevealedClass: 'js-reveal',

            //Added the first time the item is revealed, it's not remove when the item is hidden
            scrollFirstRevealClass: 'js-revealed',
            autoEnable: true,

            //
            debug: false
          };

          function ScrollEffects(element, options) {

            this.settings = $.extend({}, defaults, options);

            this.$window = $(window);
            this.$viewport = this.settings.viewportSelector ? $(this.settings.viewportSelector) : this.$window;

            this.$elements = $(element);

            this.scrollables = [];

            this.isEnabled = false;

            this.wpWidth = this.$viewport.width();
            this.wpHeight = this.$viewport.height();
            this.scrollTop = 0;

            this.init();
          }

          ScrollEffects.TYPE = {
            PARALLAX: 'parallax',
            SCROLLREVEAL: 'scrollReveal'
          };

          ScrollEffects.prototype = {
            init: function() {
              this.createScrollables();
              if (this.settings.autoEnable) {
                this.enable();
              }
            },

            createScrollables: function() {

              if (this.settings.debug) {
                this.$debug = $('<div />').css({
                  'z-index': 1000,
                  'position': 'fixed',
                  'top': '10px',
                  'left': '20px',
                  'color': 'white',
                  'background-color': 'rgba(0,0,0,.3)',
                  'padding': '10px 5px',
                  'border-radius': '3px'
                }).text('debug').appendTo($('body'));
              }

              for (var i = 0, j = this.$elements.length; i < j; i++) {

                var $element = this.$elements.eq(i),
                  scrollable = {
                    $element: $element
                  };

                //Parallax
                if (this.settings.effectType == ScrollEffects.TYPE.PARALLAX) {
                  scrollable.maxOffset = $.isNumeric($element.data('parallax')) ? parseInt($element.data('parallax')) : this.settings.parallaxMaxOffset;
                }

                //ScrollReveal
                if (this.settings.effectType == ScrollEffects.TYPE.SCROLLREVEAL) {
                  scrollable.isFirstReveal = true;
                  scrollable.isRevealed = false;
                }

                //ScrollReveal items
                this.scrollables.push(scrollable);
              }
            },

            addEvents: function() {

              this.resetScrollables();
              this.$window.on('resize', $.proxy(this.onResize, this));
              this.$window.on('scroll', $.proxy(this.onScroll, this));

              this.$window.trigger('resize').trigger('scroll');
            },

            resetScrollables: function() {
              if (this.settings.effectType == ScrollEffects.TYPE.PARALLAX) {}

              if (this.settings.effectType == ScrollEffects.TYPE.SCROLLREVEAL) {
                for (var i = 0, j = this.scrollables.length; i < j; i++) {
                  var scrollable = this.scrollables[i];
                  scrollable.$element.removeClass(this.settings.scrollRevealedClass);
                  scrollable.$element.removeClass(this.settings.scrollFirstRevealClass);
                  scrollable.isFirstReveal = true;
                  scrollable.isRevealed = false;
                }
              }
            },

            onScroll: function() {

              this.scrollTop = this.$window.scrollTop();

              for (var i = 0, j = this.scrollables.length; i < j; i++) {
                var scrollable = this.scrollables[i],
                  scrollData = this.getScrollData(scrollable.$element);

                if (this.settings.effectType == ScrollEffects.TYPE.PARALLAX) {
                  this.processParallaxItem(scrollable, scrollData);
                }
                if (this.settings.effectType == ScrollEffects.TYPE.SCROLLREVEAL) {
                  this.processScrollRevealItem(scrollable, scrollData);
                }

              }

            },

            processParallaxItem: function(_scrollable, _scrollData) {

              if (_scrollData.isVisible) {
                var offset = this.percentToRange(_scrollData.percentEntered, -_scrollable.maxOffset, _scrollable.maxOffset);
                _scrollable.$element.css({
                  'background-position': '50% ' + parseInt(offset) + 'px'
                });
              }
            },

            processScrollRevealItem: function(_scrollable, _scrollData) {
              if (!_scrollable.isRevealed && _scrollData.isFullyEntered) {
                _scrollable.$element.addClass(this.settings.scrollRevealedClass);
                if (_scrollable.isFirstReveal) {
                  _scrollable.isFirstReveal = false;
                  _scrollable.$element.addClass(this.settings.scrollFirstRevealClass);
                }
                _scrollable.isRevealed = true;
              }

              if (_scrollable.isRevealed && _scrollData.isFullyExited) {
                _scrollable.isRevealed = false;
                _scrollable.$element.removeClass(this.settings.scrollRevealedClass);
              }
            },

            onResize: function() {
              this.wpWidth = this.$viewport.width();
              this.wpHeight = this.$viewport.height();
            },

            //--------------------------------------------------------------
            //  Return percent from 0 to 1
            //  0.01 when element is almost at the top
            //  0.99 when just entered from bottom
            //--------------------------------------------------------------

            getScrollData: function(_$element) {

              var viewPortData = {
                isVisible: false,
                isFullyEntered: false,
                isFullyExited: true,
                percentEntered: 0
              };

              var elementHeight = _$element.outerHeight(),
                boundRect = _$element.get(0).getBoundingClientRect(),
                elementTop = boundRect.top,
                elementBottom = boundRect.bottom;
              if (elementTop >= -elementHeight && elementBottom <= (this.wpHeight + elementHeight)) {
                viewPortData.isVisible = true;
                viewPortData.isFullyEntered = elementTop >= 0 && elementBottom <= this.wpHeight;
                viewPortData.percentEntered = this.rangeToPercent(elementTop, -elementHeight, this.wpHeight);
                viewPortData.isFullyExited = viewPortData.percentEntered == 0;
              }

              return viewPortData;
            },

            enable: function() {

              if (!this.isEnabled) {
                this.isEnabled = true;
                this.resetScrollables();
                this.addEvents();
              }
            },

            disable: function(_normalize) {

              if (this.isEnabled) {
                this.isEnabled = false;

                this.$window.off('scroll', $.proxy(this.onScroll, this));
                this.$window.off('resize', $.proxy(this.onResize, this));

                if (_normalize) {
                  if (this.settings.effectType == ScrollEffects.TYPE.PARALLAX) {
                    this.$elements.css({
                      'background-position': '50% 50%'
                    });
                  } else if (this.settings.effectType == ScrollEffects.TYPE.SCROLLREVEAL) {
                    for (var i = 0, j = this.scrollables.length; i < j; i++) {
                      var scrollable = this.scrollables[i];
                      scrollable.$element.addClass(this.settings.scrollRevealedClass);
                      scrollable.$element.addClass(this.settings.scrollFirstRevealClass);
                    }
                  }
                }
              }
            },

            //--------------------------------------------------------------
            //  UTILS
            //--------------------------------------------------------------
            rangeToPercent: function(_number, _min, _max) {
              return ((_number - _min) / (_max - _min));
            },

            percentToRange: function(_percent, _min, _max) {
              return ((_max - _min) * _percent + _min);
            }

          };

          window.ScrollEffects = ScrollEffects;

        })(jQuery, window, document);

        //

        $(function() {

          var parallax = new ScrollEffects('.parallax', {
            effectType: 'parallax'
          });

          var scrollShow = new ScrollEffects('.scrollreveal', {
            effectType: 'scrollReveal'
          });

          var $window = $(window);
          $window.on('resize', function() {

            if ($window.width() >= 900) {
              parallax.enable();
              scrollShow.enable();
            } else {
              parallax.disable(true);
              scrollShow.disable(true);
            }
          }).trigger('resize');

        });
    });
})(jQuery);
