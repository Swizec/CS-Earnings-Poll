
(function ($) {

    var pie = gief_piechart('#pie1');
    var pie2 = gief_piechart('#pie2');

    $( "#slider" ).slider({
			value: 1,
			min: 1,
			max: 8,
			step: 1,
        width: '100px',
			slide: function( event, ui ) {
			    $( "#amount" ).html("Studying for "+ui.value+" years");
                            pie(ui.value);
			}
		});
    pie(1);
    pie(1);

    pie2(3);
    pie2(3);

})(jQuery);
