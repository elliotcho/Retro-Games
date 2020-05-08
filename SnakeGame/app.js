document.addEventListener('DOMContentLoaded', ()=>{
    const score=document.querySelector('#score');
    const start=document.querySelector('#start');
    const grid=document.querySelector('#grid');

    let points=0;
    let tiles=[] 
    let width=16;
    let snake=[0, 1, 2];
    let direction=0;
    let apple=0;

    function createBoard(){
        for(let i=0;i<256;i++){
            const t=document.createElement('div');

            t.classList.add('tile');
            tiles.push(t);

            grid.appendChild(t);
        }
    }

    function startGame(){
        document.addEventListener('keydown', control);

        points=0;
        score.textContent=points;

        snake.forEach(pos => tiles[pos].classList.remove('snake'));
        snake=[0,1,2];
        snake.forEach(pos => tiles[pos].classList.add('snake'));

        tiles[apple].classList.remove('apple');
        apple=-1;
        generateApple();
    }

    function moveSnake(){
        let n=snake.length;

        //handle snake hitting itself and walls
        if(
            (snake[n-1]%width===0 && direction===-1) || //left wall
            (snake[n-1]%width===width-1 && direction===1) || //right wall
            (snake[n-1]/width===0 && direction===-width) || //top wall
            (snake[n-1]/width===width-1 && direction===width) || //bottom wall
            (tiles[snake[n-1]+direction].classList.contains('snake')) //itself
        ){
            return;
        }

        let tail=snake.shift();
        snake.push(snake[n-2]+direction);
        tiles[snake[n-1]].classList.add('snake');

        if(snake[n-1]===apple){
            snake.unshift(tail);
            tiles[tail].classList.add('snake');

            tiles[apple].classList.remove('apple');
            apple=-1;
            generateApple();

            points++;
            score.textContent=points;
        }

        else{
            tiles[tail].classList.remove('snake');
        }
    }

    function generateApple(){
        while(apple===-1 || tiles[apple].classList.contains('snake')){
            apple=Math.floor(Math.random()*tiles.length);
        }

        tiles[apple].classList.add('apple');
    }

    function control(e){
        if(e.keyCode===37){direction=-1;} //left key
        if(e.keyCode===39){direction=1;} //right key
        if(e.keyCode===38){direction=-width;}//up key
        if(e.keyCode===40){direction=width;} //down key
        
        moveSnake();
    }

    createBoard();
    start.addEventListener('click', startGame);
});


