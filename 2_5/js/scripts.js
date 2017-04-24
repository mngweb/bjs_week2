/*
5. Funkcja debounce
Stwórz funkcję o nazwie debounce, która przyjmie przy wywołaniu dwa argumenty.
Pierwszy z nich to inna funkcja do późniejszego wywołania, a drugi to czas w
milisekundach. Po takim wywołaniu, funkcja ta powinna zwrócić nową funkcję, którą
można zapisać np. w zmiennej. Następnie tę nową funkcję będzie można wielokrotnie
wywoływać (a ona powinna wywołać pierwotnie przekazaną funkcję), jednak jeśli czas
pomiędzy poszczególnymi wywołaniami będzie krótszy, niż podany wcześniej (wspomniany
argument z czasem w milisekundach), to funkcja nie powinna nic zrobić, ale ustawić licznik
na kolejne Xms i dopiero wtedy się wywołać.
Rozwiązania typu debounce stosuje się np. przy obsłudze zdarzenia scroll w
przeglądarkach, które wywoływane jest bardzo wiele razy. Jeśli nie chcemy, aby nasza
funkcja negatywnie wpływała na wydajność podczas scrollowania, a wystarczy, że wywoła
się np. 100ms po zakończeniu scrollowania, wtedy stosujemy funkcję debounce. Innym
przykładem jest np. zdarzenie resize, które też jest wielokrotnie wywoływane podczas
skalowania okna przeglądarki, a nam może zależeć, aby wywołać pewien kod dopiero
wtedy, gdy taka akcja się zakończy.
Całość przetestować możesz z użyciem tego kodu: https://pastebin.com/J0BJVqtR. Twoim
zadaniem jest dopisanie funkcji debounce, aby ten kod zaczął działać.
Podpowiedź: będziesz potrzebował funkcji setTimeout i clearTimeout.
*/

(function() {


    function debounce(fn, time) {
        // docelowo powinna być wywoływana
        // funkcja fn w ten sposób fn()
 
        // część kodu tutaj
        
        var timeout; 
        var event_count = 0;

        return function(e) { 
            // pozostały kod tutaj

            var self = this; 

            clearTimeout(timeout);

            timeout = setTimeout(function(){
                fn.apply(self);
                console.log("Timer numer: " + timeout + " wykonał zadanie.")
            }, time);

            console.log("Numer timera: " + timeout, " Numer zdarzenia: " + event_count++);
        };
    }
 


 

    var handleScroll = debounce(function() {
        console.log("Scrollujemy!",  "Pozycja scrolla to: " + document.scrollingElement.scrollTop);
    }, 500);

 
    // w tym miejscu pod handleScroll
    // powinna być nowa funkcja
 
    // Przypisanie zdarzenia "scroll"
    window.addEventListener("scroll", handleScroll, false);
 


    // Możesz również przetestować funkcję
    // ze zdarzeniem "resize" skalując okno
    var handleResize = debounce(function() {
        console.log("Zmieniamy rozmiar okna!", "Szerokość okna to: " + window.innerWidth);
    }, 500);  
 
    window.addEventListener("resize", handleResize, false);


})();