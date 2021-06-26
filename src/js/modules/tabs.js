const tabs = () => {

    const menu = document.querySelector('.portfolio-menu'),
          menuLi = menu.querySelectorAll('li'),
          contentAll = document.querySelectorAll('.portfolio-wrapper .all'),
          no = document.querySelector('.portfolio-no');

    function mainFilter(contents) {
        contentAll.forEach( item => {
            item.style.display = 'none';
            item.classList.remove('animated','fadeIn');
        });

        no.style.display = 'none';
        no.classList.remove('animated','fadeIn');

        if (contents) {
            contents.forEach( item => {
                item.style.display = 'block';
                item.classList.add('animated','fadeIn');
            });
        } else {
            no.style.display = 'block';
            no.classList.add('animated','fadeIn');
        }
    }

    function bindEvent(triggerSelector,contentSelector) {
        menu.querySelector(triggerSelector).addEventListener('click', () => {
            const content = document.querySelectorAll(contentSelector);

            if (content.length >= 1) {
                mainFilter(content);
            } else {
                mainFilter();
            }
        });
    }

    menu.addEventListener('click', e => {
        let target = e.target;

        if (target && target.nodeName == 'LI') {
            menuLi.forEach( li => {
                li.classList.remove('active');

                if(target == li) {
                    li.classList.add('active');
                }
            });
        }
    });

    bindEvent('.all','.portfolio-wrapper .all');
    bindEvent('.lovers','.portfolio-wrapper .lovers');
    bindEvent('.chef','.portfolio-wrapper .chef');
    bindEvent('.girl','.portfolio-wrapper .girl');
    bindEvent('.guy','.portfolio-wrapper .guy');
    bindEvent('.grandmother','.portfolio-wrapper .grandmother');
    bindEvent('.granddad','.portfolio-wrapper .granddad');
};

export default tabs;