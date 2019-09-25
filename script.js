var $elements = document.getElementsByClassName('square');
for(var i = 0; i < $elements.length; i++){
  $elements[i].addEventListener('click', function(e){
    if (!e.target.innerHTML) {
      var currentPlayer = document.getElementById('current-player').innerHTML.slice(-3);
      if (currentPlayer === '"X"') {
        e.target.innerHTML = 'x';
        document.getElementById('current-player').innerHTML = 'The board is awaiting an "O"';
        var num = Number(document.getElementById('moves-left').innerHTML.replace(/[^0-9]/gi, '')) - 1;
        if (num === 0) document.getElementById('moves-left').innerHTML = 'There are no more moves left! <br> Game Complete!';
        else document.getElementById('moves-left').innerHTML = document.getElementById('moves-left').innerHTML.replace(/[0-9]/, `${num}`);
      }
      if (currentPlayer === '"O"') {
        e.target.innerHTML = 'o';
        document.getElementById('current-player').innerHTML = 'The board is awaiting an "X"';
        var num = Number(document.getElementById('moves-left').innerHTML.replace(/[^0-9]/gi, '')) - 1;
        if (num === 0) document.getElementById('moves-left').innerHTML = 'There are no more moves left! <br> Game Complete!';
        else document.getElementById('moves-left').innerHTML = document.getElementById('moves-left').innerHTML.replace(/[0-9]/, `${num}`);
      }
    }
  });
};