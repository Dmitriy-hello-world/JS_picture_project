const mask = (selector) => {

    function setCursosPossition(pos,el) {
        el.focus();

        el.addEventListener('click', () => {
            el.selectionStart = el.selectionEnd = pos;
        });

        if ( el.setSelectionRange) {
            el.setSelectionRange(pos, pos);
        } else if (el.createTextRange) {
            let range = el.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }

    }

    function setMask(event) {
        let matrix = '+3 (___) ___ ___ __',
            i = 0,
            def = matrix.replace(/\D/ig, ''),
            val = this.value.replace(/\D/ig, '');

        if (val.length <= def.length) {
            val = def;
        }

        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if (event.type === 'blur') {
            if (this.value.length == 2) {
                this.value = '';
            }
        } else {
            setCursosPossition(this.value.length, this);
        }
    }

    const inputs = document.querySelectorAll(selector);

    inputs.forEach( item => {
        item.addEventListener('input', setMask);
        item.addEventListener('blur', setMask);
        item.addEventListener('focus', setMask);
    });
};

export default mask;