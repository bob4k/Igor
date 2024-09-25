function toggleCardStatus() {
    const cartWrapper = document.querySelector('.card__wrapper');
    const cardEmptyBage = document.querySelector('[data-cart-empty]');

    const orderForm = document.querySelector('#order-form');

    if(cartWrapper.children.length > 0) {
        cardEmptyBage.classList.add('none');
        orderForm.classList.remove('none');
    }else{
        cardEmptyBage.classList.remove('none');
        orderForm.classList.add('none');
    }
}