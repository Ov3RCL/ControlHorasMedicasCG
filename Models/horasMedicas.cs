//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SistemaControlHoras.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class horasMedicas
    {
        public int idHoraMedica { get; set; }
        public int idMedico { get; set; }
        public int idPaciente { get; set; }
        public System.DateTime fechaHora { get; set; }
        public System.TimeSpan horaHora { get; set; }
        public bool estadoHora { get; set; }
        public int previsionHora { get; set; }
    
        public virtual medicos medicos { get; set; }
        public virtual pacientes pacientes { get; set; }
        public virtual previciones previciones { get; set; }
    }
}