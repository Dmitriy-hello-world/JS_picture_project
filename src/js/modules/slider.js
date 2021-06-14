const slider = (slidesSelector, arrowRight, arrowLeft, direction ) => {
    let slideIndex = 1,
        paused;

    const slides = document.querySelectorAll(slidesSelector);
    
    function showIndexSlide(index) {
        if (index > slides.length) {
            slideIndex = 1;
        }

        if (index < 1) {
            slideIndex = slides.length;
        }

        slides.forEach( item => {
            item.style.display = 'none';
            item.classList.add('animated');
        });

        slides[slideIndex - 1].style.display = 'block';
    }

    showIndexSlide();

    function plusSlide(n) {
        showIndexSlide(slideIndex += n);
    }

    try {
        const right = document.querySelector(arrowRight),
              left = document.querySelector(arrowLeft);

        right.addEventListener('click', () => {
            plusSlide(1);

            slides[slideIndex - 1].classList.remove('fadeInLeft');
            slides[slideIndex - 1].classList.add('fadeInRight');
        });      

        left.addEventListener('click', () => {
            plusSlide(-1);

            slides[slideIndex - 1].classList.remove('fadeInRight');
            slides[slideIndex - 1].classList.add('fadeInLeft');
        });

    } catch(e) {}

    function showAnimated() {
        if (direction === 'vertical') {
            paused = setInterval(() => {
                plusSlide(1);

                slides[slideIndex - 1].classList.add('fadeInUp');
            }, 4000);
        } else {
            paused = setInterval(() => {
                plusSlide(1);

                slides[slideIndex - 1].classList.remove('fadeInLeft');
                slides[slideIndex - 1].classList.add('fadeInRight');
            }, 4000);
        }
    }

    showAnimated();

    slides[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });

    slides[0].parentNode.addEventListener('mouseleave', () => {
        showAnimated();
    });
};

export default slider;