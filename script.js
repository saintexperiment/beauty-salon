// JavaScript для интерактивности сайта салона красоты

// Мобильное меню
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Закрытие мобильного меню при клике на ссылку
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Наблюдаем за всеми секциями
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Обработка формы записи
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Получаем данные формы
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const phone = contactForm.querySelector('input[type="tel"]').value;
    const service = contactForm.querySelector('select').value;
    const message = contactForm.querySelector('textarea').value;
    
    // В реальном проекте здесь была бы отправка на сервер
    console.log('Форма отправлена:', { name, phone, service, message });
    
    // Показываем сообщение об успехе
    alert('Спасибо за запись! Мы свяжемся с вами в ближайшее время.');
    
    // Очищаем форму
    contactForm.reset();
});

// Изменение навигации при скролле
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('shadow-md');
    } else {
        nav.classList.remove('shadow-md');
    }
    
    lastScroll = currentScroll;
});

// Анимация счётчиков
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.dataset.suffix || '');
        }
    }, 16);
}

// Запуск анимации счётчиков при появлении секции
const statsSection = document.querySelector('#about');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.text-4xl');
            counters.forEach(counter => {
                const text = counter.textContent;
                const number = parseInt(text);
                const suffix = text.replace(/[0-9]/g, '');
                counter.dataset.suffix = suffix;
                animateCounter(counter, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Валидация телефона
const phoneInput = document.querySelector('input[type="tel"]');

phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value[0] === '7' || value[0] === '8') {
            value = value.substring(1);
        }
        
        let formatted = '+7';
        
        if (value.length > 0) {
            formatted += ' (' + value.substring(0, 3);
        }
        if (value.length >= 3) {
            formatted += ') ' + value.substring(3, 6);
        }
        if (value.length >= 6) {
            formatted += '-' + value.substring(6, 8);
        }
        if (value.length >= 8) {
            formatted += '-' + value.substring(8, 10);
        }
        
        e.target.value = formatted;
    }
});

// Добавляем класс для анимации при загрузке страницы
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
