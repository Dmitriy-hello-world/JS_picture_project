'use strict';
import modal from './modules/modal';
import slider from './modules/slider';

window.addEventListener('DOMContentLoaded', () => {
    modal();
    slider('.feedback-slider-item', '.main-next-btn', '.main-prev-btn' , 'horizontal');
    slider('.main-slider-item', '', '', 'vertical');
});