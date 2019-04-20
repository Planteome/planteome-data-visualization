function load(){
    $(document).ready(function(){
        $("img").click(function() {
           $(this).toggleClass("bigger");
        });
    });
}