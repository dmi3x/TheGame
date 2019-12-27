var clinic_level = 1;
function save_level(level) {
    clinic_level = Math.max(1,parseInt(level)-1);
}
function to_hide(v) {
    var r = new RegExp('[1-'+clinic_level+']');
    return v=='' || r.test(v);
}

jConfirm(
    'Желаете отфильтровать клиники по уровню?<br><input onchange="save_level(this.value)" type="number" min="1" max="7" value="1">',
    'Info',
    function (value) {
        if (!value) clinic_level = 1;
        $('.med_clin_table tbody tr').each(function(i, tr){
            var show = false;
            $(tr).find('td:gt(1)').each(function(j, td){
                if (!to_hide($(td).text())) show = true;
            });
            if (!show) $(tr).hide();
        });
    }
);

$(".med_clin_table .cal-vartical").click(function () {
    $(".med_clin_table .cal-vartical").css("backgroundColor", "");
    var a = $(this).index();
    $(".med_clin_table .cal-vartical:nth-child(" + (a + 1) + ")").css("backgroundColor", "yellow");
    $(".med_clin_table tbody tr").show();
    var b = $(this).index();
    $(".med_clin_table tbody tr td:nth-child(" + (b + 1) + ")").show().each(function (a, b) {
        to_hide($(b).text()) && $(b).parent().hide()
    })
});