const cartWrapper = document.querySelector('.card__wrapper');
window.addEventListener('click', function(e) {
    if(e.target.hasAttribute('data-cart')) {
        const card = e.target.closest('.shop__items');

        const productInfo = {
            id: card.dataset.id, 
            imgSrc: card.querySelector('.shop__img').getAttribute('src'),
            title: card.querySelector('.shop__items-title').innerText,
            itemsInBox: card.querySelector('[data-items-in-box]').innerText,
            price: card.querySelector('.price__currency').innerText,
            counter: card.querySelector('[data-counter]').innerText,
        };
        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
        
        if(itemInCart) {
            const counterElement = itemInCart.querySelector('[data-counter]');
            counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
        }else{
            const cartItemHTML = `
             <div class="card__wrapper">
                <div class="card__hold" data-id="${productInfo.id}">
                        <div class="cart__item-top">
                            <img class="trash__img" src="${productInfo.imgSrc}" alt="${productInfo.title}">
                        </div>
                        <div class="card__item-info">
                            <small class="trash__item-subtitle">Программа</small>
                            <div class="cart__item-title">${productInfo.title}</div>
                            <div class="card__item-details">
                                <div class="wrapper__counter">
                                    <div class="items__control" data-action="minus">-</div>
                                    <div class="items__current" data-counter="">${productInfo.counter}</div>
                                    <div class="items__control" data-action="plus">+</div>
                                </div>
                                <div class="card__item-price">
                                    <div class="price__currency">${productInfo.price}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>`;

                cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
        }
        card.querySelector('[data-counter]').innerText = '1';
        toggleCardStatus();
        calcCartAndDelivery();
    }
})