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
                    <button onClick= "AbrirModalEditar(${persona.id}, '${persona.nombre}', '${persona.apellido}', ${persona.edad}, '${persona.correo}')">Editar</button>
                    <button onClick="EliminarRegistro(${persona.id})">Eliminar</button>
                </td>
            </tr>
        `
    });
}

//Se obtiene 
ObtenerPersonas();



//Proceso para agregar un nuevo script  
const modal = document.getElementById("modalAgregar"); //Cuadro de dialogo
const btnAgregar = document.getElementById("btnAbrirModal"); //+ para abrir
const btnCerrar = document.getElementById("btnCerrarModal"); // para cerrar

btnAgregar.addEventListener("click", ()=>{
    modal.showModal();
});

btnCerrar.addEventListener("click", ()=>{
    modal.close(); //Cerrar Modal
});

//Agregar nuevo integrante desde el formulario
document.getElementById("frmAgregarIntegrantes").addEventListener("submit", async e =>{
    e.preventDefault(); //"e" representa al evento submit - Evita que el formulario se envíe

    //Capturamos los valores del fromulario
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const correo = document.getElementById("email").value.trim();

    //Validación básica
    if(!nombre || !apellido || !correo || !edad){
        alert("Complete todos los campos")
        return; //Evita que el código siga ejecutándose
    }

    //Llamar a la API para enviar el usuario
    const respuesta = await fetch(API_URL, {
        method: "POST", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre, apellido, edad, correo})
    });

    if(respuesta.ok){
        alert("El registro fue agregado correctamente")

        //Limpiar el formulario
        document.getElementById("frmAgregarIntegrantes").reset();

        //Cerrar el formulario
        modal.close(); 

        //Recargar la tabla 
        ObtenerPersonas();
    }
    else{
        alert("Hubo un error al cargar")
    }
}); 
//Fin del formulario



//Para eliminar registros
async function EliminarRegistro(id){ //Se pide el Id para borrar u_u
    if(confirm("¿Esta seguro que desea borrar?")){
        await fetch(`${API_URL}/${id}`, {method: `DELETE` }); //Se consigue la Id y se elimina
        ObtenerPersonas(); //Para obtner personas
    }
}


//Proceso para editar registros
const modalEditar = document.getElementById("modalEditar");
const btnCerrarEditar = document.getElementById("btnCerrarEditar");

//EventListener para Cerrar el Modal de Editar
btnCerrarEditar.addEventListener("click", ()=>{
    modalEditar.close(); //Cerrar Modal
});

function AbrirModalEditar(id, nombre, apellido, edad, correo){
    document.getElementById("idEditar").value = id; //está hidden
    document.getElementById("nombreEditar").value = nombre;
    document.getElementById("apellidoEditar").value = apellido;
    document.getElementById("edadEditar").value = edad;
    document.getElementById("emailEditar").value = correo;

    modalEditar.showModal(); //El modal se abre cuando ya tiene los valores ingresados

}

document .getElementById("frmEditarIntegrantes").addEventListener("submit", async e => {
e.preventDefault(); //Evitamos que el formulario se envíe de inmediato

const id = document.getElementById("idEditar").value;
const nombre = document.getElementById("nombreEditar").value.trim();
const apellido = document.getElementById("apellidoEditar").value.trim();
const edad = document.getElementById("edadEditar").value.trim();
const correo = document.getElementById("emailEditar").value.trim();

//Validar que los campos estén bien 
if(!id || !nombre|| !apellido || !edad || !correo){
    alert("Complete todos los campos");
    return;
}


const respuesta = await fetch(`${API_URL}/${id}`,{
    method: "PUT", 
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({edad, correo, nombre, apellido})

});

if(respuesta.ok){
    alert("Registro actualizado correctamente");
    modalEditar.close();
    ObtenerPersonas();
}
else{
    alert("Error al actualizar");
}

});

