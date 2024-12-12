document.addEventListener("DOMContentLoaded", () => {
    const swiper = new Swiper('.swiper-container', {
        loop: true, // Зацикливание слайдера
        pagination: {
            el: '.swiper-pagination',
            clickable: true, // Возможность клика на точки пагинации
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        slidesPerView: 3,  // Видимые слайды
        spaceBetween: 20, // Расстояние между слайдами
        touchStartPreventDefault: false, // Неф блокировать стандартное поведение
        simulateTouch: true,  // Включить поддержку свайпов
        preventClicks: true, // Предотвращать случайные клики
        preventClicksPropagation: true, // Предотвращать пропагирование событий кликов
        allowTouchMove: true, // Свайп внутри слайдера включен
    });

    // Обработчики для кастомных кнопок
    document.querySelector('#custom-next').addEventListener('click', () => {
        swiper.slideNext();
    });

    document.querySelector('#custom-prev').addEventListener('click', () => {
        swiper.slidePrev();
    });
});