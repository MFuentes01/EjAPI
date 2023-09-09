document.addEventListener('DOMContentLoaded', function () {

    //Declaro constantes de los elementos HTML a utilizar
    const container = document.getElementById("container");
    const input = document.getElementById("input");
    const btn = document.getElementById("btn");
    const opcionMoneda = document.getElementById('currency');
    //Declaro variables para la cantidad y las monedas, para luego utilizarlas con el input text y el select en el que el usuario decide
    //convertir de dólares a euros o viceversa
    var moneda1 = ""
    var moneda2 = ""
    var cantidad = ""

    //Función cargarDatos con un fetch para obtener inforamción de la API Frankfurter, que cuenta con datos de las monedas y sus valores
    //actualizados
    function cargarDatos() {
        const host = 'api.frankfurter.app';

//Utilizo las variables en la url para que la cantidad y monedas cambien según la selección del usuario
        fetch(`https://${host}/latest?amount=${cantidad}&from=${moneda1}&to=${moneda2}`)
            .then(resp => resp.json())
            .then((data) => {
//Se imprimen en pantalla los datos de la conversión deseada
                    container.innerHTML = `
                <p> ${cantidad} ${moneda1} = ${data.rates[moneda2]} ${moneda2} </p>
                `
                
            })
            .catch(error => {
                console.error('Hubo un error:', error);
            });
    }
//Evento que se activa al presionar el botón "Convertir"
    btn.addEventListener("click", function () {

        const valorOpcionMoneda = opcionMoneda.value;

        //Según el valor seleccionado la conversión será de dólares a euros o de euros a dólares a través de la modificación del valor de las
        //variables "moneda1" y "moneda2"
        if (valorOpcionMoneda == 'Eur_a_Dol') {
            moneda1 = "EUR"
            moneda2 = "USD"
        } else if (valorOpcionMoneda == 'Dol_a_Eur') {
            moneda1 = "USD"
            moneda2 = "EUR"
        }

        //El valor de la variable "cantidad" es lo que el usuario ingresa en el campo de tipo texto
        cantidad = input.value;

        //Se llama a la función cambiar
        cargarDatos();


    });
    

});