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
    
    public partial class medicos
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public medicos()
        {
            this.horasMedicas = new HashSet<horasMedicas>();
        }
    
        public int idMedico { get; set; }
        public string rutMedico { get; set; }
        public string nombresMedico { get; set; }
        public string appMedico { get; set; }
        public string apmMedico { get; set; }
        public string telefonoMedico { get; set; }
        public string correoMedico { get; set; }
        public Nullable<bool> sexoMedico { get; set; }
        public Nullable<int> idEspecialidad { get; set; }
        public Nullable<int> previsionMedico { get; set; }
    
        public virtual especialidades especialidades { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<horasMedicas> horasMedicas { get; set; }
        public virtual previciones previciones { get; set; }
    }
}
