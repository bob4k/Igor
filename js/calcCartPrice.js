function calcCartAndDelivery() {
   const cartWrapper = document.querySelector('.card__wrapper');
    const cartItems = document.querySelectorAll('.card__hold');
    const totalPriceElement = document.querySelector('.price-second');

    const delivertyConst = document.querySelector('.price');
    const cartDelivery = document.querySelector('[data-cart-delivery]');

    let totalPrice = 0;

    cartItems.forEach(function(item) {
        const amountElement = item.querySelector('[data-counter]');
        const priceElement = item.querySelector('.price__currency');

        const currentPrice = parseInt(amountElement.innerText) * parseInt(priceElement.innerText);
        totalPrice += currentPrice;
    });
    totalPriceElement.innerText = totalPrice;
    if(totalPrice > 0) {
        cartDelivery.classList.remove('none');
    }else{
        cartDelivery.classList.add('none');
    }
    if(totalPrice >= 1500) {
        delivertyConst.classList.add('free');
        delivertyConst.innerText = 'бесплатно';
    }else{
        delivertyConst.classList.remove('free');
        delivertyConst.innerText = '250 ₽';
    }
}