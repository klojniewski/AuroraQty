/*globals Class, Event, window, document */
var AuroraQty = Class.create({
    initialize: function (buttons) {
        "use strict";
        this.buttons = buttons;
        this.prepareHtml();
        this.init();
    },
    prepareHtml: function () {
        "use strict";
        this.buttons.first().wrap('div', { 'class': 'qt_wrap' });
        this.buttons.first().insert({
            after: '<a class="qt-wrap-inc" href="#">+</a><a class="qt-wrap-dec" href="#">-</a>'
        });
    },
    init: function () {
        "use strict";
        var that = this;
        that.buttons.each(function (but) {
            if (!but.disabled) {
                that.enableArrows(but);
                that.numbersOnly(but);
            }
        });
    },
    numbersOnly: function (but) {
        "use strict";
        but.observe('keyup', function () {
            var value = this.value, first;
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
    },
    isNumber: function (evt) {
        "use strict";
        evt = evt || window.event;
        var charCode = evt.which || evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    },
    enableArrows: function (but) {
        "use strict";
        but.up().select('a').invoke('observe', 'click', function (e) {
            Event.stop(e);
            var button = this,
                oldValue = button.up().select("input")[0].value,
                newVal = 1;
            if (button.innerHTML === "+") {
                newVal = parseFloat(oldValue) + 1;
            } else {
                if (oldValue >= 2) {
                    newVal = parseFloat(oldValue) - 1;
                }
            }
            button.up().select("input")[0].value = newVal;
        });
    }
});
