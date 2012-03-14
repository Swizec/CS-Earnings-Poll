
var crosstab = (function (options) {
    var opts = $.extend({$element: $(),
                         desc: function () {},
                         dim: {slider: [],
                               pie: function () {}},
                         label: ""},
                        options);

    var template = Handlebars.compile($(".crosstab-template").html());
    opts.$element.html(template({}));

    var slider_value = 1,
        pie = gief_piechart(opts.$element.find(".pie-chart")[0], opts.label),
        update = function () {
            opts.$element.find(".description").html(
                opts.desc({value: opts.dim.slider[slider_value-1]}));

            pie(opts.dim.pie(slider_value));
        };

    opts.$element.find(".slider").slider({
	value: 1,
	min: 1,
	max: opts.dim.slider.length,
	step: 1,
        width: '100px',
	slide: function( event, ui ) {
            slider_value = ui.value;
            update();
	}
    });

    // first time needs two redraws
    pie(opts.dim.pie(slider_value));
    update();

    return update;
});
