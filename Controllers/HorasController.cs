using SistemaControlHoras.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaControlHoras.Controllers
{
    public class HorasController : Controller
    {
        BDHorasMedicasEntities db = new BDHorasMedicasEntities();
        // GET: Horas
        public ActionResult SeccionHoras()
        {

            return View(db.horasMedicas.ToList());
        }
        public int guardarHoraMedica(horasMedicas ohm)
        {
            int resultado = 0;
            try
            {
                if (ohm.idHoraMedica == 0)
                {
                    db.horasMedicas.Add(ohm);
                    db.SaveChanges();
                    resultado = 1;
                }
            }
            catch (Exception ex)
            {
                resultado = 0;
            }
            return resultado;
        }
        public JsonResult obtenerHorasOcupadas(int id, DateTime fecha)
        {
            var horasOcupadas = db.horasMedicas
                .Where(h => h.idMedico == id && h.fechaHora == fecha && h.estadoHora == false)
                .Select(h => new { h.horaHora })
                .ToList();

            return Json(horasOcupadas, JsonRequestBehavior.AllowGet);
        }



    }
}