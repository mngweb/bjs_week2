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


    function ending(){
        console.log("Odliczanie zakończone!");
    }

    function counting(callback){

        for( var i = 10; i >= 0; i-- ){
            setTimeout(function(j){
                return function(){
                    console.log(j);
                }
            }(i), 1000); 

            if(i===0)  callback();

        }   

    }


    counting(ending);


})();