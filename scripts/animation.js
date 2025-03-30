document.addEventListener('DOMContentLoaded', () => {

    window.scrollTo(0, 0);
    let elements = document.querySelectorAll("body *");
    seconds = .05;
    for (let element of elements) {
        if (element.style.animation) continue;
        element.style.animation = `slideUp ${seconds}s ease-in-out forwards`;
        seconds += .05;
    }

    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 500);

});