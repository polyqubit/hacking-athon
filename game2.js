$(document).ready(function(){
var character;
var block = document.getElementById('cags2');
var counter=0;
var checkDead;
let selected = 0;
  function getSelected(selected){
    if(selected===1){
      return 'quandaleDingle1';
    }else if(selected===2){
      return 'quandaleDingle2';
    }else if(selected===3){
      return 'kingdomSpire';
    }
    return null;
  }
function jump(character){
    if(character.classList == "animate"){return}
    character.classList.add("animate");
    setTimeout(function(){
        character.classList.remove("animate");
    },300);
}

function hideBoys(selected){
  if(selected===1){
    $('#quandaleDingle2').removeClass('visible');
    $('#quandaleDingle2').addClass('hide');
    $('#kingdomSpire').removeClass('visible');
    $('#kingdomSpire').addClass('hide');
  }
  else if(selected===2){
    $('#quandaleDingle1').removeClass('visible');
    $('#quandaleDingle1').addClass('hide');
    $('#kingdomSpire').removeClass('visible');
    $('#kingdomSpire').addClass('hide');
  }
  else if(selected===3){
    $('#quandaleDingle1').removeClass('visible');
    $('#quandaleDingle1').addClass('hide');
    $('#quandaleDingle2').removeClass('visible');
    $('#quandaleDingle2').addClass('hide');
  }
}
$('#quandaleDingle1').on('click',()=>{
    selected = 1;
    hideBoys(selected);
    character = document.getElementById(getSelected(selected));
    $('#quandaleDingle1').addClass('characterBoy');
    jump(character);
  checkDead = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if(blockLeft<20 && blockLeft>-20 && characterTop>=130){
        block.style.animation = "none";
        counter=0;
        block.style.animation = "block 1s infinite linear";
    }else{
        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
    }
}, 10);
      
})
$('#quandaleDingle2').on('click',()=>{
     selected = 2;
    character = document.getElementById(getSelected(selected));
    $('#quandaleDingle2').addClass('characterBoy');
    jump(character);   
   hideBoys(selected);
    checkDead = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if(blockLeft<20 && blockLeft>-20 && characterTop>=130){
        block.style.animation = "none";
        counter=0;
        block.style.animation = "block 1s infinite linear";
    }else{
        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
    }
}, 10);
})
$('#kingdomSpire').on('click',()=>{
    checkDead = setInterval(function() {
        $('#kingdomSpire').addClass('characterBoy');
      let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if(blockLeft<20 && blockLeft>-20 && characterTop>=130){
        block.style.animation = "none";
        counter=0;
        block.style.animation = "block 1s infinite linear";
    }else{
        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
    }
}, 10);
  selected = 3;
  hideBoys(selected);
  
})


});