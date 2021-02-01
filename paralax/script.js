document.addEventListener("mousemove", function(e){
    const bg = document.querySelector('.bg');
    const bird = document.querySelector('.bird');
    const content = document.querySelector('.content');

    bg.style.width = 100 + e.pageY/100 + '%';

    bird.style.right = 120 + e.pageX/2 + 'px';

    content.style.left = 5 + e.pageX/2.7 + 'px';  
})