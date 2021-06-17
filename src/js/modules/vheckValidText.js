const textChecked = (selector) => {

    const textInputs = document.querySelectorAll(selector);

    textInputs.forEach( item => {
        item.addEventListener('keypress', e => {
            if (e.key.match(/[^а-яё 0-9]/ig)) {
                e.preventDefault();
                item.value = ''; 
            } else {
                item.value = item.value;
            }
        });
    });
};

export default textChecked;