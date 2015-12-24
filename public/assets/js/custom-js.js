$(".dropdown-menu li a").click(function() {
     $(".dropdown-text").text($(this).html());     
});


// Intiate multi level rows Local Category
$(document).ready(function(){
    $('.sortable').nestedSortable({
        handle: 'div',
        items: 'li',
        toleranceElement: '> div',
        maxLevels: '5'
    });
});


// Toggle Local Category page
$( ".local-category-toggle-area" ).click(function() {
  $(this).closest('li').children('ol').slideToggle('slow');
  $(this).children('i').toggleClass('fa-chevron-right fa-chevron-down')
});