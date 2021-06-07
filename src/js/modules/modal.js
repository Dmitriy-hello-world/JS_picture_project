import getScrollSize from './scroll';

const modal = () => {
    let anyBtnPress = false;

    function bindModal(modalTriggerSelector,modalSelector, closeCroseSelector, canClose = true, destroy = false) {
        const triggers = document.querySelectorAll(modalTriggerSelector),
              modal = document.querySelector(modalSelector),
              crose = document.querySelector(closeCroseSelector),
              popups = document.querySelectorAll('[data-modal]'),
              scroll = getScrollSize(); //dependencies 

        //Here We create function, whitch can open modal and close other modals
        //Also this func check if any modals are open
        function showModal(e, item) {
            if (e.target) {
                let display;

                e.preventDefault();

                document.querySelectorAll('[data-popup]').forEach(item => {
                    if (window.getComputedStyle(item).display == 'block') {
                        display = 'block';
                    }
                }); 

                if (!display) {
                    popups.forEach(item => {
                        item.style.display = 'none';
                        item.classList.add('animated', 'fadeIn');
                    });

                    anyBtnPress = true;
    
                    if (destroy) {
                        item.remove();
                    }

                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scroll}px`;
    
                    clearTimeout(timer);
                }
            }
        }
        
        //just open modal when user clicked on triggers
        triggers.forEach(item => {
            item.addEventListener('click', e => {
                showModal(e, item);
            });
        });

        //close all modals when user clicked on cross
        crose.addEventListener('click', () => {

            popups.forEach(item => {
                item.style.display = 'none';
            });
            document.body.style.overflow = '';
            document.body.style.marginRight = '0';

        });

        //close all modals when user clicked on substrate or not if 'canClose' is false
        modal.addEventListener('click', e => {
            if(e.target == modal && canClose) {
                popups.forEach(item => {
                    item.style.display = 'none';
                });
                document.body.style.overflow = '';
                document.body.style.marginRight = '0';
            }
        });
    }

    function showModalByScroll(selector) {
        window.addEventListener('scroll', () => {
            if (!anyBtnPress && (window.pageYOffset + document.documentElement.clientHeight >= 
                document.documentElement.scrollHeight)) {
                document.querySelector(selector).click();
            }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation' , '.popup-consultation' , '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true, true);
    showModalByScroll('.fixed-gift');

    //in some seconds will appear modal window
    const timer = setTimeout(() => {

        document.querySelector('.popup-consultation').style.display = 'block';
        document.body.style.overflow = 'hidden';

        let scroll = getScrollSize();
        document.body.style.marginRight = `${scroll}px`;

    }, 1000 * 60);

};

export default modal;