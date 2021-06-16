const forms = () => {

    const forms = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          uploads = document.querySelectorAll('[name="upload"]'),
          message = {
              loading: 'Отправка..',
              succes: 'Все готово, ваши данные отправлены!',
              fail: 'Упс.. попробуйте еще раз',
              empty: 'Пожалуйста заполните все поля',
              failImg: './assets/img/fail.png',
              succesImg: './assets/img/ok.png',
              loadingImg: './assets/img/spinner.gif'
          },
          servers = {
            designer: './assets/server.php',
            programer: './assets/file.php'
          };

    const postData = async (url,data) => {

        const result = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await result.text();  
    }; 

    function clearInputs() {
        inputs.forEach( item => {
            item.value = '';
        });

        uploads.forEach( item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
    }

    uploads.forEach( item => {
        item.addEventListener('input', () => {
            let dots;

            const arr = item.files[0].name.split('.');

            arr[0].length > 6 ? dots = '...' : dots = '.';

            const name = arr[0].substring(0,6) + dots + arr[1];

            item.previousElementSibling.textContent = name;
        });
    });

    forms.forEach( form => {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const divMessage = document.createElement('div');
                  divMessage.classList.add('status');
                  form.parentNode.appendChild(divMessage);

            form.classList.add('animated', 'fadeOut');
            setTimeout( () => {
                form.style.display = 'none';
            }, 100);
            
            const imgMessage = document.createElement('img');
                  imgMessage.classList.add('animated','fadeInUp');
                  imgMessage.setAttribute('src', message.loadingImg);
                  divMessage.appendChild(imgMessage);
                  
            const textMessage = document.createElement('div');
                  textMessage.textContent = message.loading;
                  divMessage.appendChild(textMessage);
                  
            let api;
            form.classList.contains('file') ? api = servers.programer : api = servers.designer;
            
            const formData = new FormData(form);

            postData(api, formData)
            .then( resolve => {
                imgMessage.setAttribute('src', message.succesImg);
                textMessage.textContent = message.succes;
                console.log(resolve);
            })
            .catch( e => {
                imgMessage.setAttribute('src', message.failImg);
                textMessage.textContent = message.fail;
            })
            .finally( () => {
                clearInputs();

                setTimeout( () => {
                    divMessage.remove();
                    form.classList.remove('fadeOut');
                    form.classList.add('fadeInUp');
                    form.style.display = 'block';
                }, 4000);
            });
        });
    });
};

export default forms;