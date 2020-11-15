using SistemaControlHoras.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaControlHoras.Controllers
{
    public class EspecialidadesController : Controller
    {
        BDHorasMedicasEntities db = new BDHorasMedicasEntities();
        // GET: Especialidades
        public ActionResult SeccionEspecialidades()
        {
            return View(db.especialidades.ToList());
        }
        public JsonResult traerDatos(int idEspecialidad)
        {
            var resultado = db.especialidades.Where(e => e.idEspecialidad.Equals(idEspecialidad)).ToList();

            return Json(resultado, JsonRequestBehavior.AllowGet);

        }
        public int guardarDatos(especialidades oEspecialidad)
        {
            int resultado = 0;
            try
            {
                if(oEspecialidad.idEspecialidad == 0)
                {
                    db.especialidades.Add(oEspecialidad);
                    db.SaveChanges();
                    resultado = 1;
                } else
                {
                    especialidades espSeleccionada = db.especialidades.Where(e => e.idEspecialidad.Equals(oEspecialidad.idEspecialidad)).First();
                    espSeleccionada.nombreEspecialidad = oEspecialidad.nombreEspecialidad;
                    espSeleccionada.estadoEspecialidad = oEspecialidad.estadoEspecialidad;
                    db.SaveChanges();
                    resultado = 2;
                }
            } catch (Exception ex)
            {
                resultado = 0;
            }
            

            return resultado;

        }
        public int eliminarEspecialidad (int idEsp)
        {
            int resultado = 0;
            try
            {
                var especialidadAEliminar = db.especialidades.Find(idEsp);
                db.especialidades.Remove(especialidadAEliminar);
                db.SaveChanges();
                resultado = 1;
            }
            catch (Exception ex) {
                resultado = 0;
            }

            return resultado;
        }

        public JsonResult listarEspecialidades()
        {
            var listadoEspecialidades = db.especialidades.Where(p => p.estadoEspecialidad == true )
                .Select(p => new { p.idEspecialidad, p.nombreEspecialidad }).ToList();
            return Json(listadoEspecialidades, JsonRequestBehavior.AllowGet);
        }

    }
}