document.addEventListener('DOMContentLoaded', ()=>{
    const score=document.querySelector('#score');
    const grid=document.querySelector('#grid');
    const start=document.querySelector('#start');
    const restart=document.querySelector('#restart');
    const gameOver=document.querySelector('#gameOver');

    let points=0;
    let squares=[];
    let width=15;
    let shooter=201;
    let invaders=[
        3,4,5,6,7,8,9,10,11,12,
        18,19,20,21,22,23,24,25,26,27,
        33,34,35,36,37,38,39,40,41,42,
        48,49,50,51,52,53,54,55,56,57,
        63,64,65,66,67,68,69,70,71,72
    ];
    let direction=1;
    
    function createBoard(){
        for(let i=0;i<225;i++){
            const div=document.createElement('div');
            
            squares.push(div);

            grid.appendChild(div);        
        }
    }

    function startGame(){
        start.style.display='none';
        document.addEventListener('keydown', moveShooter);
        document.addEventListener('keyup', shootLaser);
        moveInvaders();
    }

    function moveInvaders(){
        let invadersInterval=setInterval(()=>{

            //win condition
            if(invaders.length===0){
                document.removeEventListener('keydown', moveShooter, false);
                document.removeEventListener('keyup', shootLaser, false);

                gameOver.textContent="You win! Total points: " + points;

                clearInterval(invadersInterval);

                return;
            }

            //lose condition
            for(let i=0;i<invaders.length;i++){
                if(invaders[i]> squares.length-(2*width)-1){
                    squares[shooter].classList.remove('shooter');

                    document.removeEventListener('keydown', moveShooter, false);
                    document.removeEventListener('keyup', shootLaser, false);
    
                    gameOver.textContent="Game over! Total points: " + points;
    
                    clearInterval(invadersInterval);

                    return;
                }
            }

            let leftWall=false;
            let rightWall=false;

            invaders.forEach(val =>{
                if(val%width===0){leftWall=true;}
                if(val%width===width-1){rightWall=true;}
            });

            if((leftWall && direction==-1) ||(rightWall && direction==1)){
                direction=width;
            }

            else if(direction===width){
                direction= leftWall? 1: -1;
            }

            invaders.forEach((val, idx) =>{
                squares[val].classList.remove('invader');
                invaders[idx]=val+direction;
            });

            invaders.forEach(val =>{squares[val].classList.add('invader');});
        }, 250);
    }

    function moveShooter(e){
        squares[shooter].classList.remove('shooter');

        switch(e.keyCode){
            case 37:
                if(shooter%width!==0){shooter--;}
                break;
            case 39:
                if(shooter%width!==width-1){shooter++;}
                break;
        }

        squares[shooter].classList.add('shooter');
    }

    function shootLaser(e){
        if(e.keyCode!==32){return;}

        let laser=shooter;

        let laserInterval=setInterval(()=>{
            squares[laser].classList.remove('laser');
    
            laser-=width;

            if(laser<0){
                clearInterval(laserInterval);
            }

            else if(squares[laser].classList.contains('invader')){
                squares[laser].classList.remove('invader');
                squares[laser].classList.add('hit');
                
                let deleted=invaders.indexOf(laser);
                invaders.splice(deleted, 1);

                points++;
                score.textContent=points;

                setTimeout(()=>squares[laser].classList.remove('hit'), 200);
                clearInterval(laserInterval);
            }

            else{
                squares[laser].classList.add('laser');
            }
        }, 100);
    }

    createBoard();
    
    squares[shooter].classList.add('shooter');
    invaders.forEach(pos => squares[pos].classList.add('invader'));
    
    start.addEventListener('click', startGame);
    restart.addEventListener('click', ()=>window.location.reload());
});

