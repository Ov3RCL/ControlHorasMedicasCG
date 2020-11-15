using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaControlHoras.Controllers
{
    public class EscritorioController : Controller
    {
        // GET: Escritorio
        public ActionResult VistaEscritorio()
        {
            return View();
        }



        /*public string Saludar(string nombre, string apellido)
        {
            return "Bienvenido " + nombre + " " + apellido;
        }*/
    }
}