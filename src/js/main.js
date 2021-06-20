'use strict';
import modal from './modules/modal';
import slider from './modules/slider';
import forms from './modules/forms';
import mask from './modules/mask';
import textChecked from './modules/vheckValidText';
import showMoreCards from './modules/showMoreCards';

window.addEventListener('DOMContentLoaded', () => {
    modal();
    slider('.feedback-slider-item', '.main-next-btn', '.main-prev-btn' , 'horizontal');
    slider('.main-slider-item', '', '', 'vertical');
    forms();
    mask('[name="phone"]');
    textChecked('[name="name"]');
    textChecked('[name="message"]');
    showMoreCards('.button-styles','#styles .row');
});