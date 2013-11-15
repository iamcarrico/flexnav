###
	FlexNav.js 1.2.3

	Created by Jason Weaver http://jasonweaver.name
	Released under http://unlicense.org/

//
###

# Use local alias for $.noConflict() compatibility
$ = jQuery

$.fn.flexNav = (options) ->
  settings = $.extend
    'transitionOpacity': true,
    'buttonSelector': '.menu-button',
    'hoverIntent': false,
    'hoverIntentTimeout': 150,
    options

  $nav = $(@)

  # Set some classes in the markup
  $nav.addClass('with-js')
  if settings.transitionOpacity is true
    $nav.addClass('opacity')
  $nav.find("li").each ->
    if $(@).has("ul").length
      $(@).addClass("item-with-ul").find("ul")

  # Functions for hover support
  showMenu = ->
    if $nav.hasClass('lg-screen') is true
      if settings.transitionOpacity is true
        $(@).find('>ul')
          .addClass('show')
      else
        $(@).find('>ul')
         .addClass('show')
  resetMenu = ->
    if $nav.hasClass('lg-screen') is true and $(@).find('>ul').hasClass('show') is true
      if settings.transitionOpacity is true
        $(@).find('>ul')
          .removeClass('show')
      else
        $(@).find('>ul')
          .removeClass('show')

  # Changing classes depending on viewport width and adding in hover support
  resizer = ->
    $nav.removeClass("sm-screen").addClass("lg-screen")
    # Make sure navigation is closed when going back to large screens
    $nav.removeClass('show')
    if settings.hoverIntent is true
      # Requires hoverIntent jquery plugin http://cherne.net/brian/resources/jquery.hoverIntent.html
      $('.item-with-ul').hoverIntent(
        over: showMenu,
        out: resetMenu,
        timeout: settings.hoverIntentTimeout
      )
    else if settings.hoverIntent is false
      $('.item-with-ul').on('mouseenter', showMenu).on('mouseleave', resetMenu)

  # Set navigation element for this instantiation
  $(settings['buttonSelector']).data('navEl', $nav)

  # Add in touch buttons
  #touch_selector = '.item-with-ul, ' + settings['buttonSelector']
  #$(touch_selector).append('<span class="touch-button"><i class="navicon">&#9660;</i></span>')

  # Toggle touch for nav menu
  toggle_selector = settings['buttonSelector'] + ', ' + settings['buttonSelector'] + ' .touch-button'
  $(toggle_selector).on('click', (e) ->
    $(toggle_selector).toggleClass('active')
    e.preventDefault()
    e.stopPropagation()
    bs = settings['buttonSelector']
    $btnParent = if ($(@).is(bs)) then $(@) else $(@).parent(bs)
    $thisNav = $btnParent.data('navEl')
    $thisNav.toggleClass('show')
  )

  # Toggle for sub-menus
  $('.touch-button').on('click', (e) ->
    $sub = $(@).parent('.item-with-ul').find('>ul')
    $touchButton = $(@).parent('.item-with-ul').find('>span.touch-button')
    # remove class of show from all elements that are not current
    if $nav.hasClass('lg-screen') is true
      $(@).parent('.item-with-ul').siblings().find('ul.show').removeClass('show')
    # add class of show to current
    if $sub.hasClass('show') is true
      $sub.removeClass('show')
      $touchButton.removeClass('active')
    else if $sub.hasClass('show') is false
      $sub.addClass('show')
      $touchButton.addClass('active')
  )

  # Sub ul's should have a class of 'open' if an element has focus
  $nav.find('.item-with-ul *').focus ->
    # remove class of open from all elements that are not focused
    $(@).parent('.item-with-ul').parent().find(".open").not(@).removeClass("open")
    # add class of open to focused ul
    $(@).parent('.item-with-ul').find('>ul').addClass("open")

  # Call once to set
  resizer()

  # Call on browser resize
  $(window).on('resize', resizer)
