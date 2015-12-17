$(".dropdown-menu li a").click(function() {
     $(".dropdown-text").text($(this).html());     
     // alert($(this).html());
});