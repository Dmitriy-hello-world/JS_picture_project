const changeImg = (selector) => {

    const blocks = document.querySelectorAll(selector);

    function showImg(block) {
        block.addEventListener('mouseover', () => {
            const img = block.querySelector('img');
            img.src = img.src.slice(0,-4) + '-1.png';

            block.querySelectorAll('p:not(.sizes-hit)').forEach( item => {
                item.style.display = 'none';
            });
        });
    }

    function hideImg(block) {
        block.addEventListener('mouseout', () => {
            const img = block.querySelector('img');
            img.src = img.src.slice(0,-6) + '.png';

            block.querySelectorAll('p:not(.sizes-hit)').forEach( item => {
                item.style.display = 'block';
            });
        });
    }

    blocks.forEach( block => {
        showImg(block);
        hideImg(block);
    });

};

export default changeImg;