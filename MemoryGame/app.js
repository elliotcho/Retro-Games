document.addEventListener('DOMContentLoaded', ()=> {
    const score=document.querySelector('#score');
    const restart=document.querySelector('#restart');
    const grid=document.querySelector('#grid');

    const cards=[
        {name: 'booker', url: 'Images/booker.jpg'},
        {name: 'booker', url: 'Images/booker.jpg'},
        {name: 'curry', url: 'Images/curry.jpg'},
        {name: 'curry', url: 'Images/curry.jpg'},
        {name: 'jokic', url: 'Images/jokic.jpg'},
        {name: 'jokic', url: 'Images/jokic.jpg'},
        {name: 'kawhi', url: 'Images/kawhi.jpg'},
        {name: 'kawhi', url: 'Images/kawhi.jpg'},
        {name: 'kd', url: 'Images/kd.jpg'},
        {name: 'kd', url: 'Images/kd.jpg'},
        {name: 'lebron', url: 'Images/lebron.jpg'},
        {name: 'lebron', url: 'Images/lebron.jpg'},
        {name: 'tatum', url: 'Images/tatum.jpg'},
        {name: 'tatum', url: 'Images/tatum.jpg'},
        {name: 'westbrook', url: 'Images/westbrook.jpg'},
        {name: 'westbrook', url: 'Images/westbrook.jpg'}
    ]

    cards.sort(()=>0.5-Math.random());

    let clicked=[];
    let points=0;

    function createBoard(){
        for(let i=0;i<cards.length;i++){
            const card=document.createElement('img');
            
            card.setAttribute('id', i);
            card.setAttribute('class', 'card');
            card.setAttribute('src', 'Images/unflipped.jpg');
            card.addEventListener('click', flipCard);
            
            grid.appendChild(card);
        }
    }

    function flipCard(){
        let id=this.id;

        this.setAttribute('src', cards[id].url);

        clicked.push(id);

        if(clicked.length===2){
            setTimeout(checkForMatch, 100);
        }
    }

    function checkForMatch(){
       let idx1=clicked[0];
       let idx2=clicked[1];

       let card1=document.getElementById(idx1);
       let card2=document.getElementById(idx2);

       if(idx1===idx2){
           clicked.push(idx1);
           alert("Click a different card!");
       }

       else if(cards[idx1].name===cards[idx2].name){
           card1.setAttribute('src', 'Images/flipped.jpg');
           card2.setAttribute('src', 'Images/flipped.jpg');

           card1.removeEventListener('click', flipCard, false);
           card2.removeEventListener('click', flipCard, false);

           card1.style.cursor='auto';
           card2.style.cursor='auto';

           points+=2;

           let output=points===16? 'You won the game!': 'Two points!';

           alert(output);
       }

       else{
           card1.setAttribute('src', 'Images/unflipped.jpg');
           card2.setAttribute('src', 'Images/unflipped.jpg');

           alert('Try again!');
       }

       clicked.pop();
       clicked.pop();

       score.textContent=points;
    }

    createBoard();
    restart.addEventListener('click', ()=>window.location.reload());
});

