var formularioGuardarMedicos = document.getElementById('formularioGuardarMedicos')

if (formularioGuardarMedicos != null) {

    formularioGuardarMedicos.addEventListener('submit', function (e) {
        e.preventDefault()
        var datos = new FormData(formularioGuardarMedicos)
        fetch('../Medicos/guardarDatos/', {
            method: 'post',
            body: datos
        })
            .then(respuesta => respuesta.text())
            .then(datos => {
                if (datos == 1) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro exitoso',
                        text: 'Se registró correctamente al médico!',
                    })
                    setTimeout(function () {
                        location.reload()
                    }, 2000)
                } else if (datos == 2) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Actualización exitosa',
                        text: 'Se actualizó correctamente el médico!',
                    })
                    setTimeout(function () {
                        location.reload()
                    }, 2000)
                }

                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ocurrió un problema',
                        text: 'No se pudo guardar los datos del médico!',
                    })
                }
            })
    })

    var idEspecialidad = document.getElementById('idEspecialidad')
    fetch('../Especialidades/listarEspecialidades/')
        .then(respuesta => respuesta.json())
        .then(datos => {
            for (var i = 0; i < datos.length; i++) {
                idEspecialidad.innerHTML += '<option value=' + datos[i].idEspecialidad + '>' + datos[i].nombreEspecialidad+'</option>'
            }
        })

    var previcionMedico = document.getElementById('previsionMedico')
    fetch('../Prevision/listarPrevisiones/')
        .then(respuesta => respuesta.json())
        .then(datos => {
            for (var i = 0; i < datos.length; i++) {
                previcionMedico.innerHTML += '<option value=' + datos[i].idPrevicion + '>' + datos[i].nombrePrevicion + '</option>'
            }
        })

    

}

function eliminarMedico(_idMedico) {

    Swal.fire({
        title: '¿Desea realmente eliminar?',
        text: "Los cambios no se podrán revertir. Se eliminarán todas las horas médicas asociadas a este médico",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, deseo eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('../Medicos/EliminarMedico/?idMedico=' + _idMedico)
                .then(respuesta => respuesta.text())
                .then(datos => {
                    if (datos == 1) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Eliminación exitosa',
                            text: 'Se eliminó correctamente al médico!',
                        })
                        setTimeout(function () {
                            location.reload()
                        }, 2000)
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ocurrió un problema',
                            text: 'No se pudo eliminar al médico!',
                        })
                    }
                })           
    

        }
    })

    

}

function abrirModalMedico(_idMedico) {

    if (_idMedico == 0) {
        formularioGuardarMedicos.reset()
        document.getElementById("idMedico").value = 0
        document.getElementById("rutMedico").removeAttribute("disabled")
        document.getElementById("rutMedico").classList.remove('is-invalid')
        document.getElementById("btnGuardarMedico").removeAttribute("disabled")

    } else {
        document.getElementById("rutMedico").classList.remove('is-valid')
        fetch('../Medicos/recuperarDatos/?idMedico=' + _idMedico)
            .then(respuesta => respuesta.json())
            .then(datos => {
                document.getElementById("rutMedico").setAttribute("disabled", "disabled")
                document.getElementById("idMedico").value = datos[0].idMedico
                document.getElementById("rutMedico").value = datos[0].rutMedico
                document.getElementById("nombresMedico").value = datos[0].nombresMedico
                document.getElementById("appMedico").value = datos[0].appMedico
                document.getElementById("apmMedico").value = datos[0].apmMedico
                document.getElementById("telefonoMedico").value = datos[0].telefonoMedico
                document.getElementById("correoMedico").value = datos[0].correoMedico

                if (datos[0].sexoMedico == true) {
                    document.getElementById("sexoMedicoF").removeAttribute("checked")
                    document.getElementById("sexoMedicoM").setAttribute("checked", "checked")
                } else {
                    document.getElementById("sexoMedicoM").removeAttribute("checked")
                    document.getElementById("sexoMedicoF").setAttribute("checked", "checked")
                }

                document.getElementById("idEspecialidad").value = datos[0].idEspecialidad
                document.getElementById("previsionMedico").value = datos[0].previsionMedico

            })
    }

}

function validarRutExiste() {
    var rutMedicoExiste = document.getElementById("rutMedico").value

    if (rutMedicoExiste != "") {
        fetch('../Medicos/ValidarRut/?rutMedico=' + rutMedicoExiste)
            .then(respuesta => respuesta.text())
            .then(dato => {
                if (dato == 1) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Médico existe',
                        text: 'El rut ingresado ya se encuentra registrado',
                    })
                    document.getElementById("btnGuardarMedico").setAttribute("disabled", "disabled")
                    document.getElementById("rutMedico").classList.add('is-invalid')
                } else {
                    document.getElementById("btnGuardarMedico").removeAttribute("disabled")
                    document.getElementById("rutMedico").classList.remove('is-invalid')
                    document.getElementById("rutMedico").classList.add('is-valid')
                }
            })
    }
}