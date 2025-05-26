//URL de la API - EndPoint
const  API_URL = "https://retoolapi.dev/Rz2NPz/expo";

//Función para llamar a la API y traer al JSON
async function ObtenerPersonas(){
    //Obtenemos la respuesta del servidor
    const res = await fetch(API_URL); //oBTENER datos de la API

    //Convertir la respuesta del servidor a formato JSON
    const data = await res.json(); //Esto es un JSON

    CrearTabla(data); //Enviamos el JSON a la función "CrearTabla"
}

//Función que creará las filas de la tabla en base a los registros q vienen de la API
function CrearTabla(datos){ //"Datos" representa al JSON que viene de la API
    //Se llama "tbody" dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody")

    //Para inyectar código HTML usamos "innerHTML"
    tabla.innerHTML = ""; //Variamos el contenido de la tabla 

    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.edad}</td>
                <td>${persona.correo}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `
    });
}

//Se obtiene 
ObtenerPersonas();