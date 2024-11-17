let select = "peliculas.json";
const tipoSeleccionado = document.getElementById("tipoSeleccionado");
const buscador = document.getElementById("buscador");
const buttonSearch = document.getElementById("botonBuscar");
const resultado = document.getElementById("resultado");


tipoSeleccionado.addEventListener('change', () => {
    select = tipoSeleccionado.value;
    alert(`Ahora el archivo es: ${select}`);
});


buscador.addEventListener('keydown', (event) => {
    const keyCode = event.keyCode;
    if (!(keyCode >= 65 && keyCode <= 90) && !(keyCode >= 97 && keyCode <= 122) && keyCode !== 32 && keyCode !== 8) {
        event.preventDefault();
    }
});


buttonSearch.addEventListener('click', () => {
    const textoBuscado = buscador.value.trim().toUpperCase(); 

    if (textoBuscado === "") {
        resultado.innerHTML = "<li>Por favor, ingresa un texto para buscar</li>";
        return;
    }

    fetch(select)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar el archivo: ${response.statusText}`);
            }
            return response.json();
        })
        .then((datos) => {
            resultado.innerHTML = "";

            const items = datos.data || [];

            const coincidencias = items.filter(item =>
                item.nombre.trim().toUpperCase().startsWith(textoBuscado)
            );

            if (coincidencias.length > 0) {
                coincidencias.forEach(item => {
                    const li = document.createElement("li");
                    li.textContent = item.nombre;

                    const sinopsis = document.createElement("p");
                    sinopsis.textContent = item.sinopsis;
                    sinopsis.style.display = "none";

                    li.addEventListener('mouseover', () => {
                        sinopsis.style.display = "block";
                    });

                    li.addEventListener('mouseout', () => {
                        sinopsis.style.display = "none"; 
                    });

                    li.appendChild(sinopsis);
                    resultado.appendChild(li);
                });
            } else {
                resultado.innerHTML = "<li>Vaya.. no se encontro ningún resultado ;(</li>";
            }
        })
        .catch(error => console.error('Error al cargar el archivo:', error));
});
