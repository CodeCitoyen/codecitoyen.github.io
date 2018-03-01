jQuery(document).ready(function($) {

  "use strict";

  $(document).foundation();

  $('a[href*=pres]').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 700, 'linear');
  });

  if($('form#contact_form').length > 0) {
    $('form#contact_form').validate({
      messages: { },
      submitHandler: function(form) {
        $.ajax({
          type: 'POST',
          url: 'send.php',
          data: $(form).serialize(),
          success: function(data) {
            if(data.match(/success/)) {
              $(form).trigger('reset');
              $('#thanks').show().fadeOut(5000);
            }
          }
        });
        return false;
      }
    });
  }

  $('#menu-toggler').on('click', function() {
    $('.top-bar-section').toggle();
    return false;
  });

  if ($('#slides').length > 0) {
    $('#slides').on('init.slides', function() {
      var that = this;
      setTimeout(function() {
        $('.slides-container', that).children().eq(0).addClass('active');
      }, 300);
    });

    $('#slides').superslides({
      animation: 'fade',
      hashchange: false,
      play: 5000
    });

    $('#slides').on('animated.slides', function() {
      $('.slides-container', this).children().removeClass('active');

      var index = $(this).superslides('current');
      var that = this;

      setTimeout(function() {
        $('.slides-container', that).children().eq(index).addClass('active');
      }, 300);

    });
  }

  if ($('.slides').length > 0) {
    // $('.boxed').on('init.slides', function() {
    //   var that = this;
    //   setTimeout(function() {
    //     $('.slick-active', that).addClass('active');
    //   }, 300);
    // });
    $('.slides').slick({
      autoplay: true,
      pauseOnHover: false,
      dots: true,
      speed: 1000,
      arrows: false
    });
  }

  new WOW().init();


  var bars = $(".bars");

  for(var i = 0; i < bars.length; i++) {
    var bar = bars[i];
    var highlights = $('> li > .highlighted', $(bar));

    for ( var j = 0; j < highlights.length; j++ ) {

      var highlight = highlights[j];

      $(highlight).appear(function() {
        var percent = $(this).attr("data-percent");
        // $bar.html('<p class="highlighted"><span class="tip">'+percent+'%</span></p>');
        // http://stackoverflow.com/questions/3363035/jquery-animate-forces-style-overflowhidden
        $(this).animate({
          'width': percent + '%'
        }, 1700, function() { $(highlight).css('overflow', 'visible'); });
      });

    }
  }


  $(".milestone").appear(function() {
    $('.number', $(this)).countTo({
      speed: 1400
    });
  });

  // var width_1 = $(this).width();
  // var width_2 = $(".work img").width();
  // var margin_left = (width_1 - width_2) / 2 + 20 + 'px';
  // $('.info').css('margin-left', 'margin_left');

  if ($('.clients').length > 0) {
    $('.clients').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: false,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  $('.back-to-top').on('click', function() {
    $("html, body").animate({scrollTop: 0}, 1000);
    return false;
  });

  var masonryGallery = function(sel) {

    var $ctx = $(sel);
    var items = $('.gallery li', $ctx);
    var gutter = $ctx.data('gutter');

    if ( !gutter ) { gutter = 0 };

    for( var i = 0; i < items.length; i++ ) {
      var item = items[i];
      $(item).data('masonry-id', i);
    }

    var msnry = new Masonry($('.gallery', $ctx)[0], { itemSelector: 'li', gutter: gutter, isInitLayout: false, columnWidth: ".gallery li:not(.wide)" });

    window.msnry = msnry;

    $('.gallery', $ctx).imagesLoaded( function() {
      msnry.layout();
    });

    $('.gallery-nav ul li a', $ctx).on('click', function() {

      // disable filter
      // if( $('.gallery-nav', $ctx).hasClass('disabled') ) return false;

      // $('.gallery-nav', $ctx).addClass('disabled');

      $('.gallery-nav ul li').removeClass('current');
      $(this).closest('li').addClass('current');

      var cat = $(this).attr('data-cat');

      var gallery = $('.gallery-nav').closest('.masonry-gallery').find('ul.gallery');

      if (cat === 'all') {
        var exists = $('.gallery li', $ctx);
        var elems = [];

        for( var i = 0; i < items.length; i++ ) {
          var item = items[i];
          var skip = false;

          for(var j = 0; j < exists.length; j++ ) {
            var exist = exists[j];
            if ($(item).data('masonry-id') == $(exist).data('masonry-id')) {
              skip = true;
            }
          }

          if (!skip) {
            ($('.gallery', $ctx)[0]).appendChild($(item)[0]);
            elems.push($(item)[0]);
          }
        }
        msnry.prepended(elems);

      } else {
        var lis = $('li', gallery);

        for(var i = 0; i < lis.length; i++) {
          var li = lis[i];

          if (!$(li).hasClass(cat)) {
            msnry.remove($(li));
          }
        }

        var exists = $('.gallery li', $ctx);
        var elems = [];

        for( var i = 0; i < items.length; i++) {
          var item = items[i];
          var skip = false;

          for( var j = 0; j < exists.length; j++) {
            var exist = exists[j];

            if ($(item).data('masonry-id') == $(exist).data('masonry-id')) {
              skip = true;
            }
          }


          if ( $(item).hasClass(cat) && !skip) {
            ($('.gallery', $ctx)[0]).appendChild($(item)[0]);
            elems.push($(item)[0]);
          }
        }

        msnry.appended(elems);

      }

      msnry.layout();


      // enable filter
      // setTimeout(function() {
      //   $('.gallery-nav', $ctx).removeClass('disabled');
      // }, 500);

      return false;

    });

  }

});
//jQuery(document).ready(function($) {
//  var sheetId = "11iwRGQmwYH5m7UmXIKx5iwEXIYSbl9nXs52UsXEwVp4";
//  var apiKey = "AIzaSyDHTKK0HTffzWftN-ApDsRfkEC3dFFYb7o";
//  var api = "https://content-sheets.googleapis.com/v4/spreadsheets/"+sheetId+"/values/E1:Z100?key="+apiKey;
//
//  $.getJSON(api, function(data) {
//
//    // console.log(data);
//    var values = data.values;
//
//    var html_content = "";
//    var imgId = 0;
//    var socials = [
//      {
//        id: 7,
//        name: "envelope",
//        title: "Cliquez moi pour me copier !"
//      },
//      {
//        id: 8,
//        name: "facebook",
//        title: "facebook"
//      },{
//        id: 9,
//        name: "twitter",
//        title: "twitter"
//      },{
//        id: 10,
//        name: "github",
//        title: "github"
//      },{
//        id: 11,
//        name: "meetup",
//        title: "meetup"
//      },{
//        id: 12,
//        name: "slack",
//        title: "slack"
//      }
//
//    ];
//
//
//    var html_content_top = "";
//    var html_website = "";
//    var html_socials = "";
//    var html_content_bot = "";
//
//    values.shift();
//    values = shuffle(values);
//
//    for (var i = 0; i < values.length; i++) {
//
//        if(!values[i][0]) {
//          break;
//        }
//
//        html_content_top = "";
//        html_website = "";
//        html_socials = "";
//        html_content_bot = "";
//        if( values[i][5] ) {
//          imgId = values[i][5].substr(33);
//        }
//
//        var imageLink = "https://drive.google.com/uc?export=view&id="+imgId;
//
//          html_content_top +=
//          "<div class=\"project_container\">"+
//            "<div class=\"project\">"+
//              "<div class=\"project_text\" >"+
//                "<div class=\"project_title\">"+
//                  "<h2>"+values[i][0]+"</h2>"+
//                "</div>"+
//                "<hr>"+
//                "<div class=\"project_description\">"+
//                  "<p>"+values[i][1]+"</p>"+
//                  "<div class=\"hideLongDescription\"></div>"+
//                "</div>"+
//              "</div>"+
//              "<div class=\"center\">"+
//                "<img max-height=\"200\" width=\"100%\" src=\""+imageLink+"\">"+
//              "</div>"+
//              "<div class=\"website center\">";
//
//
//              if(values[i][6]) {
//                html_website += "<a target=\"_blank\" href=\""+values[i][6]+"\">"+
//                    "Site Web"+
//                  "</a>";
//              }
//              html_website += "</div>";
//
//              html_socials += "<div class=\"socialNetworks\">";
//              for (var j = 0; j < socials.length; j++) {
//                if(values[i][socials[j].id]) {
//                  html_socials += "<div class=\""+socials[j].name+"\" >"+
//                                    "<a title=\""+socials[j].title+"\"  target=\"_blank\" href=\""+values[i][socials[j].id]+"\">"+
//                                      "<i class=\"fa fa-"+socials[j].name+"\" aria-hidden=\"true\"></i>"+
//                                    "</a>"+
//                                  "</div>";
//                }
//              }
//
//              html_socials += "</div>";
//
//          html_content_bot += "</div>"+
//                            "</div>";
//
//
//    html_content += html_content_top + html_website + html_socials + html_content_bot;
//    }
//    $("#projets_container").html(html_content);
//
//    $(".envelope a").click(function(e){
//      e.preventDefault();
//      var $temp = $("<input>");
//     $("body").append($temp);
//     $temp.val($(this).attr("href")).select();
//     document.execCommand("copy");
//     $temp.remove();
//    });
//
//
//  });
//
//
//  function shuffle(a) {
//      var j, x, i;
//      for (i = a.length; i; i--) {
//          j = Math.floor(Math.random() * i);
//          x = a[i - 1];
//          a[i - 1] = a[j];
//          a[j] = x;
//      }
//      return a;
//
//  }
//
//
//
//});
