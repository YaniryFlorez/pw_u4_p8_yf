import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EstudianteGuaradar from '@/components/EstudianteGuardar.vue'
import LoginView from "@/views/LoginView.vue"
import NotasIngresoView from '@/views/NotasIngresoView.vue'
import AboutView from '@/views/AboutView.vue'
import RecursoProhibidoView from '@/views/RecursoProhibidoView.vue'

import {obtenerPaginasPermitidas} from '../helpers/Autorizacion'
import EstudianteActualizar from '@/components/EstudianteActualizar.vue'
import EstudianteActualizarParcial from '@/components/EstudianteActualizarParcial.vue'

function estaAutenticado() {

  return localStorage.getItem("auth") === "true"
}

const routes = [
  {
    path: '/Login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      requireAuth: true,
      esValida: false,
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      requireAuth: true,
      esValida: false,
    }
  },
   {
    path: '/notas',
    name: 'notas',
    component: NotasIngresoView,
    meta: {
      requireAuth: true,
      esValida: false,
    }
  },
  {
    path: '/estudiante/guardar',
    name: '/estudiante/guardar',
    component: EstudianteGuaradar,

  },
  {
    path: '/estudiante/actualizar',
    name: '/estudiante/actualizar',
    component: EstudianteActualizar,
   
  },
   {
    path: '/estudiante/parcial',
    name: '/estudiante/parcial',
    component: EstudianteActualizarParcial,
   
  },

    {
    path: '/403',
    name: '403',
    component: RecursoProhibidoView,
    meta: {
      requireAuth: true,
      esValida: false,
    }
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//guardian
router.beforeEach((to, from, next) => {

  if (to.meta.requireAuth) {
    console.log('auth');
    // Si no esta autenticado
    if (!estaAutenticado()) {
      next("/Login") //envia al login
    } else {
      //autenticado
      //aqui valida si esta autorizado 
      let usuario = localStorage.getItem('usuario');
      let paginas = obtenerPaginasPermitidas(usuario);
      if(paginas.includes(to.path)){
        next();
      }else{
        next('/403');
      }
      next()
    }

  } else {
    next()
  }

})

export default router
