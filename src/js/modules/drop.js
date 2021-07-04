import { postData } from "../requests/requests";

const drop = (inputSelectors) => {

    const inputs = document.querySelectorAll(inputSelectors);

    ['dragenter','dragleave','dragover','drop'].forEach( event => {
        inputs.forEach( input => {
            input.addEventListener(event, preventDefault, false);
        });
    });

    ['dragenter', 'dragover'].forEach( event => {
        inputs.forEach( input => {
            input.addEventListener(event, () => showArea(input), false);
        });
    });

    ['dragleave', 'drop'].forEach( event => {
        inputs.forEach( input => {
            input.addEventListener(event, () => hideArea(input), false);
        });
    });

    inputs.forEach( input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;

            let dots;

            const arr = input.files[0].name.split('.');

            arr[0].length > 6 ? dots = '...' : dots = '.';

            const name = arr[0].substring(0,6) + dots + arr[1];

            input.previousElementSibling.textContent = name;
            
            if (input.getAttribute('data-input') == 'input') {
                let formData = new FormData();
                input.files.forEach( (file,index) => {
                    formData.append(index,file);
                });
                
                const divMessage = document.createElement('div');
                divMessage.classList.add('status');
                input.parentNode.parentNode.appendChild(divMessage);

                input.parentNode.classList.add('animated', 'fadeOut');
                setTimeout( () => {
                    input.parentNode.style.display = 'none';
                }, 100);
            
                const imgMessage = document.createElement('img');
                      imgMessage.classList.add('animated','fadeInUp');
                      imgMessage.setAttribute('src', './assets/img/spinner.gif');
                      divMessage.appendChild(imgMessage);
                postData('./assets/file.php', formData)
                .then( resolve => {
                    imgMessage.setAttribute('src', './assets/img/ok.png');
                    console.log(resolve);
                })
                .catch( e => {
                    imgMessage.setAttribute('src', './assets/img/fail.png');
                })
                .finally( () => {
                    input.previousElementSibling.textContent = 'Файл не выбран';
    
                    setTimeout( () => {
                        divMessage.remove();
                        input.parentNode.classList.remove('fadeOut');
                        input.parentNode.classList.add('fadeInUp');
                        input.parentNode.style.display = 'block';
                    }, 4000);
                });
            }
        });
    });

    function preventDefault(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function showArea(item) {
        item.closest('.file_upload').style.border = '2px dashed green';
        item.closest('.file_upload').style.borderRadius = '10px';
    }

    function hideArea(item) {
        item.closest('.file_upload').style.border = 'none';
        item.closest('.file_upload').style.borderRadius = 'none';
    }
};

export default drop;