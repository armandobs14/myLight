(function($) {
	$.fn.extend({
		myLight : function(options) {// construtor do plugin
			var _counter = 0;
			var _alvo = 0;

			var myLightPlugin = {
				condig : {
					close : "close.png",
					loading : ""
				},
				images : Array(),
				loadFb : function() {
					var cache = jQuery.ajaxSettings.cache;
					jQuery.ajaxSettings.cache = true;
					// Load FeatureLoader asynchronously. Once loaded, we execute Facebook init

					$.getScript('http://connect.facebook.net/de_DE/all.js', function() {
						FB.init({
							status : true,
							cookie : true,
							xfbml : true
						});
					});
					// just Restore jQuery caching setting
					$.ajaxSettings.cache = cache;
				},
				
				draw : function(id) {
					var tmpImage = $('<img src="' + myLightPlugin.images[id].imgSrc + '" />');

					if (id == 0) {
						$('#myLight_prev').fadeOut();
					} else if (id == _counter - 1) {
						$('#myLight_next').fadeOut();
					}

					$('#myLight_image').fadeOut(function() {
						$('#myLight_image').attr('src', myLightPlugin.images[id].imgSrc);
					});
					var _imageSrc = myLightPlugin.images[id].imgSrc, _maxWidth = 940, _w, _h;

					if ($(tmpImage)[0].width < _maxWidth) {
						_w = $(tmpImage)[0].width;
						_h = $(tmpImage)[0].height;
					} else {
						_w = _maxWidth;
						_h = ($(tmpImage)[0].height * _maxWidth) / $(tmpImage)[0].width;
					}

					console.log('{id:' + id + ', width:' + _w + ', height:' + _h + ' }');
					var _navbarOffset = 60;
					// metade do tamanho do font-size do navbar
					
					$('#myLight_socialContainer').html('');			
					$('#myLight_bottomContainer').html('');			
					$('#myLight_socialContainer').append('<div><fb:like id="fbl" send="true" href="'+myLightPlugin.images[id].imgSrc+'" data-send="true" data-layout="button_count" data-width="70" data-show-faces="false" data-font="verdana"/></div>');
					$('#myLight_bottomContainer').append('<div><fb:comments data-href="'+myLightPlugin.images[id].imgSrc+'" data-width="'+_w+'" data-num-posts="5" ></fb:comments></div>');
					
					myLightPlugin.loadFb(); //carregando Scripts
					
					$('#myLight_Content').animate({
						'width' : _w,
						'min-height' : _h
					});
					$('.navbar').animate({
						'width' : _w,
						'margin-top' : (_h / 2) - _navbarOffset
					});

					$('#myLight_image').fadeIn();
					$('#myLight_Container').fadeIn();
				}
			}

			//html
			/*
			 <div id="myLight_Container">
			 <div id="myLight_Content">
			 <div id="myLight_close"></div>
			 <div id="myLight_topContainer">
			 <div id="myLight_imageContainer">
			 <div class="navbar" >
			 <a id="myLight_prev">&lsaquo;</a>
			 <a id="myLight_next">&rsaquo;</a>
			 </div>
			 <!--<img src="http://3.bp.blogspot.com/_OZ7ZJnilTQg/SwhNjaBXhCI/AAAAAAAAACY/pJzJ1PdvDK8/s1600/DJ.jpg"/>-->
			 </div>
			 <div id="myLight_socialContainer"></div>
			 </div>
			 <div id="myLight_bottomContainer"></div>
			 </div>
			 </div>
			 * */
			$('body').append('<div id="myLight_Container"><div id="myLight_Content"><div id="myLight_close"></div><div id="myLight_topContainer"><div id="myLight_imageContainer"><div class="navbar" ><a id="myLight_prev">&lsaquo;</a><a id="myLight_next">&rsaquo;</a></div><img id="myLight_image" src=""/></div><div id="myLight_socialContainer"></div></div><div id="myLight_bottomContainer"></div></div></div>');
			$('#myLight_socialContainer').append('<button>Download em alta definição</button>');
			$('#myLight_socialContainer').append('<img src="images/comment.png" id="comment" />');

			$('#myLight_Container').hide();

			$('#myLight_close').click(function() {
				$('#myLight_Container').fadeOut();
			});

			$('#myLight_prev').click(function() {
				if (_alvo > 0) {
					myLightPlugin.draw(--_alvo);
					$('#myLight_next').fadeIn();
				}

			});

			$('#myLight_next').click(function() {
				if (_alvo < _counter - 1) {
					myLightPlugin.draw(++_alvo);
					$('#myLight_prev').fadeIn();

				}
			});

			$.extend(myLightPlugin.config, options);

			return this.each(function() {

				myLightPlugin.images.push({
					imgSrc : $(this).attr('href')
				});

				$(this).data('id', _counter++);

				$(this).click(function(e) {
					e.preventDefault();

					_alvo = $(this).data('id');
					myLightPlugin.draw(_alvo);
				});
			});
		}
	});
})(jQuery);
