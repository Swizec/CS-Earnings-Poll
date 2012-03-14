
var crosstab = (function ($element, description, data_func, label) {
    var template = Handlebars.compile($(".crosstab-template").html());
    $element.html(template({}));

    var slider_value = 1,
        pie = gief_piechart($element.find(".pie-chart")[0], label),
        update = function () {
            $element.find(".description").html(description({value: slider_value}));
            pie(data_func(slider_value));
        };

    $element.find(".slider").slider({
	value: 1,
	min: 1,
	max: 8,
	step: 1,
        width: '100px',
	slide: function( event, ui ) {
            slider_value = ui.value;
            update();
	}
    });

    // first time needs two redraws
    pie(data_func(slider_value));
    update();

    return update;
});
