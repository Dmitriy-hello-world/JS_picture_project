import { getResourse } from "../requests/requests";
const showMoreCards = (trigger, selector) => {

    const wrapper = document.querySelector(selector), 
          btn = document.querySelector(trigger);

    function cteateCards(resolve) {
        resolve.forEach( ({src,title,link}) => {
            const card = document.createElement('div');

            card.classList.add('animated' , 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');

            card.innerHTML = `
                <div class=styles-block>
                    <img src="${src}" alt="photo">
                    <h4>${title}</h4>
                    <a href=${link}">Подробнее</a>
                </div>
            `;

            wrapper.appendChild(card);
        });
    }

    function createError() {
        const err = document.createElement('div');
            err.style.textAlign = 'center';
            err.style.color = 'red';
            err.style.fontSize = '16px';
            err.textContent = 'Упр, сервер временно недоступен, попробуйте повторить ваши действия немного позже';
            wrapper.appendChild(err);
        setTimeout( () => {
            err.remove();
        }, 3000);
    }

    btn.addEventListener('click', function() {
        getResourse('http://localhost:3000/styles')
        .then(resolve => {
            cteateCards(resolve);
            this.remove();
        })
        .catch(e => {
            createError();
        });
    });

};

export default showMoreCards;