import { getResourse } from "../requests/requests";

const calc = (size,material,options,promocode,price) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionBlock = document.querySelector(options),
          promoBlock = document.querySelector(promocode),
          priceBlock = document.querySelector(price);

    let sum = 0,
        sizePrice = false,
        materialPrice = false,
        optionPrice = false;

    function calcPrice() {

        sum = (+sizePrice) * (+materialPrice) + (+optionPrice);

        if (+sizePrice == false || +materialPrice == false) {
            priceBlock.textContent = 'Пожалуйста выберите все нужные параметры';
        } else {
            if (promoBlock.value === 'IWANTPOPART') {
                sum = Math.floor(((+sizePrice) * (+materialPrice) + (+optionPrice)) * 0.7) ;
            }
            priceBlock.textContent = sum;
        }
    }

    function promo() {
        promoBlock.addEventListener('input', () => {
            if (promoBlock.value === 'IWANTPOPART') {
                sum = Math.floor(((+sizePrice) * (+materialPrice) + (+optionPrice)) * 0.7) ;
            }
            priceBlock.textContent = sum;
        });
    }
    promo();

    function getPrice(select) {
        select.addEventListener('change', function(){
            getResourse('http://localhost:3000/sells')
            .then( resolve => {
                resolve.forEach( (obj,i) => {
                    for (let key in obj) {
                        if (key === select.value) {
                            if ( i == 0) {
                                sizePrice = obj[key];
                                break;
                            } else if (i == 1) {
                                materialPrice = obj[key];
                                break;
                            } else if ( i == 2) {
                                optionPrice = obj[key];
                                break;
                            }
                        }
                    }
                });
            })
            .then( res => {
                calcPrice();
            });

        });
    }

    getPrice(sizeBlock);
    getPrice(materialBlock);
    getPrice(optionBlock);

};

export default calc;