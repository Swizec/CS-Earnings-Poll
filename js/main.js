
(function ($) {

    var pie = gief_piechart('#pie1', "students");
    var pie2 = gief_piechart('#pie2', "students");

    var filter_functions = {
        students: function (item) { return !!item.cs_student; },
        others: function (item) { return !item.cs_student; },
        everyone: function (item) { return true; }
    },
        filter_func = filter_functions.students,
        slider_value = 1;

    var update = function () {
        pie(year_vs_pay(slider_value,
                        filter_func));
        pie2(year_vs_pay(slider_value-1,
                         filter_func));
    };

    $(".btn-group .btn").addClass("btn-primary");
    $(".btn-group .default").button('toggle');

    $(".btn-group .btn").click(function (e) {
        var $btn = $(e.currentTarget);
        if (!$btn.hasClass('active')) {
            filter_func = filter_functions[$btn.attr('name')];
            update();
        }
    });

    $( "#slider" ).slider({
	value: 1,
	min: 1,
	max: 8,
	step: 1,
        width: '100px',
	slide: function( event, ui ) {
            slider_value = ui.value;
            $("#amount").html("Studying for "+slider_value+" years.");
            update();
	}
    });
    pie(year_vs_pay(1, filter_func));
    pie(year_vs_pay(1, filter_func));

    pie2(year_vs_pay(3, filter_func));
    pie2(year_vs_pay(3, filter_func));

})(jQuery);

/// DATA FUNCTIONS

function year_vs_pay(year, subset) {
    var hourly_rate_labels = ['do 7€/h',
                              '7€/h do 13€/h',
                              '13€/h do 16€/h',
                              '16€/h do 20€/h',
                              '20€/h do 50€/h',
                              '50€/h do 80€/h',
                              'nad 80€/h'];

    var data = DATA.filter(subset).filter(function (item) { return item.years_study == year; }),
        fin_data = d3.range(7).map(function (i) {
            return {label: hourly_rate_labels[i],
                    count: 0};
        });
    data.map(function (item) { fin_data[item.hourly_rate-1].count += 1; });
    return fin_data;
}
