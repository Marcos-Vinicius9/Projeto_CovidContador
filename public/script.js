let btnMenu = document.querySelectorAll('#btn-menu'),
    menu = document.querySelector('.menu'),
    cards = document.querySelectorAll('.card-mp4'),
    modal = document.querySelector('.modal-overlay'),
    player = document.querySelector('#player'),
    btnClose = document.querySelector('#btn-close');



for(let button of btnMenu){
    button.addEventListener('click',()=>{
        menu.classList.toggle('show-menu');
    });
}

for(let card of cards){
    card.addEventListener('click',() =>{
        player.src = `https://www.youtube.com/embed/${card.getAttribute('id')}`
        modal.classList.add('show-modal')
    })
}

btnClose.addEventListener('click', ()=>{
    modal.classList.remove('show-modal')
    player.src = ""
})