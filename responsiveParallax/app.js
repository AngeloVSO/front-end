const translate = document.querySelectorAll('.translate');
const title = document.querySelector('.title');
const header = document.querySelector('header');
const section = document.querySelector('section');
const border = document.querySelector('.border');

let headerHeight = header.offsetHeight;
let sectionHeight = section.offsetHeight;

window.addEventListener('scroll', () => {
    let scroll = window.pageYOffset;
    let sectionY = section.getBoundingClientRect();

    translate.forEach(element => {
        let speed = element.dataset.speed;
        element.style.transform = `translateY(${scroll * speed}px)`;
    })

    title.style.opacity = - scroll / (headerHeight / 3) +1;
    
    border.style.width = `${scroll / (sectionY.top + sectionHeight) * 25}%`;
})