$(document).ready(function () {
  // Global Variables

  var toggle_primary_button = $(".nav_toggle_button"),
    toggle_primary_icon = $(".nav_toggle_button i"),
    toggle_secondary_button = $(".page_nav li span"),
    primary_menu = $(".page_nav"),
    secondary_menu = $(".page_nav ul ul"),
    webHeight = $(document).height(),
    window_width = $(window).width();

  // Company name and phone number on content area
  $("main * :not('h1'), #banner, #middle, #bottom1, #bottom2, #bottom3, footer p")
    .not(".woocommerce *")
    .each(function () {
      var regex1 =
        /(?![^<]+>)((\+\d{1,2}[\s.-])?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{6})/g;
      var regex2 =
        /(?![^<]+>)((\+\d{1,2}[\s.-])?\(?\d{3}\)?[\s.-]?\d{4}[\s.-]?\d{4})/g;
      var regex =
        /(?![^<]+>)((\+\d{1,2}[\s.-])?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4})/g;
      $(this).html(
        $(this)
          .html()
          .replace(/Anchorage Hospice, Inc./gi, "<mark class='comp'>$&</mark>")
          .replace(regex1, "<mark class='main_phone'>$&</mark>")
          .replace(regex2, "<mark class='main_phone'>$&</mark>")
          .replace(regex, "<mark class='main_phone'>$&</mark>")
      );
    });

  $("main a[href]").each(function () {
    var newHref = $(this)
      .attr("href")
      .replace("<mark class='comp'>", "")
      .replace("</mark>", "");
    $(this).attr("href", newHref);
  });

  // Forms on content area
  var form = $("main").find("#myframe");
  if (form.length > 0) {
    document.getElementById("myframe").onload = function () {
      calcHeight();
    };
  }

  // Add class to tab having drop down
  $(".page_nav li:has(ul)").find("span i").addClass("fa-caret-down");

  //Multi-line Tab
  toggle_secondary_button.click(function () {
    $(this)
      .parent("li")
      .siblings("li")
      .children("ul")
      .slideUp(400, function () {
        $(this).removeAttr("style");
      });

    $(this)
      .parent("li")
      .siblings("li")
      .find(".fa")
      .removeClass("fa-caret-up")
      .addClass("fa-caret-down");

    $(this).parent("li").children("ul").slideToggle();
    $(this).children().toggleClass("fa-caret-up").toggleClass("fa-caret-down");
  });

  // Basic functionality for nav_toggle

  var hamburger = $(".hamburger");
  // hamburger.each(function(){
  // $(this).click(function(){
  // $(this).toggleClass("is-active");
  // });
  // });

  hamburger.click(function () {
    primary_menu.addClass("toggle_right_style");
    $(".toggle_right_nav").addClass("toggle_right_cont");
    $(".nav_toggle_button").toggleClass("active");
    $(".hamburger").toggleClass("is-active");
    $("body").addClass("active");
  });

  $(".toggle_nav_close, .menu_slide_right .hamburger").click(function () {
    primary_menu.removeClass("toggle_right_style");
    secondary_menu.removeAttr("style");
    toggle_secondary_button
      .children()
      .removeClass("fa-caret-up")
      .addClass("fa-caret-down");
    $(".toggle_right_nav").removeClass("toggle_right_cont");
    $(".nav_toggle_button").removeClass("active");
    $(".hamburger").removeClass("is-active");
    $("body").removeClass("active");
  });

  // Swap Elements
  function swap_this() {
    if (window_width <= 800) {
      $(".main_logo").insertAfter(".logo_wrap");
      $("#nav_area").insertBefore("header");
    } else {
      $(".main_logo").insertBefore(".head_info");
      $("#nav_area").insertAfter("header");
    }

    // nav is above the logo
    // if(window_width <= 800){
    //     $('.main_logo').insertAfter('.logo_wrap');
    //     $('#nav_area').insertBefore('header');
    // } else if (window_width <= 1000 && window_width > 800) {
    //     $('.main_logo').insertBefore('.head_info');
    //     $('#nav_area').insertAfter('header');
    // } else {
    //     $('.main_logo').insertBefore('.head_info');
    //     $('#nav_area').insertBefore('header');
    // }


    // nav below/under banner
    // if (window_width <= 800) {
    //   $(".main_logo").insertAfter(".logo_wrap");
    //   $("#nav_area").insertBefore("header");
    // } else if (window_width <= 1000 && window_width > 800) {
    //   $('.main_logo').insertBefore('.head_info');
    //   $('#nav_area').insertAfter('header');
    // }
    // else {
    //   $("#nav_area").insertAfter("#banner");
    //   $('.main_logo').insertBefore('.head_info');
    // }


    //for copyright always at the bottom part
  
    // if (window_width <= 1000) {
    //   $(".copyright_holder").append($(".copyright"));
    // } else {
    //   $(".copyright").insertAfter(".footer_logo");
    // } 

  }

  swap_this();

  // Reset all configs when width > 800
  $(window).resize(function () {
    window_width = $(this).width();

    swap_this();

    if (window_width > 800) {
      $(".nav_toggle_button").removeClass("active");
      $(".hamburger").removeClass("is-active");
      primary_menu.removeClass("toggle_right_style");
      $(".toggle_right_nav").removeClass("toggle_right_cont");
      $("body").removeClass("active");
    } else {
      secondary_menu.removeAttr("style");
      toggle_secondary_button
        .children()
        .removeClass("fa-caret-up")
        .addClass("fa-caret-down");
    }
  });

  $(".rslides").responsiveSlides();
  // $(".box_skitter_large").skitter();

  $(".back_top").click(function () {
    // back to top
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      900
    );
    return false;
  });

  $(window).scroll(function () {
    // fade in fade out button
    var windowScroll = $(this).scrollTop();

    if (windowScroll > webHeight * 0.5 && window_width <= 600) {
      $(".back_top").fadeIn();
    } else {
      $(".back_top").fadeOut();
    }

    // For (AddThis) Plugins
    if ($("body #at-share-dock").hasClass("at-share-dock")) {
      $(".back_top").addClass("withAddThis_plugins");
      $(".footer_btm").addClass("withAddThis_ftr_btm");
    } else {
      $(".back_top").removeClass("withAddThis_plugins");
      $(".footer_btm").removeClass("withAddThis_ftr_btm");
    }
    // End (AddThis) Plugins

    // for fixed background
    if ($('.bottom_footer_bg').length >= 1) {
      var fixbtm = $('.bottom_footer_bg').offset().top;
      if (fixbtm <= windowScroll && window_width > 1024){
          $(".bottom_footer_bg").css({
              'background-attachment' : 'fixed',
              'background-position' : 'center top'
          });
      } else {
              $(".bottom_footer_bg").css({
              'background-attachment' : 'unset',
              'background-position' : 'center top'
              });
          }
      }

    
    //-----parallax code----

    // $('.slider').css('top', windowScroll * .45);
    $('.slider').css('top', -20 - (windowScroll * -.23) + "px");

    //-----end parallax code----

  });

  // Testimonial
  $("#commentform").click(function () {
    if ($("#author").val() == "") {
      $("#author").addClass("testimonialreq");
    } else {
      $("#author").removeClass("testimonialreq");
    }

    if ($("#email").val() == "") {
      $("#email").addClass("testimonialreq");
    } else {
      $("#email").removeClass("testimonialreq");
    }

    if ($("#comment").val() == "") {
      $("#comment").addClass("testimonialreq");
    } else {
      $("#comment").removeClass("testimonialreq");
    }
  });

  // for skitter 

  // $('.box_skitter_large').skitter({
  //   theme: 'square',
  //   numbers_align: 'center',
  //   progressbar: false,
  //   navigation: false,
  //   numbers: false,
  //   dots:false, 
  //   preview: false,
  //   interval: 4000
  // });



  //---scroll fixed code---

  // if (windowScroll > 45 && window_width >= 1025){
  // 	$('.header_holder').addClass('fixedholder');
  // } else {
  // 	$('.header_holder').removeClass('fixedholder');
  // }

  // if (windowScroll > 45 && window_width >= 1025){
  // 	$('.page_nav').addClass('fixed_nav');
  // } else {
  // 	$('.page_nav').removeClass('fixed_nav');
  // }

  // ---end scroll fixed code---

  //----Parallax Fixed---

  //   if ($("targetClass").length >= 1 && window_width >= 1025) {
  //     let targetClassDistanceFromTop = $("targetClass").offset().top;
  //     if (targetClassDistanceFromTop <= windowScroll) {
  //       $(".targetClassForFixed").addClass("fixedClass");
  //     } else {
  //       $(".targetClassForFixed").removeClass("fixedClass");
  //     }
  //   }
  // });

  // end----Parallax Fixed---

  // -----For FAQ----

  // $(".faq h6").click(function () {
  //   $(this).next().slideToggle().siblings(".faq div").slideUp();
  //   //toggle sign
  //   $(this).toggleClass("sign").siblings(".faq h6").removeClass();
  // });

  // -----END FAQ----

  // ------Carousel--------

  // $(".owl-carousel").owlCarousel({
  // 	items: 3,
  // 	nav: true,
  // 	dots: false,
  // 	loop: true,
  // 	margin:0,
  // 	responsive : {
  // 	291 : {
  // 		items:1
  // 	},
  // 	751 : {
  // 		items:2
  // 	},
  // 	1011 : {
  // 		items:3
  // 	}
  // }
  // });

  // -------- END Carousel --------

  // ------------- Testimonial CODE -------------
  // COMMENTS STYLE PLUGIN //

  //$('.commentlist li:last-child').css('background','none');
  //$('.commentlist li ul li').css('background','none');
  //$('.commentlist li ul li:last-child').css('border-bottom','none');

  // ----------- END Testimonial  -----------

  //--- POP UP JS ----

  //$('.close').click (function(){
  //$('.pop_cont').hide();
  //});

  //--- END POP UP JS  ----

  
      //For forms label color 
      //   // Form Fields Custom Placeholder Behavior
      //   $('#submit_formmessage input').blur(function(){
      //     var formLabel = $(this).siblings('label');
      //     if( $(this).val() ){
      //         formLabel.hide();
      //     } else{
      //         formLabel.show();
      //     }
      //   });
      // $('#submit_formmessage textarea').blur(function(){
      //       var formLabel = $(this).siblings('label');
      //       if( $(this).val() ){
      //           formLabel.hide();
      //       } else{
      //           formLabel.show();
      //       }
      //   });
     
      // // Empty Form Fields on Load/Reload
      //   var formInput = $('#send_message_form input');
      //   var formMessage = $('#send_message_form textarea');
      //   formInput.val('');
      //   formMessage.val('');

      
