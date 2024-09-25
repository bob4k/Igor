window.addEventListener('click', function(e) {
    let counter;

    if(e.target.dataset.action === 'plus' || e.target.dataset.action === 'minus') {
        const counterWrapper = e.target.closest('.wrapper__counter');
        counter = counterWrapper.querySelector('[data-counter]');
    }

    if(e.target.dataset.action === 'plus') {
        counter.innerText = ++counter.innerText;
    }
    
    if(e.target.dataset.action ===  'minus') {
        if(parseInt(counter.innerText) > 1) {
            counter.innerText = --counter.innerText;
        }else if(e.target.closest('.card__hold') && parseInt(counter.innerText) === 1) {
            e.target.closest('.card__wrapper').remove();

            toggleCardStatus();

            calcCartAndDelivery();
        }
    }

     if(e.target.hasAttribute('data-action') && e.target.closest('.card__hold')) {
        calcCartAndDelivery();
     }
})