$(document).ready(function() {
    // Плавная прокрутка для навигационных ссылок
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 1000);
        }
    });

    // Добавление активного класса к текущему пункту навигации
    const currentLocation = location.pathname;
    $('.main-nav a').each(function() {
        const linkPath = $(this).attr('href');
        if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
            $(this).addClass('active');
        } else if (currentLocation.endsWith('/') && linkPath === 'index.html') {
            $(this).addClass('active');
        }
    });

    // Анимация карточек функций при прокрутке
    function animateOnScroll() {
        $('.feature-card').each(function() {
            const cardPosition = $(this).offset().top;
            const scrollPosition = $(window).scrollTop();
            const windowHeight = $(window).height();

            if (scrollPosition + windowHeight > cardPosition + 100) {
                $(this).addClass('animate');
            }
        });
    }

    // Начальная проверка анимаций
    animateOnScroll();

    // Проверка анимаций при прокрутке
    $(window).scroll(function() {
        animateOnScroll();
    });

    // Обработка клика по кнопке CTA
    $('.cta-button').on('click', function() {
        window.location.href = 'blog.html';
    });
});

// Слайдер в секции героя
document.addEventListener('DOMContentLoaded', function() {
    const slider = {
        currentSlide: 0,
        slides: document.querySelectorAll('.hero-slide'),
        dotsContainer: document.querySelector('.slider-dots'),
        init: function() {
            // Создание точек
            this.slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(index));
                this.dotsContainer.appendChild(dot);
            });

            // Добавление управления стрелками
            document.querySelector('.slider-arrow.prev').addEventListener('click', () => this.prevSlide());
            document.querySelector('.slider-arrow.next').addEventListener('click', () => this.nextSlide());

            // Запуск автопрокрутки
            this.startAutoplay();
        },
        goToSlide: function(index) {
            // Удаление активного класса с текущего слайда и точки
            this.slides[this.currentSlide].classList.remove('active');
            this.dotsContainer.children[this.currentSlide].classList.remove('active');

            // Обновление текущего слайда
            this.currentSlide = index;

            // Добавление активного класса к новому слайду и точке
            this.slides[this.currentSlide].classList.add('active');
            this.dotsContainer.children[this.currentSlide].classList.add('active');
        },
        nextSlide: function() {
            const next = (this.currentSlide + 1) % this.slides.length;
            this.goToSlide(next);
        },
        prevSlide: function() {
            const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.goToSlide(prev);
        },
        startAutoplay: function() {
            setInterval(() => this.nextSlide(), 5000); // Смена слайда каждые 5 секунд
        }
    };

    // Инициализация слайдера
    slider.init();
});
