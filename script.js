var $elements = document.getElementsByClassName('square');
for(var i = 0; i < $elements.length; i++){
  $elements[i].addEventListener('click', function(e){
    e.target.text = 'x';
  });
};