using SistemaControlHoras.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaControlHoras.Controllers
{
    public class MedicosController : Controller
    {
        BDHorasMedicasEntities db = new BDHorasMedicasEntities();
        // GET: Medicos
        public ActionResult SeccionMedicos()
        {
            return View(db.medicos.ToList());
        }

        
        public int guardarDatos (medicos oMedico)
        {
            int resultado = 0;

            try
            {
                if (oMedico.idMedico == 0)
                {
                    db.medicos.Add(oMedico);
                    db.SaveChanges();
                    resultado = 1;
                } else
                {
                    medicos medicoSeleccionado = db.medicos.Where(m => m.idMedico == oMedico.idMedico).First();
                    medicoSeleccionado.nombresMedico = oMedico.nombresMedico;
                    medicoSeleccionado.appMedico = oMedico.appMedico;
                    medicoSeleccionado.apmMedico = oMedico.apmMedico;
                    medicoSeleccionado.telefonoMedico = oMedico.telefonoMedico;
                    medicoSeleccionado.correoMedico = oMedico.correoMedico;
                    medicoSeleccionado.sexoMedico = oMedico.sexoMedico;
                    medicoSeleccionado.idEspecialidad = oMedico.idEspecialidad;
                    medicoSeleccionado.previsionMedico = oMedico.previsionMedico;
                    db.SaveChanges();
                    resultado = 2;




                }

            } catch (Exception ex)
            {
                resultado = 0;
            }


            return resultado;

        }
        public int EliminarMedico(int idMedico)
        {
            int resultado = 0;
            try
            {
                var medicoAEliminar = db.medicos.Find(idMedico);
                db.medicos.Remove(medicoAEliminar);
                db.SaveChanges();
                resultado = 1;
            }
            catch (Exception ex)
            {
                resultado = 0;
            }

            return resultado;
        }
        public JsonResult recuperarDatos(int idMedico)
        {
            var resultado = db.medicos.Where(e => e.idMedico.Equals(idMedico))
                .Select(p => new { p.idMedico, p.rutMedico, p.nombresMedico, p.appMedico,
                    p.apmMedico, p.telefonoMedico, p.correoMedico, p.sexoMedico,
                    p.idEspecialidad, p.previsionMedico }).ToList();

            return Json(resultado, JsonRequestBehavior.AllowGet);

        }

        public int ValidarRut (string rutMedico)
        {
            int resultado = 0;

            var rutExiste = db.medicos.Where(p => p.rutMedico == rutMedico).Count();

            if (rutExiste > 0)
            {
                resultado = 1;
            }


            return resultado;
        }
        public JsonResult ListarMedicosFiltrados(int idEspecialidad, int idPrevision)
        {
            var medicos = db.medicos
                .Where(m => m.idEspecialidad == idEspecialidad && m.previsionMedico == idPrevision)
                .Select(m => new { m.idMedico, m.nombresMedico, m.appMedico, m.apmMedico })
                .ToList();

            return Json(medicos, JsonRequestBehavior.AllowGet);
        }


    }
}