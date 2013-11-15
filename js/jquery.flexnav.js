/*
	FlexNav.js 1.2.3

	Created by Jason Weaver http://jasonweaver.name
	Released under http://unlicense.org/

//
*/


(function() {
  var $;

  $ = jQuery;

  $.fn.flexNav = function(options) {
    var $nav, resetMenu, resizer, settings, showMenu, toggle_selector;
    settings = $.extend({
      'transitionOpacity': true,
      'buttonSelector': '.menu-button',
      'hoverIntent': false,
      'hoverIntentTimeout': 150
    }, options);
    $nav = $(this);
    $nav.addClass('with-js');
    if (settings.transitionOpacity === true) {
      $nav.addClass('opacity');
    }
    $nav.find("li").each(function() {
      if ($(this).has("ul").length) {
        return $(this).addClass("item-with-ul").find("ul");
      }
    });
    showMenu = function() {
      if ($nav.hasClass('lg-screen') === true) {
        if (settings.transitionOpacity === true) {
          return $(this).find('>ul').addClass('show');
        } else {
          return $(this).find('>ul').addClass('show');
        }
      }
    };
    resetMenu = function() {
      if ($nav.hasClass('lg-screen') === true && $(this).find('>ul').hasClass('show') === true) {
        if (settings.transitionOpacity === true) {
          return $(this).find('>ul').removeClass('show');
        } else {
          return $(this).find('>ul').removeClass('show');
        }
      }
    };
    resizer = function() {
      $nav.removeClass("sm-screen").addClass("lg-screen");
      $nav.removeClass('show');
      if (settings.hoverIntent === true) {
        return $('.item-with-ul').hoverIntent({
          over: showMenu,
          out: resetMenu,
          timeout: settings.hoverIntentTimeout
        });
      } else if (settings.hoverIntent === false) {
        return $('.item-with-ul').on('mouseenter', showMenu).on('mouseleave', resetMenu);
      }
    };
    $(settings['buttonSelector']).data('navEl', $nav);
    toggle_selector = settings['buttonSelector'] + ', ' + settings['buttonSelector'] + ' .touch-button';
    $(toggle_selector).on('click', function(e) {
      var $btnParent, $thisNav, bs;
      $(toggle_selector).toggleClass('active');
      e.preventDefault();
      e.stopPropagation();
      bs = settings['buttonSelector'];
      $btnParent = $(this).is(bs) ? $(this) : $(this).parent(bs);
      $thisNav = $btnParent.data('navEl');
      return $thisNav.toggleClass('show');
    });
    $('.touch-button').on('click', function(e) {
      var $sub, $touchButton;
      $sub = $(this).parent('.item-with-ul').find('>ul');
      $touchButton = $(this).parent('.item-with-ul').find('>span.touch-button');
      if ($nav.hasClass('lg-screen') === true) {
        $(this).parent('.item-with-ul').siblings().find('ul.show').removeClass('show');
      }
      if ($sub.hasClass('show') === true) {
        $sub.removeClass('show');
        return $touchButton.removeClass('active');
      } else if ($sub.hasClass('show') === false) {
        $sub.addClass('show');
        return $touchButton.addClass('active');
      }
    });
    $nav.find('.item-with-ul *').focus(function() {
      $(this).parent('.item-with-ul').parent().find(".open").not(this).removeClass("open");
      return $(this).parent('.item-with-ul').find('>ul').addClass("open");
    });
    resizer();
    return $(window).on('resize', resizer);
  };

}).call(this);
