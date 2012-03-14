
(function ($) {

    /// DATA FUNCTIONS;
    var slice_functions = {
        students: function (item) { return !!item.cs_student; },
        others: function (item) { return !item.cs_student; },
        everyone: function (item) { return true; }
    },
        slice_func = slice_functions.students,

        data_functions = {
            year_vs_pay: function (year) {
                var labels = ['do 7€/h',
                              '7€/h do 13€/h',
                              '13€/h do 16€/h',
                              '16€/h do 20€/h',
                              '20€/h do 50€/h',
                              '50€/h do 80€/h',
                              'nad 80€/h'];

                var data = DATA.filter(slice_func).filter(function (item) {
                    return item.years_study == year;
                }),
                    fin_data = d3.range(labels.length).map(function (i) {
                        return {label: labels[i],
                                count: 0};
                    });
                data.map(function (item) { fin_data[item.hourly_rate-1].count += 1; });
                return fin_data;
            },
            study_vs_pay: function (study) {
                var labels = ['do 7€/h',
                              '7€/h do 13€/h',
                              '13€/h do 16€/h',
                              '16€/h do 20€/h',
                              '20€/h do 50€/h',
                              '50€/h do 80€/h',
                              'nad 80€/h'];

                var data = DATA.filter(slice_func).filter(function (item) {
                    return item.study_time == study;
                }),
                    fin_data = d3.range(labels.length).map(function (i) {
                        return {label: labels[i],
                                count: 0};
                    });
                data.map(function (item) { fin_data[item.hourly_rate-1].count += 1; });
                return fin_data;
            }
        };

    var crosstabs = [
        {desc: Handlebars.compile("Studying for {{value}} hours a week."),
         dim: {pie: data_functions.year_vs_pay,
               slider: [1,2,3,4,5,6,7,8]},
         label: "students"
        },
        {desc: Handlebars.compile("Studying for {{value}} hours a week."),
         dim: {pie: data_functions.study_vs_pay,
               slider: ["do 10h", "11-20h", "21-30h", "31-40h", "nad 50h"]},
         label: "students"
        }
    ];

    var $proto = $("<li></li>"), $el, $crosstabs = $("#crosstabs");

    crosstabs = crosstabs.map(function (options) {
        $el = $proto.clone();
        $crosstabs.append($el);
        options.$element = $el;

        return crosstab(options);
    });

    var update = function () {
        crosstabs.map(function (update_crosstab) {
            console.log(update_crosstab);
            update_crosstab();
        });
    };


    $(".btn-group .btn").addClass("btn-primary");
    $(".btn-group .default").button('toggle');

    $(".btn-group .btn").click(function (e) {
        var $btn = $(e.currentTarget);
        if (!$btn.hasClass('active')) {
            // this effects all data functions, which in turn effects graphs
            slice_func = slice_functions[$btn.attr('name')];
            update();
        }
    });

})(jQuery);
