
(function ($) {
	"use strict";

     // Lenis Scroll Js
	const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);
	gsap.ticker.add(time => {
		lenis.raf(time * 1000);
	});
	gsap.ticker.lagSmoothing(0);

	

	  $(document).ready(function ($) {

		var lastScrollTop = 0;
        $(window).scroll(function () {
			var scroll = $(window).scrollTop();

			if (scroll > 300) {
				$(".aw-header-area.header-absolute").addClass("header-2 header-sticky sticky");
				$(".aw-header-area.header-absolute").removeClass("sticky-out");
			} else if (scroll < lastScrollTop) {
				if (scroll < 500) {
					$(".aw-header-area.header-absolute").addClass("sticky-out");
					$(".aw-header-area.header-absolute").removeClass("header-2 header-sticky sticky");
				}
			} else {
				$(".aw-header-area.header-absolute").removeClass("sticky");
			}

			lastScrollTop = scroll;

		});

        
		$("#headerMenu").meanmenu({
			meanMenuContainer: ".mobile-menu",
			meanScreenWidth: "991",
			meanExpand: [
				"<i class='fa-light fa-plus'></i> <i class='fa-light fa-minus'></i>",
			],
		});

		$(".menu-bar").on("click", function () {
			$(".menu-bar").toggleClass("menu-bar-toggeled");
			$(".mobile-menu").toggleClass("opened");
			$("body").toggleClass("overflow-hidden");
		});

		$(".mobile-menu ul li a")
			.not(".mean-expand")
			.on("click", function () {
				$(".menu-bar").removeClass("menu-bar-toggeled");
				$(".mobile-menu").removeClass("opened");
				$("body").removeClass("overflow-hidden");
			});
	
	});


    $(document).ready(function ($) {
       
		var wow = new WOW({
			boxClass: "wow", // default
			animateClass: "animated", // default
			offset: 100, // default
			mobile: true, // default
			live: true, // default
		});
		wow.init();
 
	});

	

	gsap.registerPlugin(ScrollTrigger);


	let profile = document.querySelector('.profile');
	let menu = document.querySelector('.profile-area');
	
	profile.onclick = function () {
		menu.classList.toggle('active');
	}

  


	
})(jQuery);