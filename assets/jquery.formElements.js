/**
* From Elements jQuery Plugin
*
* @author Dumitru Glavan
* @link http://dumitruglavan.com
* @version 1.0
* @requires jQuery v1.6 or later
*
* @example $('form').formElements({});
*
* Find source on GitHub: https://github.com/doomhz/jQuery-Form-Elements
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*/
(function ($) {
    $.fn.formElements = function (options) {

		if ($(this).length > 1) {
			$(this).each(function (i, el) {
				$(el).formElements(options);
			});
			return $(this);
		}

		this.config = {
			
		};
		$.extend(this.config, options);

		var self = this, $self = $(this);
        
        $self.find('input[type="checkbox"],input[type="radio"]').each(function (i, el) {
            var $el = $(el);
            switch ($el.attr('type')) {
                case 'checkbox':
                    $el.parent().removeClass('check_on check_off')
                    .addClass($el.attr('checked') ? 'check_on' : 'check_off')
                    .click(function (ev) {
                        var $par = $(this);
                        if ($(ev.target)[0].nodeName !== 'INPUT') {
                            $el.attr('checked', $el.attr('checked') ? false : true);
                        }
                        $par.removeClass('check_on check_off')
                        .addClass($el.attr('checked') ? 'check_on' : 'check_off');
                    });
                    break;
                case 'radio':
                    $el.parent()
                    .addClass($el.attr('checked') ? 'check_on' : 'check_off')
                    .click(function (ev) {
                        $('.check_on,.check_off,input[checked="checked"]', $el.parent().parent()).
                        each(function (i, elem) {
                            if ($(elem)[0].nodeName === 'INPUT') {
                                $(elem).attr('checked', false);
                            } else {
                                $(elem).removeClass('check_on').addClass('check_off');
                            }
                        });
                    
                        var $par = $(this);
                        if ($(ev.target)[0].nodeName !== 'INPUT') {
                            $el.attr('checked', $el.attr('checked') ? false : true);
                        }
                        $par.removeClass('check_on check_off')
                        .addClass($el.attr('checked') ? 'check_on' : 'check_off');
                    });
                    break;
            }
        });

		return this;
	};
})(jQuery);