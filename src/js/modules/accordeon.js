const accordeon = (triggerSelector,blocksSelector) => {
    const triggers = document.querySelectorAll(triggerSelector),
          blocks = document.querySelectorAll(blocksSelector);

    blocks.forEach( item => {
        item.style.display = 'none';
        item.classList.add('animated', 'fadeInDown');
    });

    triggers.forEach(item => {
        item.addEventListener('click', function() {

            blocks.forEach( item => {
                item.style.display = 'none';
            });

            triggers.forEach( item => { 
                if ( item != this) {
                    item.classList.remove('active-style');
                }
            });

            if (this.classList.contains('active-style')) {
                this.classList.remove('active-style');
                this.parentNode.nextElementSibling.style.display = 'none';
            } else {
                this.classList.add('active-style');
                this.parentNode.nextElementSibling.style.display = 'block';
            }
        });
    });
};

export default accordeon;