//---------------------- START OF CODE (FORM ACTIVATION) -------------------------------//
			$("#submit_formmessage .form_email").change(function(){
				validateEmail();
			});
			$('#submit_formmessage .form_btn').on('click', function(){
				if ($('#submit_formmessage .form_fullname').val() == '') {
					$('#submit_formmessage .form_fullname').addClass( "FormReq" );
				}else{
					$('#submit_formmessage .form_fullname').removeClass( "FormReq" );
				}
				if ($('#submit_formmessage .form_email').val() == '') {
					$('#submit_formmessage .form_email').addClass( "FormReq" );
				}else{
					validateEmail();
				}
				if(grecaptcha.getResponse() == "") {
					var $recaptcha = document.querySelector('#g-recaptcha-response');
						$recaptcha.setAttribute("required", "required");
						$('.g-recaptcha iframe').addClass('FormReq').attr('id','recaptcha');
				}
			});	

			// FOR EMAIL VALIDATOR
			function validateEmail(){
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
					var email = $('#submit_formmessage .form_email').val();
					if( !emailReg.test( email ) ) {
					  $('#submit_formmessage .form_email').addClass( "FormReq" );
					  $('#invalid-msg').show();
					  $('#invalid-msg').html('Please enter a valid email address.');
					} else {
					  $('#submit_formmessage .form_email').removeClass( "FormReq" );
					  $('#invalid-msg').hide();
					}
			}

			// FOR PROMPT POP-UP MESSAGE
			$('#success .close').click(function () {
				$('#success').fadeOut();
				$('#recaptcha-error').fadeOut();
			});
		   
			$('.rclose').click(function () {
				$('#recaptcha-error').fadeOut();
			});
		   
			$('#error-msg .error-close').click(function () {
				$('#error-msg').fadeOut();
			});

			//---------------------- END OF CODE (FORM ACTIVATION -------------------------------//

});
