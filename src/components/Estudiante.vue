<template>
  <div class="container">
    <button @click="guardar()">Guardar Estudiante</button>
    <button @click="actualizar()">Actualizar</button>
    <button @click="actualizarPacial()">Actualizar Parcial</button>
    <button @click="borrar()">Borrar</button>
  </div>
</template>

<script>
import { guardarFachada, actualizarFachada, actualizarParcialFachada, borrarFachada } from "@/clients/EstudianteClient.js";
export default {
  methods: {
    async guardar() {
      const estudianteToBody = {
        nombre: "Yaniry",
        apellido: "Florez",
        fechaNacimiento: "1990-01-01T00:00:00",
        genero: "F",
      };

      await guardarFachada(estudianteToBody);
    },

  async actualizar() {
    
     const estudianteToBody = {
        nombre: "Mabely",
        apellido: "Florez",
        fechaNacimiento: "1995-01-01T00:00:00",
        genero: "F",
      };
    await actualizarFachada(estudianteToBody, 6);
    console.log("Estudiante actualizado"+ estudianteToBody.nombre);
  },

   async actualizarPacial() {
    const estudianteToBody = {
        apellido: "Vargas",
      };
    await actualizarParcialFachada(estudianteToBody, 1);
    console.log("Estudiante actualizado parcialmente" + estudianteToBody.apellido);
    
  },
    async borrar() {
       
    await borrarFachada(6);
    console.log("Estudiante borrado"+ id);
    },
},
}
</script>

<style>
.container {
  padding: 20px;
    text-align: center;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;    
}   
button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
}

</style>