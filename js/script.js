const oyunIcerik = document.getElementById("game");
const buttons = document.querySelector("#buttons");
const scoreIcerik = document.querySelector("#score");
const highScoreIcerik = document.querySelector("#highScore");

let tıklamaSayisi = 0;
let ilkKart;
let ikinciKart;
let oyunDurum = false;
let score = 0;
let highScore = localStorage.getItem("highScore");
let eslesme = 0;


if (!highScore) {
  highScore = 0;
}


highScoreIcerik.innerText = " " + highScore;
scoreIcerik.innerText = "  " + score;

const ICERİKLER = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];


function karistirici(array) {
  let sayac = array.length;

  
  while (sayac > 0) {
   
    let index = Math.floor(Math.random() * sayac);

   
    sayac--;

   
    let temp = array[sayac];
    array[sayac] = array[index];
    array[index] = temp;
  }

  return array;
}

let icerikKaristirici = karistirici(ICERİKLER);


function icerikIcinDiv(icerikArray) {
  for (let color of icerikArray) {
    
    const yeniDiv = document.createElement("div");

   
    const önKart = document.createElement("div");
    const arkaKart = document.createElement("div");

    önKart.classList = "kart önKart";
    arkaKart.classList = "kart arkaKart";
 
    yeniDiv.append(önKart);
    yeniDiv.append(arkaKart);

    yeniDiv.classList.add(color);

    yeniDiv.setAttribute("id", "kart");
    yeniDiv.addEventListener("click", kartTiklamasi);

    oyunIcerik.append(yeniDiv);
  }
}

function kartTiklamasi(event) {
 
  if (oyunDurum) {
    
    tıklamaSayisi++;

    
    if (tıklamaSayisi < 3) {
     
      event.target.parentElement.classList.toggle("flipped");

      event.target.parentElement.childNodes[1].style.backgroundImage = `url(img/${event.target.parentElement.classList[0]}.jpeg)`;

      if (tıklamaSayisi === 1) {
        
        ilkKart = event.target.parentElement;
      } else {
        ikinciKart = event.target.parentElement;

        
        if (ilkKart === ikinciKart) {
          tıklamaSayisi--;
        } else {
          score++;
          scoreIcerik.innerText = "  " + score;

          kartlarıKarsilastir();
        }
      }
    }
   
  } else {
    alert("Lütfen Oyunu Başlatın!");
  }

  
  
  function kartlarıKarsilastir() {
    console.log("comparing");
    if (ilkKart.classList[0] === ikinciKart.classList[0]) {
      ilkKart.removeEventListener("click", kartTiklamasi);
      ikinciKart.removeEventListener("click", kartTiklamasi);

      ilkKart = "";
      ikinciKart = "";
      tıklamaSayisi = 0;

      eslesme++;

      if (eslesme === icerikKaristirici.length / 2) {

        oyunSonu();
        setTimeout(function(){alert("Tebrikler!"+" "+score+" "+"hamlede ve "+count+" dakika "+san+" saniye ile bitirdiniz.");},1000);


      }
    }
    else {
      setTimeout(function () {
       
        ilkKart.classList.toggle("flipped");
        ikinciKart.classList.toggle("flipped");
        tıklamaSayisi = 0;
      }, 1000);
    }
  }
}

icerikIcinDiv(icerikKaristirici);


let butonBaslat;
buttons.addEventListener("click", function (e) {
  if (e.target.name === "oyunbaslat") {
    butonBaslat = e.target;
    e.target.style.backgroundColor = "rgb(100,247,89)";
    oyunDurum = true;
  } else if (e.target.name === "tekraroyna") {
    oyunIcerik.innerHTML = "";
    eslesme = 0;
    score = 0;
    san=0;
    saniye=0;
    count=0;
    scoreIcerik.innerText = "  " + score;
    ilkKart = "";
    ikinciKart = "";
    icerikIcinDiv(karistirici(ICERİKLER));
  }
});


function oyunSonu() {
  
  butonBaslat.style.backgroundColor = "";
  eslesme = 0;
  oyunDurum = false;
  if (score < highScore || highScore === 0) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreIcerik.innerText = " " + highScore;
  }
}
var saniye=1;
var count=0;
var san=0;
function timer() {
    var dak=Math.floor(saniye/60);
    
    var dakika = dak%60;
     san = saniye%60;
    if(san == 0)count++;
    var timer =document.querySelector(".time");
     var dak =document.querySelector(".dak");
    timer.innerHTML=san+" "+"saniye";
    dak.innerHTML=dakika+" "+"dakika";
    saniye ++;
}
setInterval(timer,1000);
