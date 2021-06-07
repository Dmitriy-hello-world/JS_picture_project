import getScrollSize from './scroll';

const modal = () => {

    function bindModal(modalTriggerSelector,modalSelector, closeCroseSelector, canClose = true) {
        const triggers = document.querySelectorAll(modalTriggerSelector),
              modal = document.querySelector(modalSelector),
              crose = document.querySelector(closeCroseSelector),
              popups = document.querySelectorAll('[data-modal]'),
              scroll = getScrollSize(); //dependencies 

        //Here We create function, whitch can open modal and close other modals
        //Also this func check if any modals are open
        function showModal(e) {
            if (e.target) {
                let display;

                e.preventDefault();

                document.querySelectorAll('[data-popup]').forEach(item => {
                    if (window.getComputedStyle(item).display == 'block') {
                        display = 'display';
                    }
                }); 

                if (!display) {
                    popups.forEach(item => {
                        item.style.display = 'none';
                    });
    
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
                showModal(e);
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

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation' , '.popup-consultation' , '.popup-consultation .popup-close');

    //in some seconds will appear modal window
    const timer = setTimeout(() => {

        document.querySelector('.popup-consultation').style.display = 'block';
        document.body.style.overflow = 'hidden';

    }, 1000 * 60);

};

export default modal;