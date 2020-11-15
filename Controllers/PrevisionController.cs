using SistemaControlHoras.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaControlHoras.Controllers
{
    public class PrevisionController : Controller
    {
        BDHorasMedicasEntities db = new BDHorasMedicasEntities();
        // GET: Prevision
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult listarPrevisiones()
        {
            var listadoPrevisiones = db.previciones.Where(p => p.estadoPrevicion == true)
                .Select(p => new { p.idPrevicion, p.nombrePrevicion}).ToList();
            return Json(listadoPrevisiones, JsonRequestBehavior.AllowGet);
        }
    }
}