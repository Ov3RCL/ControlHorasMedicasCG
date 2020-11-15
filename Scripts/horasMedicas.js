var HorasMedicas = document.getElementById("HorasMedicas")

if (HorasMedicas != null) {

    var especialidades = document.getElementById('especialidades')
    fetch('../Especialidades/listarEspecialidades/')
        .then(respuesta => respuesta.json())
        .then(datos => {
            for (var i = 0; i < datos.length; i++) {
                especialidades.innerHTML += '<option value=' + datos[i].idEspecialidad + '>' + datos[i].nombreEspecialidad + '</option>'
            }
        })

    especialidades.addEventListener("change", function () {
        document.getElementById("prevision").removeAttribute("disabled")
        filtrarMedicos()
    })

    var prevision = document.getElementById('prevision')
    fetch('../Prevision/listarPrevisiones/')
        .then(respuesta => respuesta.json())
        .then(datos => {
            for (var i = 0; i < datos.length; i++) {
                prevision.innerHTML += '<option value=' + datos[i].idPrevicion + '>' + datos[i].nombrePrevicion + '</option>'
            }
        })

    prevision.addEventListener("change", filtrarMedicos)

    //EJECUTAR FUNCIÓN QUE GUARDA LOS DATOS DE UNA HORA MÉDICA
    HorasMedicas.addEventListener('submit', guardarDatosHoraMedica)


    

    var fechaActual = calcularFecha(1)
    var fechaMaxima = calcularFecha(4)
    document.getElementById("fecha").setAttribute("min", fechaActual)
    document.getElementById("fecha").setAttribute("max", fechaMaxima)

    horasDisponibles()

} 
function calcularFecha(meses) {

    var fecha = new Date()

    var dia = fecha.getDate()
    var mes = fecha.getMonth() + meses
    var anio = fecha.getFullYear()

    if (mes > 12) {
        anio = anio + 1
        mes = mes - 12
        if (mes < 10) {
            mes = '0' + mes
        }
    }
    return anio + '-' + mes + '-' + dia
}

function filtrarMedicos() {

    var selectMedicos = document.getElementById("medicos")
    selectMedicos.removeAttribute("disabled")

    selectMedicos.innerHTML = '<option value="">Seleccione Médico</option>'

    var idEspecialidad = especialidades.value
    var idPrevision = prevision.value

    fetch('../Medicos/ListarMedicosFiltrados/?idEspecialidad=' + idEspecialidad + '&idPrevision=' + idPrevision)
        .then(respuesta => respuesta.json())
        .then(datos => {
            if (datos.length > 0) {
                for (var i = 0; i < datos.length; i++) {
                    var id = datos[i].idMedico
                    var nombre = datos[i].nombresMedico + " " + datos[i].appMedico + " " + datos[i].apmMedico
                    selectMedicos.innerHTML += '<option value="' + id + '">' + nombre + '</option>'
                }
            }
        })

    

}


function obtenerPaciente() {
    var rutPaciente = document.getElementById("rutPaciente").value

    if (rutPaciente != "") {
        fetch('../Pacientes/obtenerPaciente/?rutPaciente=' + rutPaciente)
            .then(respuesta => respuesta.json())
            .then(datos => {
                if (datos.length > 0) {
                    var nombrePaciente = datos[0].nombresPaciente + " " + datos[0].appPaciente + " " + datos[0].apmPaciente
                    document.getElementById("nombrePaciente").innerText = nombrePaciente
                    document.getElementById("btnIngresarPaciente").classList.add('d-none')
                    document.getElementById("idPaciente").value = datos[0].idPaciente
                } else {
                    document.getElementById("nombrePaciente").innerText = 'PACIENTE NO INGRESADO'
                    document.getElementById("btnIngresarPaciente").classList.remove('d-none')
                    document.getElementById("idPaciente").value = ""
                    rutPacienteNuevo = rutPaciente
                    document.getElementById("btnIngresarPaciente").innerHTML = '<a href="../Pacientes/SeccionPacientes/#' + rutPacienteNuevo+'" class="btn btn-primary btn-sm" > INGRESAR</a >'

                        
                }
            })
            
    }
}


function guardarDatosHoraMedica(e) {
    e.preventDefault()
    var datosHora = new FormData();

    
    var _idHoraMedica = document.getElementById("idHoraMedica").value
    var _idMedico = document.getElementById("medicos").value
    var _idPaciente = document.getElementById("idPaciente").value
    var _fechaHora = document.getElementById("fecha").value
    var _horaHora = document.getElementById("hora").value

    // (condicion)?"valor verdadero":"valor falso"
    var _estadoHora = ( document.getElementById("horaPendiente").checked )?false:true
    var _idPrevision = document.getElementById("prevision").value
    

    datosHora.append("idHoraMedica", _idHoraMedica)
    datosHora.append("idMedico", _idMedico)
    datosHora.append("idPaciente", _idPaciente)
    datosHora.append("fechaHora", _fechaHora)
    datosHora.append("horaHora", _horaHora)
    datosHora.append("estadoHora", _estadoHora)
    datosHora.append("previsionHora", _idPrevision)

    fetch('../Horas/guardarHoraMedica', {
        method: 'POST',
        body: datosHora
    }).then(respuesta => respuesta.text())
        .then(datos => {
            console.log(datos)
        })

}
//gestionar horas disponibles
function horasDisponibles(HO) {
    var horasOcupadas = HO
    var listadoCompletoHorario = document.querySelectorAll("#horario option")

    console.log(horasOcupadas)
    console.log(listadoCompletoHorario)

    for (var i = 0; i < listadoCompletoHorario.length; i++) {
        console.log(listadoCompletoHorario[i])
        for (var x = 0; x < horasOcupadas.length; x++) {
            var hora = listadoCompletoHorario[i].value
            var horaOcup = horasOcupadas[x]
            if (hora == horaOcup) {
                listadoCompletoHorario[i].setAttribute("disabled", "disabled")
            }
        }
    }
}

function obtenerHorarioDisponible() {
    var idMedico = document.getElementById("medicos").value
    var fechaHora = document.getElementById("fecha").value

    var opciones = document.querySelectorAll("#horario option")
    for (var y = 0; y < opciones.length; y++) {
        opciones[y].removeAttribute('disabled')
    }

    fetch('../Horas/obtenerHorasOcupadas/?id=' + idMedico + '&fecha=' + fechaHora)
        .then(respuesta => respuesta.json())
        .then(datos => {
            if (datos.length > 0) {
                var horasOcupadas = []
                console.log(horasOcupadas)
                for (var i = 0; i < datos.length; i++) {
                    var hora = datos[i].horaHora.Hours
                    var minutos = (datos[i].horaHora.Minutes == 0) ? '00' : '30'
                    var horaO = hora + ':' + minutos
                    horasOcupadas.push(horaO)
                }
                horasDisponibles(horasOcupadas)
            }
            
        })
}