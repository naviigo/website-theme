/* ========================================================================= */
/*	Page Preloader
/* ========================================================================= */
if(window.location.pathname.match("^$|^\\/$|^\\/\\S{2}\\/$")) {
	$(window).on("load", function () {
		$('#preloader').fadeOut('slow', function () {
			$(this).remove();
		});
	});
}
else{
	$('#preloader').hide();
}
(function ($) {
	"use strict";

	/* ========================================================================= */
	/*	Portfolio Filtering Hook
    /* =========================================================================  */
	$('.play-icon i').click(function () {
		var video = '<iframe allowfullscreen src="' + $(this).attr('data-video') + '"></iframe>';
		$(this).replaceWith(video);
	});

	/* ========================================================================= */
	/*	Portfolio Filtering Hook
    /* =========================================================================  */
	setTimeout(function () {
		//var filterizd = $('.filtr-container').filterizr({});
		//Active changer
		$('.filtr-control').on('click', function () {
			$('.filtr-control').removeClass("active");
			$(this).addClass("active");
		});
	}, 500);

	/* ========================================================================= */
	/*	Testimonial Carousel
    /* =========================================================================  */

	//Init the slider
	$('.testimonial-slider').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		infinite: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [{
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 2
			}
		},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});


	/* ========================================================================= */
	/*	Clients Slider Carousel
    /* =========================================================================  */

	//Init the slider
	$('.clients-logo-slider').slick({
		infinite: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 2000,
		slidesToShow: 5,
		slidesToScroll: 1,
	});


	/* ========================================================================= */
	/*	Company Slider Carousel
    /* =========================================================================  */
	$('.company-gallery').slick({
		infinite: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 2000,
		slidesToShow: 5,
		slidesToScroll: 1,
	});


	/* ========================================================================= */
	/*	Awars Counter Js
    /* =========================================================================  */
	$('.counter').each(function () {
		var $this = $(this),
			countTo = $this.attr('data-count');

		$({
			countNum: $this.text()
		}).animate({
				countNum: countTo
			},

			{
				duration: 1500,
				easing: 'linear',
				step: function () {
					$this.text(Math.floor(this.countNum));
				},
				complete: function () {
					$this.text(this.countNum);
					//alert('finished');
				}

			});
	});


	/* ========================================================================= */
	/*   Contact Form Validating
    /* ========================================================================= */


	$('#contact-submit').click(function (e) {

		//stop the form from being submitted
		e.preventDefault();

		/* declare the variables, var error is the variable that we use on the end
        to determine if there was an error or not */
		var error = false;
		var name = $('#name').val();
		var email = $('#email').val();
		var subject = $('#subject').val();
		var message = $('#message').val();

		/* in the next section we do the checking by using VARIABLE.length
        where VARIABLE is the variable we are checking (like name, email),
        length is a JavaScript function to get the number of characters.
        And as you can see if the num of characters is 0 we set the error
        variable to true and show the name_error div with the fadeIn effect.
        if it's not 0 then we fadeOut the div( that's if the div is shown and
        the error is fixed it fadesOut.

        The only difference from these checks is the email checking, we have
        email.indexOf('@') which checks if there is @ in the email input field.
        This JavaScript function will return -1 if no occurrence have been found.*/
		if (name.length == 0) {
			var error = true;
			$('#name').css("border-color", "#D8000C");
		} else {
			$('#name').css("border-color", "#666");
		}
		if (email.length == 0 || email.indexOf('@') == '-1') {
			var error = true;
			$('#email').css("border-color", "#D8000C");
		} else {
			$('#email').css("border-color", "#666");
		}
		if (subject.length == 0) {
			var error = true;
			$('#subject').css("border-color", "#D8000C");
		} else {
			$('#subject').css("border-color", "#666");
		}
		if (message.length == 0) {
			var error = true;
			$('#message').css("border-color", "#D8000C");
		} else {
			$('#message').css("border-color", "#666");
		}

		//now when the validation is done we check if the error variable is false (no errors)
		if (error == false) {
			//disable the submit button to avoid spamming
			//and change the button text to Sending...
			$('#contact-submit').attr({
				'disabled': 'false',
				'value': 'Sending...'
			});

			let posting = $.post({
				url: "https://docs.google.com/forms/d/e/1FAIpQLSfffIRVPy433QSfmOGf74VBrQ5BSGTNoLA2EnNxhMoYpidg_g/" +
					"formResponse?entry.1453226885=" + name + "&" +
					"entry.1086317574=" + email + "&" +
					"entry.993158506=" + subject + "&" +
					"entry.1573115456=" + message,
				data: null,
				dataType: 'jsonp',
				crossDomain: true
			});

			posting.always(function (data) {
				//if the mail is sent remove the submit paragraph
				$('#cf-submit').remove();
				//and show the mail success div with fadeIn
				$('#mail-success').fadeIn(500);
			})
		}
	});
	$('#register-submit').click(function (e) {

		//stop the form from being submitted
		e.preventDefault();

		/* declare the variables, var error is the variable that we use on the end
        to determine if there was an error or not */
		var error = false;
		var email = $('#email').val();

		/* in the next section we do the checking by using VARIABLE.length
        where VARIABLE is the variable we are checking (like name, email),
        length is a JavaScript function to get the number of characters.
        And as you can see if the num of characters is 0 we set the error
        variable to true and show the name_error div with the fadeIn effect.
        if it's not 0 then we fadeOut the div( that's if the div is shown and
        the error is fixed it fadesOut.

        The only difference from these checks is the email checking, we have
        email.indexOf('@') which checks if there is @ in the email input field.
        This JavaScript function will return -1 if no occurrence have been found.*/
		if (email.length == 0 || email.indexOf('@') == '-1') {
			var error = true;
			$('#email').css("border-color", "#D8000C");
		} else {
			$('#email').css("border-color", "#666");
		}

		//now when the validation is done we check if the error variable is false (no errors)
		if (error == false) {
			//disable the submit button to avoid spamming
			//and change the button text to Sending...
			$('#contact-submit').attr({
				'disabled': 'false',
				'value': 'Sending...'
			});

			let posting = $.post({
				url: "https://docs.google.com/forms/d/e/1FAIpQLSfffIRVPy433QSfmOGf74VBrQ5BSGTNoLA2EnNxhMoYpidg_g/" +
					"formResponse?entry.1453226885=" + name + "&" +
					"entry.1086317574=" + email + "&" +
					"entry.993158506=" + subject + "&" +
					"entry.1573115456=" + message,
				data: null,
				dataType: 'jsonp',
				crossDomain: true
			});

			posting.always(function (data) {
				//if the mail is sent remove the submit paragraph
				$('#cf-submit').remove();
				//and show the mail success div with fadeIn
				$('#mail-success').fadeIn(500);
			})
		}
	});

	$('#hideiOS').click(function (e) {
		$('#register').show();
	});
	$('#hideAndroid').click(function (e) {
		$('#register').show();
	});

	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('#header').addClass('header-scrolled');
		} else {
			$('#header').removeClass('header-scrolled');
		}
	});
	document.getElementById('navbar-switcher').addEventListener('click', function(e)
	{
		if ($('#navigation')[0].classList.contains("collapsing")) {
			return;
		}
		if ($('#navigation')[0].classList.contains("show") ) {
			$('#content')[0].classList.remove("no-background");
			$('#header')[0].classList.remove("show");
		}
		else {
			$('#content')[0].classList.add("no-background");
			$('#header')[0].classList.add("show");
		}
	}, false);
})(jQuery);


window.marker = null;


