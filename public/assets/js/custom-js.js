$(".dropdown-menu li a").click(function() {
     $(".dropdown-text").text($(this).html());     
     // alert($(this).html());
});

$(document).ready(function(){
    $('.sortable').nestedSortable({
        handle: 'div',
        items: 'li',
        toleranceElement: '> div',
        maxLevels: '5'
    });
});