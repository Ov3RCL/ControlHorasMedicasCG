var ruta = window.location.hash.split('#')
console.log(ruta.length)


if (ruta.length > 1 ) 
{
    $("#agregarPaciente").modal('show')
    document.getElementById("rut").value = ruta[1]
    
}










