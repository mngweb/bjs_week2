/*
2. Walidator formularza
Stwórz prosty walidator formularza, który zawierał będzie pola <input> o typach “text”,
“email”, “number”(->text) oraz element <textarea>. Dodaj do elementu <form> atrybut
novalidate, aby wyłączyć domyślną walidację przeglądarki. Od Ciebie zależy, czy chcesz
wyświetlać komunikaty o błędach czy tylko podświetlać niepoprawnie uzupełnione pola np.
na czerwono. Za poprawnie uzupełnione pole <input> o typie “text” lub pole <textarea>
uznajemy takie, które ma wpisany przynajmniej jeden znak. W przypadku pola o typie
“email” sprawdź czy zawiera ono znak @, a w przypadku pola o typie “number”(->text) czy podana
wartość jest liczbą (pamiętaj, że DOM zwróci Ci zawsze wartość o typie String, więc
musisz znaleźć sposób, jak sprawdzić czy string ten zawiera wyłącznie liczbę).
*/



(function(){

    var form = document.querySelector(".form"),
        btn = document.querySelector('.btn-submit');

    function FormValidator(form){

        if( !(this instanceof FormValidator) ){
            return new FormValidator(elem);
        }

        this.form = form;
        this.errors_arr = [];
        
    }


    // Pomocnicze funkcje sprawdzające
    FormValidator.prototype.isEmpty = function(elem){
        return ( elem.value === "" );       
    }

    FormValidator.prototype.isEmail = function(elem){
        return ( elem.value.indexOf('@') === -1 );      
    }

    FormValidator.prototype.isNumber = function(elem){
        return ( !isNaN(elem.value) );        
    }

    FormValidator.prototype.isAge = function(elem){
        return ( elem.value >= 0 && elem.value <= 100  );        
    }  

    FormValidator.prototype.hasMinLength = function(elem, minLength){
        return ( elem.value.length >= minLength );        
    } 


    // Pokazanie błędu dla danego pola
    FormValidator.prototype.invalid = function(elem){
        var error_message = elem.dataset.error;
        elem.classList.add('invalid');
        elem.nextElementSibling.textContent = error_message;        // wersja z komunikatem obok pola        
        this.errors_arr.push(error_message);                        // wersja z podsumowaniem komunikatów
    }

    FormValidator.prototype.valid = function(elem){
        elem.classList.remove('invalid');
        elem.nextElementSibling.textContent = "";    
    }


    // Dodatkowe pokazanie podsumowania błędów dla wszystkich pól
    FormValidator.prototype.displayErrors = function(errors_arr){

        var errors_summary = document.createElement("div"),
            errors_title = document.createElement("h2"),
            errors_list = document.createElement("ul");
    

        var errors_summary = document.querySelector(".errors--summary")
        if(!errors_summary){
            errors_summary = document.createElement("div");
            errors_summary.classList.add("errors--summary");
        }
        errors_summary.innerHTML = "";

        errors_title.textContent = "Podsumowanie błędów w formularzu:";  

        this.errors_arr.forEach(function(error){
            var error_info = document.createElement("li");
            error_info.textContent = error;     
            errors_list.appendChild(error_info);
        })

        errors_summary.appendChild(errors_title);
        errors_summary.appendChild(errors_list);
        this.form.appendChild(errors_summary);

    }


    // Główna funkcja walidująca wszystkie pola
    FormValidator.prototype.validate = function(){
        var text_inputs = this.form.querySelectorAll("input[type=text]:not(.number), textarea"),
            email_input = this.form.querySelectorAll("input[type=email]"),
            number_inputs = this.form.querySelectorAll("input[type=text].number"),
            password_inputs = this.form.querySelectorAll("input[type=password]");   

        var self = this;

        this.errors_arr = [];

        text_inputs.forEach(function(elem){
            if( self.isEmpty(elem) ){
                self.invalid(elem)   
            }
            else{
                self.valid(elem);
            }
        });

        email_input.forEach(function(elem){
            if( self.isEmail(elem) ){
                self.invalid(elem)  
            }else{
                self.valid(elem);
            }
        });

        password_inputs.forEach(function(elem){
            if( self.isEmpty(elem) || !self.hasMinLength(elem, 5) ){
                self.invalid(elem)  
            }
            else{
                self.valid(elem);
            }
        });

        number_inputs.forEach(function(elem){   
            if( self.isEmpty(elem) || !self.isNumber(elem) || !self.isAge(elem)){
                self.invalid(elem) 
            }else{
                self.valid(elem);
            }
        });

        self.displayErrors(self.errors_arr);

        return !this.errors_arr.length;

    }


    form_validator = new FormValidator(form);

    form.addEventListener('submit', function(e){
        e.preventDefault();
        if(form_validator.validate()){
            form.submit();
        }
    }, false);


})();

