/*$.ajax({
    url: 'https://randomuser.me/api/',
    type: 'post',
    dataType: 'json',
    success: function (data) {
        console.log(data);
    }
});
$.getJSON('https://mindicador.cl/api', function (data) {
    var resultado = data;
    console.log(resultado.uf.valor)
}).fail(function () {
    console.log('Error al consumir la API!');
}); */


fetch('https://mindicador.cl/api')
    .then(respuesta => respuesta.json())
    .then(data => {

        var divUf = document.getElementById("valorUf")
        var valorUf = Math.round(data.uf.valor)
        divUf.innerHTML = `
                <span class="text-success">
                    <i class="fas fa-dollar-sign" ></i >  ${Intl.NumberFormat('es-CL').format(valorUf)} 
                </span>            
                `
    })   



$(document).ready(function () {
    $('.table').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
        dom: "<'row'<'col-sm-6'l><'col-sm-6'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            //"<'row'<'col-sm-5'i><'col-sm-7'p>>" +
            "<'bottom'<'row'<'col-sm-6'B><'col-sm-6'p>>" + "<'row'<'col-sm-12'i>>" + ">"
        ,
        buttons: [
            {
                extend: 'excelHtml5',
                text: '<i class="fas fa-file-excel"></i>',
                titleAttr : 'Descargar Excel',
                className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                text: '<i class="fas fa-file-pdf"></i>',
                titleAttr: 'Descargar Pdf',
                className: 'btn btn-danger'
            },
            {
                extend: 'print',
                text: '<i class="fas fa-print"></i>',
                titleAttr: 'Imprimir',
                className: 'btn btn-dark'
            }
        ]
    });

    $('#rutMedico').Rut({
        on_error: function () {
            Swal.fire({
                icon: 'warning',
                title: 'Rut inválido'
            })
        },
        format_on: 'keyup'
    });
    $('#rutPaciente').Rut({
        on_error: function () {
            Swal.fire({
                icon: 'warning',
                title: 'Rut inválido'
            })
        },
        format_on: 'keyup'
    });

    //$('.js-example-basic-single').select2();
});
