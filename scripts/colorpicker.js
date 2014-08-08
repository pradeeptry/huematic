/* jshint browser: true */
/* global $ */

// Self executing function
var Palette = (function() {
	return function() {
		var self = this;

		self.getColor = function(position, canvas) {
			var imageData = $(canvas).get(0).getContext("2d").getImageData(position[0], position[1], 1, 1).data,
				color = "rgb(" + imageData[0] + "," + imageData[1] + "," + imageData[2] + ")";

			return color;
		};

		self.getPosition = function(event) {
			var $element = $(event.currentTarget),
				startX = event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX,
				startY = event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY,
				posX = startX - $element.offset().left,
				posY = startY - $element.offset().top;

			return [ posX, posY ];
		};

		self.showPicker = function() {
			var $container = $(".picker-container"),
				$picker = $container.find(".picker"),
				$value = $container.find(".color-code"),
				$canvas = $picker.find("canvas"),
				$palettes = $(".palettes"),
				$selected = $palettes.find(".selected"),
				sheet, img, gradient;

			sheet = $canvas.get(0).getContext("2d");
			img = new Image();
			gradient = sheet.createLinearGradient(0, 0, $canvas.width(), 0);

			sheet.canvas.width = $canvas.parent().innerWidth();

			gradient.addColorStop(0,    "rgb(255,   0,   0)");
			gradient.addColorStop(0.15, "rgb(255,   0, 255)");
			gradient.addColorStop(0.33, "rgb(0,     0, 255)");
			gradient.addColorStop(0.49, "rgb(0,   255, 255)");
			gradient.addColorStop(0.67, "rgb(0,   255,   0)");
			gradient.addColorStop(0.84, "rgb(255, 255,   0)");

			sheet.fillStyle = gradient;
			sheet.fillRect(0, 0, sheet.canvas.width, sheet.canvas.height);

			gradient = sheet.createLinearGradient(0, 0, 0, $canvas.height());
			gradient.addColorStop(0,   "rgba(255, 255, 255, 1)");
			gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
			gradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
			gradient.addColorStop(1,   "rgba(0,     0,   0, 1)");

			sheet.fillStyle = gradient;
			sheet.fillRect(0, 0, sheet.canvas.width, sheet.canvas.height);

			$canvas.on("click", function(e) {
				var color = self.getColor(self.getPosition(e), $canvas);
				$value.text(color);
				$selected.css({background: color});
			});
		};

		self.addPalette = function(colors) {
			var $container = $(".palettes"),
				$palette = $("<ul>");

			if (colors instanceof Array) {
				for (var i = 0, l = colors.length; i < l; i++) {
					$("<li>").css({ background: colors[i] }).appendTo($palette);
				}

				$container.append($palette);
			} else {
				return;
			}
		};
	};
}());

var palette = new Palette();

palette.showPicker();