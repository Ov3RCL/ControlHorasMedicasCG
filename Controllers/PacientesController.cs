using SistemaControlHoras.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaControlHoras.Controllers
{
    public class PacientesController : Controller
    {
        BDHorasMedicasEntities db = new BDHorasMedicasEntities();
        // GET: Pacientes
        public ActionResult SeccionPacientes()
        {
            return View();
        }
        public JsonResult obtenerPaciente (string rutPaciente) {
            var datosPaciente = db.pacientes.Where(p => p.rutPaciente == rutPaciente)
                .Select(p => new
                {
                    p.idPaciente,
                    p.nombresPaciente,
                    p.appPaciente,
                    p.apmPaciente
                }).ToList();

            return Json(datosPaciente, JsonRequestBehavior.AllowGet);
        }

    }
    
}