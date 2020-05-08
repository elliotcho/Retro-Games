document.addEventListener('DOMContentLoaded', ()=>{
    const currPlayer=document.querySelector('#currPlayer');
    const grid=document.querySelector('#grid');
    const restart=document.querySelector('#restart');
    const winner=document.querySelector('#winner');

    let playerId=1;

    function createBoard(){
        for(let i=0;i<42;i++){
            const div=document.createElement('div');

            div.setAttribute('id', i);
            div.classList.add('cell');
            div.addEventListener('click', addDisc);

            if(i>=35){div.classList.add('placeable');}
            
            grid.appendChild(div);
        }
    }

    function addDisc(){
        if(this.classList.contains('placeable')){
            let newClass=(playerId===1)? 'playerOne': 'playerTwo';
            let nextColor=(playerId===1)? 'Yellow' : 'Red';
            playerId= (playerId===1)? 2: 1;

            this.classList.remove('placeable');
            this.classList.add(newClass);

            currPlayer.textContent= (checkForWinner()===-1)? nextColor : 'N/A';
      
            document.getElementById(this.id-7).classList.add('placeable');
        }

        else if(this.classList.contains('playerOne') || this.classList.contains('playerTwo')){
            alert('Someone has already placed a disc here!');
        }

        else{
            alert("Invalid move! Click somewhere different!");
        }
    }

    function checkForWinner(){
        const winConditions = [
            [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10], [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], [21, 22, 23, 24],
            [20, 19, 18, 17], [28, 29, 30, 31], [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], [0, 7, 14, 21], [41, 34, 27, 20],
            [1, 8, 15, 22], [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],
            [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], [41, 33, 25, 17],
            [7, 15, 23, 31], [34, 26, 18, 10], [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], [6, 12, 18, 24], [28, 22, 16, 10],
            [13, 19, 25, 31], [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
            [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32], [11, 7, 23, 29],
            [12, 18, 24, 30], [1, 2, 3, 4], [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9], [15, 16, 17, 18], [19, 18, 17, 16],
            [22, 23, 24, 25], [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30], [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28],
            [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
        ];

        let color = -1;

        for(let i=0;i<winConditions.length;i++){
            let cell1=document.getElementById(winConditions[i][0]);
            let cell2=document.getElementById(winConditions[i][1]);
            let cell3=document.getElementById(winConditions[i][2]);
            let cell4=document.getElementById(winConditions[i][3]);

            if(cell1.classList.contains('playerOne') && cell2.classList.contains('playerOne')
                && cell3.classList.contains('playerOne') && cell4.classList.contains('playerOne')){
                    color='Red';
                    break;
            }

            
            if(cell1.classList.contains('playerTwo') && cell2.classList.contains('playerTwo')
                && cell3.classList.contains('playerTwo') && cell4.classList.contains('playerTwo')){
                    color='Yellow';
                    break;
            }
        }


        if(color===-1){return -1;}

        for(let i=0;i<42;i++){
            document.getElementById(i).removeEventListener('click', addDisc , false);
        }

        grid.style.cursor='auto';

        winner.textContent=color + ' wins!';

        return 0;
    }

    createBoard();
    restart.addEventListener('click', ()=>{window.location.reload();});
});