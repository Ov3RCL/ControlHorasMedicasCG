// Captura el evento submit para guardar los cambios

var formularioGuardarEspecialidad = document.querySelector('#formularioGuardarEspecialidad')

if (formularioGuardarEspecialidad != null) {

    formularioGuardarEspecialidad.addEventListener("submit", function (evento) {

        evento.preventDefault();


        var data = new FormData()
        var estadoEspecialidad = document.getElementById("estadoEspecialidad").checked
        var idEspecialidad = document.getElementById("idEspecialidad").value
        var nombreEspecialidad = document.getElementById("txtNombreEspecialidad").value
        

        data.append("idEspecialidad", idEspecialidad)
        data.append("nombreEspecialidad", nombreEspecialidad)
        data.append("estadoEspecialidad", estadoEspecialidad)

        fetch('../Especialidades/guardarDatos/', {
            method: 'POST',
            body: data
        }).then(res => res.text())
            .then(data => {
                if (data == 1) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro exitoso',
                        text: 'Se registró correctamente la especialidad!',
                    })
                    setTimeout(function () {
                        location.reload()
                    }, 2000)
                }
                else if (data == 2) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Actualización exitosa',
                        text: 'Se actualizó correctamente la especialidad!',
                    })
                    setTimeout(function () {
                        location.reload()
                    }, 2000)
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'UPS!!',
                        text: 'No se pudo completar la operación!',
                    })
                }
            })


    })
}

//Permite distinguir si se quiere editar o agregar. En el caso de editar trae los datos del registro a editar
function abrirModal(id) {
    
    if (id != 0) {
        document.getElementById('formularioGuardarEspecialidad').reset()
        //alert("quiero editar el registro con id: " + id)
        fetch('../Especialidades/traerDatos/?idEspecialidad=' + id)
            .then(respuesta => respuesta.json())
            .then(data => {
                document.getElementById("idEspecialidad").value = data[0].idEspecialidad
                document.getElementById("txtNombreEspecialidad").value = data[0].nombreEspecialidad
                var checkBox = document.getElementById("estadoEspecialidad")

                if (data[0].estadoEspecialidad == true) {
                    checkBox.setAttribute("checked", "checked")
                } else {
                    checkBox.removeAttribute("checked")
                }


            })
    } else {
        document.getElementById('formularioGuardarEspecialidad').reset()
        document.getElementById("idEspecialidad").value = 0
    }
}

//función para eliminar un registro mediante el id
function eliminarEspecialidad(id) {

    /*var confirmar = confirm("¿Desea eliminar el registro?")

    if (confirmar == true) {
        var url = '../Especialidades/eliminarEspecialidad/?idEsp=' + id
        fetch(url)
            .then(respuesta => respuesta.text())
            .then(datos => {
                if (datos == 1) {
                    alert("Se eliminó el registro")
                    setTimeout(function () { location.reload() }, 1000)
                } else {
                    alert("ocurrió un error al eliminar")
                }
            })

    } else {
        return false
    }*/

    Swal.fire({
        title: '¿Desea realmente eliminar?',
        text: "Los cambios no se podrán revertir. Se eliminarán todos los médicos asociados a esta especialidad",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, deseo eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            var url = '../Especialidades/eliminarEspecialidad/?idEsp=' + id
            fetch(url)
                .then(respuesta => respuesta.text())
                .then(datos => {
                    if (datos == 1) {
                        Swal.fire(
                            'Eliminación exitosa!',
                            'Se eliminó la especialidad correctamente',
                            'success'
                        )
                        setTimeout(function () { location.reload() }, 2000)
                    } else {
                        Swal.fire(
                            'UPS!',
                            'Ocurrió un error al eliminar la especialidad',
                            'error'
                        )
                    }
                })

            
        }
    })

}

