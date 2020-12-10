var perspective = 1000;
var x,y,rX,rY;
var mobileDevice = false;
var cards;

let blendLayers = [...document.getElementsByClassName('blending')]


if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 mobileDevice = true;
}




(function($){
  if(!mobileDevice){
  var card = $(".card");
  card.on('mousemove', function (e) {
      x = e.clientX - $(this).offset().left + $(window).scrollLeft();
      y = e.clientY - $(this).offset().top + $(window).scrollTop();

      rY = map(x, 0, $(this).width(), -40, 40);
      rX = map(y, 0, $(this).height(), -40, 40);

      $(this).children(".image").css("transform", "perspective("+perspective+"px)" +" " + "rotateY(" + rY + "deg)" + " " + "rotateX(" + -rX + "deg)");

  });

  card.on( 'scroll', function(){
   console.log('Event Fired');
});

  card.on('mouseenter', function () {
    $(this).children(".image").css({
        transition: "all " + 0.1 + "s" + " linear",
    });
    console.log( $(this).children(".image"))


    blendLayers.forEach((item, i) => {
        item.classList.remove("blending")
      });


});

card.on('mouseleave', function () {
    $(this).children(".image").css({
        transition: "all " + 0.2 + "s" + " linear",
    });

    $(this).children(".image").css("transform", "rotateY(" + 0 + "deg)" + " " + "rotateX(" + 0 + "deg)");

    blendLayers.forEach((item, i) => {
        item.classList.add("blending")
      });
});


  function map(x, in_min, in_max, out_min, out_max)
  {
      return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
}
})(jQuery);



document.addEventListener('wheel', function (event) {

  if(document.querySelectorAll( ":hover" )[3]){
  if(document.querySelectorAll( ":hover" )[3].classList.contains("card")){
    event.preventDefault();

    var currCard = document.querySelectorAll( ":hover" )[3];

    perspective += event.deltaY*2;

    if(perspective < 300){
      perspective = 300;
    }else if(perspective > 2000){
      perspective = 2000;
    }


    $(currCard).children(".image").css("transform", "perspective("+perspective+"px)" +" " + "rotateY(" + rY + "deg)" + " " + "rotateX(" + -rX + "deg)");
  };
}

    if (event.target.id === 'mainWrapper') { // or any other filtering condition
    }
},{ passive: false });




var popup = document.getElementById('popup');

if ( location.protocol != "https:" && mobileDevice) {
location.href = "https:" + window.location.href.substring( window.location.protocol.length );
}

if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ){
  popup.style.display = "flex";
}


//Access accelerometer from mobile device
function permission () {
  cards = document.querySelectorAll(".card");
    if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {

        DeviceMotionEvent.requestPermission()
            .then( response => {

            if ( response == "granted" ) {

                popup.style.display = "none"
                window.addEventListener( "deviceorientation", (e) => {

                  cards.forEach((item) => {

                    $(item).children(".image").css("transform", "perspective("+perspective+"px)" +" " + "rotateY("+(event.gamma)+"deg)" + " " + "rotateX("+(event.beta*-1 + 40)+"deg)");

                  })
                })
            }
        })
            .catch( console.error )
    } else {
      popup.style.display = "none"
        alert( "DeviceMotionEvent is not defined" );
    }
}


const btn = document.getElementById( "btn" );
btn.addEventListener( "click", permission );


const btn2 = document.getElementById( "btn2" );
btn2.addEventListener( "click", function(){
  popup.style.display = "none"
} );



let overlays = [...document.getElementsByClassName('overlay')]



function dark(){
  document.body.style.backgroundColor = "black";
  var dbut = document.getElementById("dark")
  dbut.style.color = "grey"
  dbut.style.border= "1.5px solid grey"

  var lbut = document.getElementById("light")
  lbut.style.color = "white"
  lbut.style.border= "1.5px solid white"

  overlays.forEach((item)=>{
    item.style.opacity = "1";
  })
}



function light(){
  document.body.style.backgroundColor = "lightgrey";

  var dbut = document.getElementById("dark")
  dbut.style.color = "black"
  dbut.style.border= "1.5px solid black"

  var lbut = document.getElementById("light")
  lbut.style.color = "darkgrey"
  lbut.style.border= "1.5px solid darkgrey"

  overlays.forEach((item)=>{
    item.style.opacity = "0";
  })
}
