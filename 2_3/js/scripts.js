/*
3. Odliczanie od 10 do 0
Stwórz projekt, który po uruchomieniu odpowiedniej funkcji, pozwoli na odliczanie
od 10 do 0. Wszystkie wartości powinny być wyświetlane na stronie, a czas pomiędzy
zmianą wartości powinien wynosić 1 sekundę. Choć cały Twój kod może być podzielony na
wiele funkcji, jedna z nich powinna uruchamiać proces odliczania. Przy wywołaniu tej
funkcji, daj możliwość przekazania innej funkcji jako argument. Przekazaną funkcję
wywołaj, gdy licznik osiągnie wartość 0.
Istotą przekazywania jednej funkcji do drugiej (w tym przypadku nazwalibyśmy ją funkcją
callback) jest to, aby dać użytkownikowi naszego kodu pewną gotową funkcjonalność
(odliczanie od 10 do 0), ale także możliwość dodania czegoś od siebie, tj. wykonania
własnej funkcji po zakończeniu odliczania. W przekazanej funkcji możesz wpisać po prostu
console.log(“Odliczanie zakończone!”).
Podpowiedź: użyj funkcji setTimeout wywołując ją wielokrotnie zamiast setInterval,
którą wykonałbyś wyłącznie raz.
*/

(function() {

    var counter = document.querySelector("#counter"),
        btn = document.querySelector("#btn");


    function counting(number){
        counter.textContent = number;
        btn.setAttribute("disabled", true);
    }

    function ending(){
        counter.textContent = "Odliczanie zakończone!";
        btn.removeAttribute("disabled");
    }


    var count = 10;

    function start(callback){

        //// WERSJA 1
        for( var i = count; i >= 0; i-- ){

            setTimeout(function(j){ 
                return function(){
                    counting(j);
                    if(j <= 0) callback();
                }
            }(i), (count-i)*1000); 

        }   


        //// WERSJA 2
        // setTimeout(function(){    

        //     if(count <= 0){
        //         callback();
        //     } else {
        //         counting(count--);     
        //         start(callback);
        //     }

        // }, 1000); 

    }

    btn.addEventListener('click',  start.bind(this, ending), false);

})();
