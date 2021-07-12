(function () {
    new AnimateScrollToHash({
        transition: 1500,
        margin: 75,
    });

    const headerNode = document.getElementsByClassName('header')[0];
    const burgerNode = document.getElementsByClassName('burger')[0];

    function toggleMobileMenu(e) {
        e.stopPropagation();
        e.preventDefault();
        if (headerNode.classList.contains('opened')) {
            headerNode.classList.remove('opened');
            document.body.removeEventListener('click', toggleMobileMenu, false);
        } else {
            headerNode.classList.add('opened');
            document.body.addEventListener('click', toggleMobileMenu, false);
        }
    }

    burgerNode.addEventListener('click', toggleMobileMenu, false);

    function getTop(elem) {
        const box = elem.getBoundingClientRect();
        const body = document.body;
        const docEl = document.documentElement;
        const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        const clientTop = docEl.clientTop || body.clientTop || 0;
        return box.top + scrollTop - clientTop;
    }

    const checkElementWasScrolled = (element) => {
        const currentPos = window.pageYOffset + (document.documentElement.clientHeight / 5 * 3);
        const elementPos = getTop(element);
        if (currentPos > elementPos) {
            element.classList.add('opened');
            return true;
        }
        return false;
    }

    const allElementsMustBeOpened = [];

    const stepCards =document.getElementsByClassName('step-card__content');

    for (let i = 0; i < stepCards.length; i++) {
        allElementsMustBeOpened.push(stepCards[i]);
    }

    const createListener = (element) => {
        let listener;
        const remover = () => {
            window.removeEventListener('scroll', listener, false)
        }
        listener = () => {
            if (checkElementWasScrolled(element)) remover();
        }
        return listener;
    }

    allElementsMustBeOpened.forEach((element) => {
        window.addEventListener('scroll', createListener(element), false)
    });


})();

$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        items:1,
        margin:20,
        dots: true,
    });


    new WOW().init();
});