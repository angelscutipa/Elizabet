$(document).ready(function () {
    // Al cargar la página, ocultamos las cortinas
    $('.left-curtain').css('width', '0%');
    $('.right-curtain').css('width', '0%');

    $('.valentines-day').click(function () {
        var audio = new Audio('fondo.mp3');
        audio.play();
        // Animación de desvanecimiento de los elementos del sobre
        $('.envelope').css({ 'animation': 'fall 3s linear 1', '-webkit-animation': 'fall 3s linear 1' });
        $('.envelope').fadeOut(800, function () {
            // Ocultar elementos dentro de .valentines-day
            $('.valentines-day .heart, .valentines-day .text, .valentines-day .front').hide();


            // Hacer visible la carta con una animación ondulante
            $('#card').css({ 'visibility': 'visible', 'opacity': 0, 'transform': 'scale(0.1)' });
            $('#card').animate({ 'opacity': 1 }, {
                duration: 1000, step: function (now, fx) {
                    var scale = 1 + Math.sin(now * Math.PI) * 0.1; // Calculamos la escala basada en la función seno
                    $(this).css('transform', 'scale(' + scale + ')');
                }
            }); // Animación de ondulación
        });
    });
});

window.onload = function () {
    var images = ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg'];
    var currentImageIndex = 0;

    function loadImage() {
        var image = new Image();
        image.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            var context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);
            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            var data = imageData.data;
            for (var i = 0; i < data.length; i += 4) {
                var avg = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
                data[i] = avg * 0.5; // red
                data[i + 1] = avg * 0.5; // green
                data[i + 2] = avg * 0.5; // blue
            }
            context.putImageData(imageData, 0, 0);
            document.body.style.backgroundImage = 'url(' + canvas.toDataURL() + ')';
            currentImageIndex = (currentImageIndex + 1) % images.length;
        };
        image.src = images[currentImageIndex];
    }

    loadImage(); // Load the first image

    setInterval(loadImage, 4000); // Change image every 4 seconds
};

