
;(function ( $, window, undefined ) {
  "use strict";
  // js functionality

  $(function() {
    $('.badge').tooltip();

    $('.scroll-to').on('click', function(event){
        event.preventDefault();
        var target = $(event.currentTarget).attr("href");
        $("body").animate({scrollTop: $(target).offset().top - $(".navbar-fixed-top").height()});
    });

    $('[role=tab]').on('click', function(event){
      var parent = $(event.currentTarget).parent();
      if (parent.hasClass('active')) {
        event.preventDefault();
        parent.removeClass('active');
        console.log("href", $(event.currentTarget).attr("href"), $($(event.currentTarget).attr("href")));
        $($(event.currentTarget).attr("href")).removeClass("active");
        return false;
      }
    });
    var wow = new WOW(
      {
        animateClass: 'animated',
        offset:       100
      }
    );
    wow.init();

  });

}(jQuery, window));
