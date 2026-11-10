jQuery(document).ready(function ($) {
    // document start


    // Navbar
    $("<span class='clickD'></span>").insertAfter(".navbar-nav li.menu-item-has-children > a");
    $('.navbar-nav li .clickD').click(function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.next().hasClass('show')) {
            $this.next().removeClass('show');
            $this.removeClass('toggled');
        }
        else {
            $this.parent().parent().find('.sub-menu').removeClass('show');
            $this.parent().parent().find('.toggled').removeClass('toggled');
            $this.next().toggleClass('show');
            $this.toggleClass('toggled');
        }
    });

    $(window).on('resize', function () {
        if ($(this).width() < 1025) {
            $('html').click(function () {
                $('.navbar-nav li .clickD').removeClass('toggled');
                $('.toggled').removeClass('toggled');
                $('.sub-menu').removeClass('show');
            });
            $(document).click(function () {
                $('.navbar-nav li .clickD').removeClass('toggled');
                $('.toggled').removeClass('toggled');
                $('.sub-menu').removeClass('show');
            });
            $('.navbar-nav').click(function (e) {
                e.stopPropagation();
            });
        }
    });
    // Navbar end



    /* ===== For menu animation === */
    $(".navbar-toggler").click(function () {
        $(".navbar-toggler").toggleClass("open");
        $(".navbar-toggler .stick").toggleClass("open");
        $('body,html').toggleClass("open-nav");
    });

    // Navbar end


    // Sticky Nav
    /*
        $(window).scroll(function() {     
            var scroll = $(window).scrollTop();     
            if (scroll > 0) { 
                $(".main-head").addClass("fixed"); 
            } 
            else {
            $(".main-head").removeClass("fixed"); 
            }
        })
    */

    // back to top
    if ($("#scroll").length) {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 200) {
                $('#scroll').fadeIn(200);
            } else {
                $('#scroll').fadeOut(200);
            }
        });
        $('#scroll').click(function () {
            $("html, body").animate({ scrollTop: 0 }, 500);
            return false;
        });
    }




    $('.responsive').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
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
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });




    // one page scroll section
    /*
    jQuery(function($){
        var topMenuHeight = $(".main-head").outerHeight();
        $(".navbar-collapse").menuScroll(topMenuHeight);
      });
      
      // COPY THE FOLLOWING FUNCTION INTO ANY SCRIPTS
      jQuery.fn.extend({
          menuScroll: function(offset) {
          // Declare all global variables
              var topMenu = this;
          var topOffset = offset ? offset : 0;
              var menuItems = $(topMenu).find('a[href*="#"]');
              var lastId;
        
          // Save all menu items into scrollItems array
              var scrollItems = $(menuItems).map(function() {
                  var item = $($(this).attr("href"));
                  if (item.length) {
                      return item;
                  }
              });
      
          // When the menu item is clicked, get the #id from the href value, then scroll to the #id element
              $(topMenu).on("click", 'a[href*="#"]', function(e){
                  var href = $(this).attr("href");
                  
                  var offsetTop = href === "#" ? 0 : $(href).offset().top-topOffset;
      
                  $('html, body').stop().animate({ 
                      scrollTop: offsetTop
                  }, 300);
                  e.preventDefault();
      
              });
          
          // When page is scrolled
              $(window).scroll(function(){
                  var nm = $("html").scrollTop();
                  var nw = $("body").scrollTop();
                  var fromTop = (nm > nw ? nm : nw)+topOffset + 10;
      
            
            // When the page pass one #id section, return all passed sections to scrollItems and save them into new array current
                  var current = $(scrollItems).map(function(){
                      if ($(this).offset().top <= fromTop && $(this).offset().top + (this).height() > fromTop)
                      return this;
                  });
            
            // Get the most recent passed section from current array
                  current = current[current.length-1];
                  var id = current && current.length ? current[0].id : "";
                  if (lastId !== id) {
                      lastId = id;
                      // Set/remove active class
                      $(menuItems)
                      .parent().removeClass("current-menu-item")
                      .end().filter("[href='#"+id+"']").parent().addClass("current-menu-item");
                  }      
      
              });
          }
      });
    
    */

    //    var swiper = new Swiper(".scale-bsns-sldr", {
    //         slidesPerView: 3,
    //         spaceBetween: 31,
    //         pagination: false,
    //         navigation: {
    //             nextEl: ".swiper-scale-next",
    //             prevEl: ".swiper-scale-prev",
    //         },
    //         breakpoints: {
    //             0: {
    //             spaceBetween: 16,
    //             },
    //             1400: {
    //             spaceBetween:18,
    //             },
    //             1700: {
    //             spaceBetween: 31,
    //             },
    //         },

    //         });
    //          var swiper = new Swiper(".mySwiper", {
    //   slidesPerView: 3,
    //   spaceBetween: 30,
    //   freeMode: true,
    //   pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true,
    //   },
    // });



          const slides = document.querySelectorAll(".new-landing-wy-chs-item");
        //    var swiper = new Swiper(".scale-bsns-sldr", {
           var swiper = new Swiper(".new-landing-wy-chs-swiper", {
            slidesPerView: "auto",
            loop: true,
            // autoplay: {
            //     delay: 2000,
            //     disableOnInteraction: false,
            // },
             navigation: {
                nextEl: ".swiper-choose-next",
                prevEl: ".swiper-choose-prev",
            },
            breakpoints: {
                0: {
                spaceBetween: 16,
                },
                1400: {
                spaceBetween: 24,
                },
                1700: {
                spaceBetween: 30,
                },
            },
            scrollbar: {
                    el: '.swiper-scrollbar',
                    hide: false,
                    draggable: true,
                },
            
            });

            // Hover behavior (desktop-style)
            slides.forEach((slide) => {
                slide.addEventListener("mouseenter", () => {
                    slides.forEach((s) => s.classList.remove("active-slide"));
                    slide.classList.add("active-slide");
                    swiper.update();
                    // swiper.autoplay.stop();
                });

                slide.addEventListener("mouseleave", () => {
                    slide.classList.remove("active-slide");
                    swiper.update();
                    // swiper.autoplay.start();
                });
            });
           




    // document end

})


