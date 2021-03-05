var element = document.getElementById('a-from__phone-inp');
var maskOptions = {
  mask: '+{7} (000) 000-00-00'
};
var mask = IMask(element, maskOptions);

var element2 = document.getElementById('a-from__time-inp');
var maskOptionsTwo = {
  mask: '00:00'
};


var element3 = document.querySelector('.pop__phone');
var maskOptions3 = {
  mask: '+{7} (000) 000-00-00'
};
var mask = IMask(element3, maskOptions3);

var $page = $('html, body');
$('a[href*="#"]').click(function() {
    $page.animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 400);
    return false;
});

//var maskTwo = IMask(element2, maskOptionsTwo);

ymaps.ready(initFooterMap);

function initFooterMap(){
    var myMap = new ymaps.Map('footer-map', {
        center: [55.763713, 37.520211],
        zoom: 12,
        controls: []
    });

    var myPlacemark = new ymaps.Placemark([55.770081, 37.605104], {
      balloonContent: 'Телефон: <a href="tel:89295238752" style="color: #59B130;">8 (929) 523-87-52</a>',
      iconCaption: 'Clever - уборка квартир и домов!'
    }, {
      preset: 'islands#greenIcon',
    });

  myMap.geoObjects.add(myPlacemark); 
}

$(document).ready(function() {
	$('.image-popup-vertical-fit').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-img-mobile',
		image: {
			verticalFit: true
		}		
	});	
	$('.special-slider').slick({
		// autoplay: true,
		autoplaySpeed: 2000,
		slidesToShow: 1,
        slidesToScroll: 1,               
        dots:true,
		arrows:true,
		prevArrow: '<button class="slider-button slider-button_prev"></button>',
		nextArrow: '<button class="slider-button slider-button_next"></button>',
        infinite: true, 
		variableWidth: false,  
		adaptiveHeight: false,
        focusOnSelect: false,
        speed: 300,
        useTransform: true,
        draggable: true,
    });
	$('.assortment__block').slick({
		autoplay: true,
		autoplaySpeed: 2000,
		slidesToShow: 4,
		slidesToScroll: 4,               
		dots:true,
		arrows:true,
		prevArrow: '<button class="slider-button slider-button_prev"></button>',
		nextArrow: '<button class="slider-button slider-button_next"></button>',
		infinite: true, 
		variableWidth: false,  
		adaptiveHeight: true,
		focusOnSelect: false,
		speed: 1000,
		useTransform: true,
		draggable: true,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 768,
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
});

let screen = window.matchMedia("(max-width:992px)");
if (screen.matches){
	$('.fiv').removeClass('active-image');
	$('.ss').addClass('view');
}else{
  
}

const burger = document.querySelector('.burger');
const headerList = document.querySelector('.header__list');
const galleryBtn  = document.querySelector('.gallery__btn');
const imageNone = document.querySelectorAll('.image-none');
const galleryWrapper = document.querySelectorAll('.gallery__wrapper');

var $page = $('html, body');
$('a[href*="#footer"]').click(function() {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 400);
    return false;
});

$('a[href*="#jetapy"]').click(function() {
	$page.animate({
			scrollTop: $($.attr(this, 'href')).offset().top
	}, 400);
	return false;
});
$('a[href*="#price"]').click(function() {
	$page.animate({
			scrollTop: $($.attr(this, 'href')).offset().top
	}, 400);
	return false;
});
$('a[href*="#portfolio"]').click(function() {
	$page.animate({
			scrollTop: $($.attr(this, 'href')).offset().top
	}, 400);
	return false;
});

$(document).ready(function(){
	function getModalTitle(text, html) {
		if (html) {
			return 'Почистить <span>' + text + '</span>';
		} else {
			return 'Почистить ' + text;
		}
	}

	function addModalTitle(modal, t) {
	    var title = '';
	    
	    if (t) {
	        title = getModalTitle(t, true);
	    } else {
	        title = '<span>Заявка на химчиску</span>';
	    }
		var html = '<div class="modal-buy__title"><p>' + title + '</p></div>';

		modal.find('form').prepend(html),
		t && modal.find('input[name=a-from__type-inp]').val(getModalTitle(t, false));
	}

	$('.gallery__btn').click(function(){
		$('.view').toggleClass('active-image');
	});

	$('[data-open-modal]').on('click', function(e) {
		e.preventDefault();
		
		var t = $(this).closest('.assortment__wrapper').find('.assortment__title').text()
		  , modal = $('.modal');

		  
		addModalTitle(modal, t ? t : '');
		modal.addClass('open');
	});

	function closeModal() {
		let modal = $('.modal')
		  , title = modal.find('.modal-buy__title');
		  
		modal.removeClass('open');

		title && setTimeout(function() {
			title.remove();
		}, 200);
		
		$('input[name=a-from__type-inp]').val('');
	}

	$('[data-close-modal]').on('click', function(e) {
		closeModal();
	});

	function sendForm(e) {
		if (!e || !e.length)
		  return !1;
		  
		$.ajax({
			url: '/himchistka/send.php',
			type: 'POST',
			data: e.find('input, select, textarea'),
			success: function (response) {
			  new alertTop('Сообщение успешно отправлено!').show();
			}, 
			error: function(e, t, r) {
			  console.log(r + "\r\n" + e.statusText + "\r\n" + e.responseText)
			}
		});
	  }

	function validateForm(form) {
		var inputs = form.find('.a-from__inp')
		  , errors = 0;
	
		form.find('input').removeClass('has-error');

		if (!inputs.length) {
			inputs = form.find('.pop__input');
		}
		
		for (var i = 0; i < inputs.length; i++) {
		  var input = $(inputs[i]);
	
		  if (input.attr('name') == 'a-from__phone-inp' || input.attr('name') == 'pop__phone') {
			if (input.val() < 15) {
			  input.addClass('has-error');
			  errors++;
			}
		  } else {
			if (input.val() < 1) {
			  input.addClass('has-error');
			  errors++;
			}
		  }
	
		}
	
		if (!errors) {
		  return true;
		}
	
		return false;
	  }
	
	  $('[data-send-form]').on('click', function(e) {
		e.preventDefault();
	
		var form = $(this).closest('form');
		var validate = validateForm(form);
	
		if (validate) {
		  sendForm(form);

		  if ($('.modal').is('.open')) {
			closeModal();
		  }
		}
	  });
});

function alertTop(e) {
	this.show = function() {
		$('alert').remove(),
		$('body').append('<div class="alert alert-success"><p>' + e + "</p></div>"),
		setTimeout(function() {
			$('.alert').addClass('show')
		}, 20),
		setTimeout(function() {
			t()
		}, 2e3)
	},
	this.hide = function() {
		$('.alert').removeClass('show'),
		setTimeout(function() {
			$('.alert').remove()
		}, 200)
	};
	var t = this.hide
  }


const openMenu = () => {
  burger.classList.toggle('active-burger');
  headerList.classList.toggle('active-headerList');
}




burger.addEventListener('click', openMenu);



