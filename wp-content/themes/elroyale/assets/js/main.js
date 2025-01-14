;(function ($) {

    "use strict";

    /* ===================
     Page reload
     ===================== */

    $(window).on('load', function () {
        $(".loader-site").fadeOut("slow");
        elroyale_col_offset();
        elroyale_header_sticky();
        elroyale_menu_mobile();
        elroyale_rtl();
        elroyale_scroll_to_top();
        elroyale_item_sameheight();
    });
    $(window).on('resize', function () {
        elroyale_col_offset();
        elroyale_header_sticky();
        elroyale_menu_mobile();
        elroyale_item_sameheight();
    });

    var scroll_top;
    var window_height;
    var scroll_status = '';
    var lastScrollTop = 0;
    $(window).on('scroll', function () {
        scroll_top = $(window).scrollTop();
        window_height = $(window).height();
        if (scroll_top < lastScrollTop) {
            scroll_status = 'up';
        } else {
            scroll_status = 'down';
        }
        lastScrollTop = scroll_top;
        elroyale_header_sticky();
        elroyale_scroll_to_top();
    });

    //add class for parent Primary Menu
    $('.sub-menu .current-menu-item').parents('.menu-item-has-children').addClass('current-menu-ancestor');
    // demo
    $("#gotodemo").click(function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#demo").offset().top
        }, 1000);
    });
    $(document).ready(function () {

        /* =================
         Menu Dropdown
         =================== */
        var $menu = $('.main-navigation');
        $menu.find('ul.sub-menu > li').each(function () {
            var $submenu = $(this).find('>ul');
            if ($submenu.length == 1) {
                $(this).hover(function () {
                    if ($submenu.offset().left + $submenu.width() > $(window).width()) {
                        $submenu.addClass('back');
                    } else if ($submenu.offset().left < 0) {
                        $submenu.addClass('back');
                    }
                }, function () {
                    $submenu.removeClass('back');
                });
            }
        });
        $('#pagetitle').parent().find('.header-layout1 .site-header-main').addClass('offset-down-on');
        /* =================
         Menu Mobile
         =================== */
        $("#main-menu-mobile .open-menu").on('click', function () {
            $(this).toggleClass('opened');
            $('#site-navigation').toggleClass('navigation-open');
            $('#site-navigation-left').toggleClass('navigation-open');
            $('#site-navigation-right').toggleClass('navigation-open');
            $('#site-navigation-left-right').toggleClass('navigation-open');
            
        })

        /* ===================
         Search Toggle
         ===================== */
        $('.h-btn-search').on('click',function (e) {
            e.preventDefault();
            $('.cms-search-popup').removeClass('remove').toggleClass('open').find('.search-field').focus();
        });

        $('.h-btn-nav').on('click',function (e) {
            e.preventDefault();
            $('.cms-side-nav-popup').removeClass('remove').toggleClass('open');
        });
        $('.h-btn-menu-popup').on('click',function (e) {
            e.preventDefault();
            $('.cms-menu-popup').removeClass('remove').toggleClass('open');
        });
        $('.btn-sign-up').on('click',function (e) {
            e.preventDefault();
            $('.cms-register-popup').removeClass('remove').toggleClass('open');
            $('.cms-login-popup').removeClass('open');
        });
        $('.btn-sign-in').on('click',function (e) {
            e.preventDefault();
            $('.cms-login-popup').removeClass('remove').toggleClass('open');
            $('.cms-register-popup').removeClass('open');
        });
        $('.cms-close').on('click',function (e) {
            e.preventDefault();
            $(this).parent().addClass('remove').removeClass('open');
            $(this).parents('.cms-modal').addClass('remove').removeClass('open');
        });
        $(document).on('click', function (e) {
            if (e.target.className == 'cms-modal cms-search-popup open')
                $('.cms-search-popup').removeClass('open').addClass('remove');
            if (e.target.className == 'cms-modal cms-login-popup open')
                $('.cms-login-popup').removeClass('open').addClass('remove');
            if (e.target.className == 'cms-modal cms-register-popup open')
                $('.cms-register-popup').removeClass('open').addClass('remove');
        });

        /* ===================
         Cart Toggle
         ===================== */
        $('#header-cart .cart-toggle').on('click',function (e) {
            e.preventDefault();
            $('#header-search .searchform').removeClass('active');
            $('#header-cart .cartform').toggleClass('active');
        });
        /* Cart Header */
        $('.icon-cart').on('click', function() {
            $('#headroom .widget_shopping_cart').toggleClass('open');
        })
        $('.open-cart').on('click', function() {
            $('#headroom .widget_shopping_cart').toggleClass('open');
        })

        /* ====================
         Scroll To Top
         ====================== */
        $('.scroll-top').on('click',function () {
            $('html, body').animate({scrollTop: 0}, 800);
            return false;
        });

        /* Video 16:9 */
        $('.entry-video iframe').each(function () {
            var v_width = $(this).width();

            v_width = v_width / (16 / 9);
            $(this).attr('height', v_width + 35);
        });
        /* Images Light Box - Gallery:True */
        $('.images-light-box').magnificPopup({
            delegate: 'a.light-box',
            type: 'image',
            gallery: {
                enabled: true
            },
            mainClass: 'mfp-fade',
        });
        /* Video Light Box */
        $('.cms-video-button, .btn-video').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,

            fixedContentPos: false
        });

        /* ===================
        Accordion Toggle
        ===================== */
        $('div.card-header').on('click', function (e) {
            e.preventDefault();
            var _this = $(this),
                _parent = _this.next();
                $(document).find('.card-header').removeClass('cms-active');
            if (_parent.css('display') === 'block') {
                _parent.slideToggle();
                _this.removeClass('cms-active');
            } else {
                $('.collapse').hide('fast');
                _parent.slideToggle();
                _this.addClass('cms-active');
            }
        });

        /* =================
         Onepage
         =================== */
        if (typeof(one_page_options) != "undefined") {
            one_page_options.speed = parseInt(one_page_options.speed);
            $('ul.menu').singlePageNav(one_page_options);
        }
        /* =================
         ACM Title
         =================== */
        $(".acm-title-line").each(function () {
            var w_t_acm = $(this).find('span').width() + 26;
            $(this).find('hr').css('left', w_t_acm + 'px');
        });
        /* =================
         Add Class
         =================== */
        $('.wpcf7-select').parent().addClass('wpcf7-menu');
        //Js for slect custom
        $('.wpcf7-menu select').each(function () {
            $(this).niceSelect();
        });

        $('.select-2 select').each(function () {
            $(this).niceSelect();
        });
        /* =================
         Row & VC Column Animation
         =================== */
        $('.vc_row.wpb_row.vc_row-fluid').each(function(){
            var vctime = 100;
            var vc_inner = $(this).children().length;
            var _vci = vc_inner - 1;
            $(this).find('> .wpb_animate_when_almost_visible').each(function (index,obj) {
                $(this).css('animation-delay', vctime + 'ms');
                if(_vci === index){
                    vctime = 100;
                    _vci = _vci + vc_inner;
                }else{
                    vctime = vctime + 100;
                }
            })
        });
        /* CMS Grid Animation */
        var time = 100;
        var _i = 2;
        $('.cms-grid').find('.grid-item-inner').each(function (index,obj) {
            $(this).css('animation-delay', time + 'ms');
            if(_i === index){
                time = 100;
                _i = _i + 3;
            }else{
                time = time + 100;
            }
        })

        $('.rm-padding-lg').parent().addClass('row-rm-padding-lg');
        $('.rm-padding-md').parent().addClass('row-rm-padding-md');
        $('.rm-padding-sm').parent().addClass('row-rm-padding-sm');
        $('.rm-padding-xs').parent().addClass('row-rm-padding-xs');
        /* =================
        WooCommerce
        =================== */
        $('.widget_product_search .search-field').find("input[type='text']").each(function (ev) {
            if (!$(this).val()) {
                $(this).attr("placeholder", "Search and Press Enter");
            }
        });
        $('.tnp-field-email').find(".tnp-email").each(function (ev) {
            if (!$(this).val()) {
                $(this).attr("placeholder", "Subscribe Our Newsletter: ");
            }
        });
        $('.cms-select form').append('<i class="fa fa-chevron-down"></i>');
        $('.variations select').parent().addClass('cms-select');
        $('.variations .cms-select').append('<i class="fa fa-chevron-down"></i>');

        var htmlWoo = $(".cms-shop-carousel .woocommerce ul.products").html();
        $(".cms-shop-carousel div.woocommerce").remove();
        $(".cms-shop-carousel").append(htmlWoo);


        /* =================
         Woocomerce
         =================== */
        $('.product-quantity').find('.quantity').append('<span class="quantity-icon quantity-icon-left"><i class="btn-minus zmdi zmdi-minus"></i></span><span class="quantity-icon quantity-icon-right"><i class="btn-plus zmdi zmdi-plus"></i></span>');
        $('.cart').find('.quantity').append('<span class="quantity-icon quantity-icon-left"><i class="btn-minus zmdi zmdi-minus"></i></span><span class="quantity-icon quantity-icon-right"><i class="btn-plus zmdi zmdi-plus"></i></span>');
        $(document).on('click', '.btn-plus', function () {
            $(this).parents('.quantity').find('input[type="number"]').get(0).stepUp();
            $('.woocommerce-cart-form .actions .button').removeAttr('disabled');
        });
        $(document).on('click', '.btn-minus', function () {
            $(this).parents('.quantity').find('input[type="number"]').get(0).stepDown();
            $('.woocommerce-cart-form .actions .button').removeAttr('disabled');
        });
        $('.woocommerce-cart-meta').on('click', function () {
            $(this).parent().find('.widget_shopping_cart').toggleClass('cart-open');
        });

        $(document).on('click','.btn-icon-sidebar-popup',function(e){
            e.preventDefault();
            $(document).find("#mySidenav").css('width','100%');
        });
        $(document).on('click','.closebtn',function(e){
            e.preventDefault();
            $(document).find("#mySidenav").css('width','0');
            $(document).find("#myNav").css('height','0');
        });

        $( document ).ajaxComplete(function() {
            $('#content .quantity').append('<span class="quantity-icon quantity-icon-left"><i class="btn-minus zmdi zmdi-minus"></i></span><span class="quantity-icon quantity-icon-right"><i class="btn-plus zmdi zmdi-plus"></i></span>');
            $('.quantity-up').on('click', function () {
                $(this).parents('.quantity').find('input[type="number"]').get(0).stepUp();
                $('.woocommerce-cart-form .actions .button').removeAttr('disabled');
            });
            $('.quantity-down').on('click', function () {
                $(this).parents('.quantity').find('input[type="number"]').get(0).stepDown();
                $('.woocommerce-cart-form .actions .button').removeAttr('disabled');
            });
        });

    });
    
    /* =================
     Column Absolute
     =================== */
    function elroyale_col_offset() {
        var w_vc_row_lg = ($('#content').width() - 1230) / 2;
        var w_vc_row_md = ($('#content').width() - 1140) / 2;
        if($(window).width() > 1260) {
            $('.col-offset-right > .vc_column-inner').css('padding-right', w_vc_row_lg + 'px');
            $('.col-offset-left > .vc_column-inner').css('padding-left', w_vc_row_lg + 'px');
        }
        if($(window).width() < 1260 && $(window).width() > 1200) {
            $('.col-offset-right > .vc_column-inner').css('padding-right', w_vc_row_md + 'px');
            $('.col-offset-left > .vc_column-inner').css('padding-left', w_vc_row_md + 'px');
        }
    }
    function elroyale_header_sticky() {
        var offsetTop = $('#site-header-wrap').outerHeight();
        var offsetTopAnimation = offsetTop + 200;
        if (scroll_status == 'down' && scroll_top > offsetTopAnimation) {
            $('#headroom').addClass('headroom--down').removeClass('headroom--up');
        } 
        if (scroll_status == 'up' && scroll_top > offsetTopAnimation) {
            $('#headroom').addClass('headroom--up').removeClass('headroom--down');
        } else if (scroll_status == 'up' && scroll_top < offsetTopAnimation) {
            $('#headroom').removeClass('headroom--up');
        }
    }

    function elroyale_menu_mobile() {
        if ($(window).width() < 992) {
            $(document).find('.main-menu-toggle').remove();
            $('.main-navigation').find('li.menu-item-has-children').append('<span class="main-menu-toggle"></span>');
            $('.main-menu-toggle').on('click', function () {
                $(this).parent().find('> .sub-menu').toggleClass('submenu-open');
                $(this).parent().find('> .sub-menu').slideToggle();
            });
        }
    }
    function elroyale_rtl() {
        /* =================
        RTL
        =================== */
        if( $('html').attr('dir') == 'rtl' ){
            $('[data-vc-full-width="true"]').each( function(i,v){
                $(this).css('right' , $(this).css('left') ).css( 'left' , 'auto');
            });
            $( '.acm-title-line hr' ).each( function(){
                $( this ).css( 'right' , $( this ).css( 'left' ) ).css( 'left' , '0px' );
            });
        }
    }
    /* ====================
    Same Height
    ====================== */
    function elroyale_item_sameheight() {
        $('.testimonial-item-inner ').matchHeight();
        $('.cms-related-post .entry-meta').matchHeight();
        $('.woocommerce-product-gallery .flex-control-thumbs li').matchHeight();
        $('.vc_row-o-equal-height .row-same-height').matchHeight();
        $('.cms-testimonial-carousel.layout1 .testimonial-item-inner').matchHeight();
        $('.vc_row-o-equal-height .cms-food-grid-layout2 .item-col-sameheight').matchHeight();
        
    }
    /* ====================
    Scroll To Top
    ====================== */
    function elroyale_scroll_to_top() {
        if (scroll_top < window_height) {
            $('.scroll-top').addClass('off').removeClass('on');
        } else {
            $('.scroll-top').removeClass('off').addClass('on');
        }
    }
    /* ====================
    NiceSelect apply for contact form
    ====================== */
    /* CMS Image Popup */
    $('.cms-images-zoom').magnificPopup({
      delegate: 'a.z-view', // child items selector, by clicking on it popup will open
      type: 'image',
      gallery: {
         enabled: true
      },
      mainClass: 'mfp-fade',
      // other options
    });

    $('.cms-image-zoom').magnificPopup({
      delegate: 'a.z-view', // child items selector, by clicking on it popup will open
      type: 'image',
      gallery: {
         enabled: false
      },
      mainClass: 'mfp-fade',
      // other options
    });

    $('.cshero-product-images').magnificPopup({
      delegate: 'a.zoom', // child items selector, by clicking on it popup will open
      type: 'image',
      gallery: {
         enabled: false
      },
      mainClass: 'mfp-fade',
      // other options
    });

})(jQuery);
