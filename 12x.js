let score=JSON.parse(localStorage.getItem('message')) ||
        {
          wins: 0,
          losses: 0,
          tie: 0
        }
        let result='';
        let scoreElem=document.querySelector('.js-score');
        
        let movesElem=document.querySelector('.js-moves');

        let resultElem=document.querySelector('.js-result');

        updateScoreElem();
      
        function updateScoreElem()
        {
          scoreElem.innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.tie}`;
        }

        document.querySelector('.js-rock-input').addEventListener('click',()=>playGame('Rock'));

        document.querySelector('.js-paper-input').addEventListener('click',()=>playGame('Paper'));

        document.querySelector('.js-scissors-input').addEventListener('click',()=>playGame('Scissors'));

        document.querySelector('.js-reset-btn').addEventListener('click',()=>resetScore());

        document.querySelector('.js-autoPlay').addEventListener('click',()=>autoPlay());

      function pickComputerMove()
      {
        let computerMove='';
        randomMove=Math.random();
        if(randomMove>=0&&randomMove<1/3)
          computerMove='Rock';
        else if(randomMove>=1/3&&randomMove<2/3)
          computerMove='Paper';
        else if(randomMove>=2/3&&randomMove<=1)
          computerMove='Scissors';
        return computerMove;
      }

      let intervalId;
      isPlaying=false;
      function autoPlay()
      {
        HTML=document.querySelector('.js-autoPlay').innerHTML;
        if(HTML==='Auto Play')
        document.querySelector('.js-autoPlay').innerHTML='Stop Play';
        else
        document.querySelector('.js-autoPlay').innerHTML='Auto Play';
        if(!isPlaying)
        {
          intervalId=setInterval(()=>
          {
          let playerMove=pickComputerMove();
          playGame(playerMove);
          isPlaying=true;
          },1500);
        }
        else {
          clearInterval(intervalId);
          isPlaying=false;
        }
        
      }

      function playGame(playerMove)
      {
        let computerMove=pickComputerMove();
        if(playerMove==='Rock')
        {
          if(computerMove==='Rock')
            result='Tie.';
          else if(computerMove==='Paper')
            result='You lose.';
          else
            result='You win.';
        }
        else if(playerMove==='Paper')
        {
          if(computerMove==='Rock')
            result='You win.';
          else if(computerMove==='Paper')
            result='Tie.';
          else
            result='You lose.';
        }
        else if(playerMove==='Scissors')
        {
          if(computerMove==='Rock')
            result='You lose.';
          else if(computerMove==='Paper')
            result='You win.';
          else
            result='Tie.';
        }

        if(result==='You win.')
        score.wins++;
        else if(result==='You lose.')
        score.losses++;
        else if(result==='Tie.')
        score.tie++;

        localStorage.setItem('message',JSON.stringify(score));

        updateScoreElem();

        resultElem.innerHTML= `${result}`;

        movesElem.innerHTML= `You  <img src="photos/${playerMove}-emoji.png" class="input-img"> <img src="photos/${computerMove}-emoji.png" class="input-img"> Computer`;

      } 
      function resetScore()
      { 
        alertMessage();
      }
      
      function alertMessage()
      {
        let para=document.querySelector('.js-alertMessage');
        para.innerHTML=`
        Are you sure you want to reset the score?
        <div class="alert-div">
          <button class="alert-yes-btn js-alert-yes-btn" onclick="clearScore();">Yes</button>
          <button class="alert-no-btn js-alert-no-btn" onclick="clearMessage();">No</button>
        </div>
        `;
      }

      function clearScore()
      {
        score.wins=0;
        score.losses=0;
        score.tie=0;
        localStorage.removeItem('message');
        updateScoreElem();
        movesElem.innerHTML='';
        resultElem.innerHTML='';
        let para=document.querySelector('.js-alertMessage');
        para.innerHTML='';
      }
      
      function clearMessage()
      {
        let para=document.querySelector('.js-alertMessage');
        para.innerHTML='';
      }

      document.body.addEventListener('keydown',(event)=>
      {
        if(event.key==='r')
        playGame('Rock');
        else if(event.key==='p')
        playGame('Paper');
        else if(event.key==='s')
        playGame('Scissors');
        else if(event.key==='Backspace')
        resetScore();
        else if(event.key==='a')
        autoPlay();
      });