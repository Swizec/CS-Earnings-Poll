
(function ($) {

    var pie = gief_piechart('#pie1', "students");
    var pie2 = gief_piechart('#pie2', "students");

    $(".btn-group .btn").addClass("btn-primary");
    $(".btn-group .default").button('toggle');

    $(".btn-group .btn").click(function (e) {
        var $btn = $(e.currentTarget);
        if (!$btn.hasClass('active')) {
            console.log($btn.attr('name'));
        }
    });

    $( "#slider" ).slider({
	value: 1,
	min: 1,
	max: 8,
	step: 1,
        width: '100px',
	slide: function( event, ui ) {
	    $( "#amount" ).html("Studying for "+ui.value+" years");
            pie(year_vs_pay(ui.value), "students");
            pie2(year_vs_pay(ui.value-1), "students");
	}
    });
    pie(year_vs_pay(1));
    pie(year_vs_pay(1));

    pie2(year_vs_pay(3));
    pie2(year_vs_pay(3));

})(jQuery);

/// DATA FUNCTIONS

function year_vs_pay(year) {
    var hourly_rate_labels = ['do 7€/h',
                              '7€/h do 13€/h',
                              '13€/h do 16€/h',
                              '16€/h do 20€/h',
                              '20€/h do 50€/h',
                              '50€/h do 80€/h',
                              'nad 80€/h'];

    var data = DATA.filter(function (item) { return item.years_study == year; }),
        fin_data = d3.range(7).map(function (i) {
            return {label: hourly_rate_labels[i],
                    count: 0};
        });
    data.map(function (item) { fin_data[item.hourly_rate-1].count += 1; });
    return fin_data;
}
