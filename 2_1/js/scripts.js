/*
1. Pokazywanie ukrytego elementu
Stwórz projekt z ukrytym elementem HTML (np. <div> z display:none w CSS), a także
przyciskiem (<button>). Przypisz na kliknięcie przycisku funkcję, która pokaże ukryty
element, gdy jest niewidoczny i ukryje go, gdy jest widoczny. Podczas zmiany stanu
widoczności tego elementu, zmień również tekst przycisku np. z “Pokaż treść” na “Ukryj
treść” i na odwrót
*/

(function() {

    var btn = document.querySelector('.toggle--btn'),
        tab = document.querySelector('.toggle--tab');



    //// WERSJA 1:
    // function toggle(e){
    //     tab.classList.toggle('hidden');
    //     e.target.textContent = (e.target.textContent ===  "Pokaż treść") ? "Ukryj treść" : "Pokaż treść";
    // };    
    
    // btn.addEventListener('click', toggle, false);




    //// WERSJA 2:
    function Toggler(elem, btn){

        if(!(this instanceof Toggler) ){
            return new Toggler(elem, btn);
        }

        this.elem = elem;
        this.btn = btn;

        this.btn.addEventListener('click', this.toggle.bind(this), false)
        
    }

    Toggler.prototype.toggle = function(e){
        this.elem.classList.toggle('hidden');
        this.btn.textContent = (this.btn.textContent ===  "Pokaż treść") ? "Ukryj treść" : "Pokaż treść";
    };

    var toggler = new Toggler(tab, btn);



})();
