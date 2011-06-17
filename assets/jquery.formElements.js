/**
* From Elements jQuery Plugin
*
* @author Dumitru Glavan
* @link http://dumitruglavan.com
* @version 1.0
* @requires jQuery v1.6 or later
*
* @example $('form').formElements();
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
        
        $self.find('input[type="checkbox"],input[type="radio"],select').each(function (i, el) {
            var $el = $(el), type = $el.attr('type') ? $el.attr('type') : ($el[0].nodeName === 'SELECT' ? 'select' : false);
            switch (type) {
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
                case 'select':
                    var selectWrap = '<div class="selected-index-wrap"><span>{selectedText}</span></div>' +
                                     '<ul class="select-options-wrap">{selectOptions}</ul>';
                    var optionsWrap = '';
                    $el.find('option').each(function (i, option) {
                        optionsWrap += ('<li data-index="' + i + '" class="' + ($(option).attr('selected') ? 'selected' : '') + '">' + $(option).text() + '</li>');
                        if ($(option).attr('selected')) {
                            selectWrap = selectWrap.replace('{selectedText}', $(option).text());
                        }
                    });
                    selectWrap = selectWrap.replace('{selectOptions}', optionsWrap);
                    var $selectWrap = $(selectWrap);
                    $selectWrap.insertAfter($el);
                    $($selectWrap[1]).offset({
                        left: $selectWrap.offset().left,
                        top: $selectWrap.offset().top + $selectWrap.height()
                    });
                    $selectWrap.click(function () {
                        $(this).next().toggle();
                    });
                    $selectWrap.find('li').click(function () {
                        var $self = $(this), $ul = $self.parent();
                        $selectWrap.find('span:first').text($self.text());
                        $ul.hide();
                        $el.find('option[selected="selected"]').attr('selected', false);
                        $($el.find('option')[$self.attr('data-index')]).attr('selected', true);
                        $ul.find('li').each(function (i, e) {
                            $(e).removeClass('selected');
                        });
                        $self.addClass('selected');
                    });
                    break;
            }
        });

		return this;
	};
})(jQuery);