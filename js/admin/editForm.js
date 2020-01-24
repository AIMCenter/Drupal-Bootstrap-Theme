/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.aimxEditforms = {
    attach: function (context, settings) {
      var temp = $('#edit-status-value', context).once('status-value').attr('checked')
      if (temp === 'checked') {
        $('.shadow').prepend('<div class="alert alert-success small text-center"></div>')
      }
      console.log(temp)
    }
  };

})(jQuery, Drupal);
