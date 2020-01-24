/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.aimx = {
    attach: function (context, settings) {
      const removeClasses = 'btn btn-primary order-md-2 mb-1 mb-md-0 add-display button'
      $('#views-display-top', context).once('add-flex').addClass('d-flex flex-column flex-md-row')
      const menu_tabs = $('#views-display-menu-tabs', context).once('no-list-style').addClass('list list-unstyled mr-auto')
      $(menu_tabs).once('change-siblings-once').siblings().addClass('order-md-2 mb-1 mb-md-0')
      const addDrop = $('#views-display-menu-tabs .add ul.action-list').once('fix-view').addClass('dropdown-menu').attr('aria-labelledby', 'add-views-top-button').removeClass('action-list').attr('style', '')
      if (addDrop.length) {
        var buttons = $('#views-display-top >button').once('move-buttons').detach()
        $(buttons).once('actually-move-buttons').addClass('dropdown-item').appendTo(addDrop)
        var menu2 = $('#views-display-top li.add').addClass('dropdown').removeClass('add')
        $(menu2).once('remove-a').find('>a').remove('');
        $(menu2).once('prepend-button').prepend('<button class="btn btn-primary btn-sm" type="button" id="add-views-top-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add</button>')
        $('[aria-labelledby="add-views-top-button"] > button').removeClass(removeClasses)
        //type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
      }

      var ds = $('#edit-display-settings-top').once('fix-settings-top').addClass('d-flex flex-column flex-md-row')

      $('.dropbutton', ds).removeClass('dropbutton').addClass('dropdown-menu').wrap('<div id="settings-top" class="dropdown order-md-2 ml-md-auto dropleft"></div>')

      $('.dropdown', ds).prepend('<button class="btn btn-info btn-sm dropdown-toggle" type="button" id="settings-top" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>')
      $('li>button', ds).addClass('dropdown-item').removeClass(removeClasses)



    }
  };

})(jQuery, Drupal);
