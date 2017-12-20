
var count, mimax_count;
$(document).ready(function () {
    count =0;
    mimax_count=0;
});

//Mininize - Maximize App Info Logic Start
function min_max() {
    if (mimax_count == 0) {
        mimax_count = 1;
        document.getElementById("min_max_box").style.display = "none";
    }
    else if (mimax_count == 1) {
        mimax_count = 0;
        document.getElementById("min_max_box").style.display = "block";
    }
}
//Mininize - Maximize App Info Logic End

//App info edit start
function editContent() {
if(count == 0){
    count = 1;
    document.getElementById("app_name_value").contentEditable = "true"; 
    document.getElementById("app_descp_value").contentEditable = "true"; 
    document.getElementById("app_name").style.border = "2px solid rgb(128, 212, 255, 0.4)"; 
    document.getElementById("app_name").style.backgroundColor = "rgb(128, 212, 255, 0.3)"; 
    document.getElementById("app_name").style.backgroundColor = "rgb(128, 212, 255, 0.3)"; 
}
else if(count == 1){
    count = 0;
    document.getElementById("app_name_value").contentEditable = "false"; 
    document.getElementById("app_descp_value").contentEditable = "false"; 
    document.getElementById("app_name").style.border = "2px solid rgb(133, 129, 129, 0.3)"; 
    document.getElementById("app_name").style.backgroundColor = "rgb(216, 210, 210, 0.3)";
    document.getElementById("app_name").style.backgroundColor = "rgb(216, 210, 210, 0.3)"; 
}
}
//App info edit end

//copy and select start
function selectText(containerid) {
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().addRange(range);
    }
}

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}
//copy and select end

function snackbar_function(element) {
    var x = document.getElementById(element)
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

//function for input number start

$('.btn-number').click(function (e) {
    e.preventDefault();

    fieldName = $(this).attr('data-field');
    type = $(this).attr('data-type');
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if (type == 'minus') {

            if (currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            }
            if (parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if (type == 'plus') {

            if (currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if (parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function () {
    $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function () {

    minValue = parseInt($(this).attr('min'));
    maxValue = parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());

    name = $(this).attr('name');
    if (valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if (valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }


});
$(".input-number").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});




























