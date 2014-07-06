/*globals jQuery, window, document */
(function ($) {
    "use strict";
    var pluginName  =   "auroraQty",
        defaults    =   {};
    // The actual plugin constructor
    function Plugin(element, options) {
        this.element        =   element;
        this.$element       =   $(this.element);
        this.settings       =   $.extend({}, defaults, options);
        this.init();
    }
    Plugin.prototype = {
        init: function () {
            this.prepareHtml();
            this.enableArrows();
            this.numbersOnly();
            this.setInitialValue();
        },
        setInitialValue: function () {
            if (!this.$element.val().length) {
                this.$element.val(1);
                this.$element.parent('.qt-wrap').find('.qt-wrap-dec').removeClass('active');
            }
        },
        prepareHtml: function () {
            this.$element.wrap('<div class="qt-wrap" />');
            this.$element.after('<a class="qt-wrap-inc active" href="#">+</a><a class="qt-wrap-dec active" href="#">-</a>');
        },
        enableArrows: function () {
            var that = this;

            this.$element.parent().find('a').on('click', function (e) {
                e.preventDefault();
                var button = this,
                    oldValue = that.$element.val() ? parseInt(that.$element.val(), 10) : 0,
                    newVal = 1;
                if (button.innerHTML === "+") {
                    newVal = parseFloat(oldValue) + 1;
                } else {
                    if (oldValue >= 2) {
                        newVal = parseFloat(oldValue) - 1;
                    }
                }
                if (newVal === 1) {
                    that.$element.parent('.qt-wrap').find('.qt-wrap-dec').removeClass('active');
                } else {
                    that.$element.parent('.qt-wrap').find('.qt-wrap-dec').addClass('active');
                }
                that.$element.val(newVal);
            });
        },
        numbersOnly: function () {
            this.$element.on('keyup', function () {
                var value = this.value,
                    first;
                if (value.length === 0) {
                    return;
                }
                first = value.charAt(0);
                value = value.replace(/[^0-9]/g, '');
                if (first === '-') {
                    value = first + value;
                }
                this.value = value;
                return true;
            });
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };
}(jQuery));