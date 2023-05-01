var swiper = new Swiper('.blog-slider', {
	spaceBetween: 30,
	effect: 'fade',
	loop: true,
	mousewheel: {
		invert: false,
	},
	pagination: {
		el: '.blog-slider__pagination',
		clickable: true,
	}
});

function toggleDarkLight() {
	var body = document.getElementById("body");
	var currentClass = body.className;
	body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
}
$(function() {
	$('a.page-scroll').bind('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1500, 'easeInOutExpo');
		event.preventDefault();
	});
});
$('.navbar-collapse ul li a').click(function() {
	$('.navbar-toggle:visible').click();
});
window.onload = function() {
	var anchors = document.getElementsByTagName('a');
	for (var i = 0; i < anchors.length; i++) {
		anchors[i].setAttribute('target', '_blank');
	}
};
var cursor = {
	delay: 8,
	_x: 0,
	_y: 0,
	endX: (window.innerWidth / 2),
	endY: (window.innerHeight / 2),
	cursorVisible: true,
	cursorEnlarged: false,
	$dot: document.querySelector('.cursor-dot'),
	$outline: document.querySelector('.cursor-dot-outline'),
	init: function() {
		this.dotSize = this.$dot.offsetWidth;
		this.outlineSize = this.$outline.offsetWidth;
		this.setupEventListeners();
		this.animateDotOutline();
	},
	setupEventListeners: function() {
		var self = this;
		document.querySelectorAll('a').forEach(function(el) {
			el.addEventListener('mouseover', function() {
				self.cursorEnlarged = true;
				self.toggleCursorSize();
			});
			el.addEventListener('mouseout', function() {
				self.cursorEnlarged = false;
				self.toggleCursorSize();
			});
		});
		document.addEventListener('mousedown', function() {
			self.cursorEnlarged = true;
			self.toggleCursorSize();
		});
		document.addEventListener('mouseup', function() {
			self.cursorEnlarged = false;
			self.toggleCursorSize();
		});
		document.addEventListener('mousemove', function(e) {
			self.cursorVisible = true;
			self.toggleCursorVisibility();
			self.endX = e.pageX;
			self.endY = e.pageY;
			self.$dot.style.top = self.endY + 'px';
			self.$dot.style.left = self.endX + 'px';
		});
		document.addEventListener('mouseenter', function(e) {
			self.cursorVisible = true;
			self.toggleCursorVisibility();
			self.$dot.style.opacity = 1;
			self.$outline.style.opacity = 1;
		});
		document.addEventListener('mouseleave', function(e) {
			self.cursorVisible = true;
			self.toggleCursorVisibility();
			self.$dot.style.opacity = 0;
			self.$outline.style.opacity = 0;
		});
	},
	animateDotOutline: function() {
		var self = this;
		self._x += (self.endX - self._x) / self.delay;
		self._y += (self.endY - self._y) / self.delay;
		self.$outline.style.top = self._y + 'px';
		self.$outline.style.left = self._x + 'px';
		requestAnimationFrame(this.animateDotOutline.bind(self));
	},
	toggleCursorSize: function() {
		var self = this;
		if (self.cursorEnlarged) {
			self.$dot.style.transform = 'translate(-50%, -50%) scale(0.75)';
			self.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
		} else {
			self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
			self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
		}
	},
	toggleCursorVisibility: function() {
		var self = this;
		if (self.cursorVisible) {
			self.$dot.style.opacity = 1;
			self.$outline.style.opacity = 1;
		} else {
			self.$dot.style.opacity = 0;
			self.$outline.style.opacity = 0;
		}
	}
};
cursor.init();