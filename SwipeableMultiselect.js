(function ($) {

    var getValues = function (actives) {
        var values = [];
        actives.each(function () {
            values.push(this.childNodes[0].value);
        });
        return values;
    };

    var getValue = function (actives) {
        return actives[0].childNodes[0].value;
    };

    var setValue = function (labels, val) {
        labels.each(function () {
            if (val == this.childNodes[0].value)
                $(this).addClass('active');
        });
    };

    var setValues = function (labels, val) {
        labels.each(function () {
            for (var v of val) {
                if (v == this.childNodes[0].value)
                    $(this).addClass('active');
            }
        });
    };

    var methods = {
        Init: function (options) {
            var values = options.values;
            var allowmultiple = options.allowMultiple;
            var groupid = $(this).attr("id");

            $(this).wrap("<div class=\"btn-group\" id=\"" + groupid + "\" data-toggle=\"buttons\">");
            
            var optsHtmlString = "";
            var inputType, isActive;

            var custom_border_class = "";

            var index = 0;
            for (var opt of values) {
                if (allowmultiple==false) inputType = "radio";
                else inputType = "checkbox";
                if (opt.active != null && opt.active == true) isActive = "active";
                else isActive = "";
                
                if (index == 0) custom_border_class = "first-option";
                else if (index == values.length - 1) custom_border_class = "last-option";
                else custom_border_class = "";

                if (opt.image == null) {
                    optsHtmlString += "<label class=\"multiselect-option " + isActive + " btn btn-sm btn-primary " + custom_border_class + "\"><input value=\"" + opt.value + "\" type=\"" + inputType + "\" autocomplete=\"off\">" + opt.text + "</label>";
                }
                else {
                    optsHtmlString += "<label class=\"multiselect-option " + isActive + " btn btn-sm btn-primary " + custom_border_class + "\"><input value=\"" + opt.value + "\" type=\"" + inputType + "\" autocomplete=\"off\"><img value=\"" + opt.value + "\" src=\"" + opt.image + "\" width=\"50px;\" height=\"50px;\" /></label>";
                }
                index++;
            }

            $(this).replaceWith(optsHtmlString);

            var mousedownOn = {
                el: null
            };

            $(document)
                .mouseup(function () {
                    mousedownOn.el = null;
                });

            $("#" + groupid + " .multiselect-option")
                .mousedown(function () {
                    var $this = $(this);
                    mousedownOn.el = $(this);
                    $this.button('toggle');
                })
                .mouseenter(function () {
                    var $this = $(this);
                    if (mousedownOn.el != null && $this.hasClass('active') != mousedownOn.el.hasClass('active')) {
                        $this.button('toggle', true);
                    }
                })
                .click(function (e) {
                    e.preventDefault();
                    return false;
                });
        },
        GetSelectedValue: function() { //$("#platform-swipeable").swipeableMultiselect("GetSelectedValue");
            var $this = $(this);
            var actives = $this.find("label.active");
            var result = undefined;
            if (actives.length > 0) {
                var swipeableType = actives[0].childNodes[0].type;
                if (swipeableType == "checkbox") {
                    result = getValues(actives);
                }
                if (swipeableType == "radio") {
                    result = getValue(actives);
                }
            }

            return result;
        }, 
        SetActive: function (val) {
            var $this = $(this);
            var actives = $this.find("label.active");

            actives.each(function () {
                $(this).removeClass('active');
            });

            var labels = $this.find("label");
            
            var swipeableType = labels[0].childNodes[0].type;
            if (swipeableType == "checkbox") {
                if (val.constructor !== Array) {
                    $.error("Error! You are trying to call SetActive function passing only one value but the control is configured to accept multiple values. Please retry passing an Array of values.");
                }
                else {
                    setValues(labels, val);
                }
            }
            if (swipeableType == "radio") {

                if (val.constructor === Array) {
                    $.error("Error! You are trying to call SetActive function passing and Array but the control is configured to accept only one value. Please retry passing only one value.");
                }
                else {
                    setValue(labels, val);
                }
            }
        }
    };

    $.fn.swipeableMultiselect = function (methodOrOptions) {
        if (methods[methodOrOptions]) {
            return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            return methods.Init.apply(this, arguments);
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist on jQuery.swipeableMultiselect');
        }
    };


})(jQuery);