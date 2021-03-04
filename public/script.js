let button = document.querySelector('#btn-menu');
let menu = document.querySelector('.menu');

button.addEventListener('click',()=>{
    menu.classList.toggle('show-menu');
});