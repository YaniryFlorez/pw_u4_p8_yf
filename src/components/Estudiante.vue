<template>
  <div class="container">
    <div class="datos">
      <h3>Nuevo estudiante</h3>
      <input v-model="nombre" type="text" placeholder="nombre" />
      <input v-model="apellido" type="text" placeholder="apellido" />
      <input
        v-model="fechaNacimiento"
        type="date"
        placeholder="fechaNacimiento"
      />
      <input v-model="genero" type="text" placeholder="genero" />
      <button @click="guardar()">Guardar Estudiante</button>
    </div>
    <div class="Tabla">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Accion</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="est in estudiantes" :key="est.id">
            <td>{{ est.nombre }}</td>
            <td>{{ est.apellido }}</td>
            <td><button @click="actualizar()">Actualizar</button></td>
            <td><button @click="borrar()">Borrar</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <button @click="actualizarPacial()">Actualizar Parcial</button>
    
  </div>
</template>

<script>
import {
  guardarFachada,
  actualizarFachada,
  actualizarParcialFachada,
  borrarFachada,
} from "@/clients/EstudianteClient.js";
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
      console.log("Estudiante actualizado" + estudianteToBody.nombre);
    },

    async actualizarPacial() {
      const estudianteToBody = {
        apellido: "Vargas",
      };
      await actualizarParcialFachada(estudianteToBody, 1);
      console.log(
        "Estudiante actualizado parcialmente" + estudianteToBody.apellido
      );
    },
    async borrar() {
      await borrarFachada(6);
      console.log("Estudiante borrado" + id);
    },
  },
};
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
.datos {
  margin: 20px auto;
  padding: 20px;
  max-width: 400px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-align: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.datos input {
  width: 100%;
  padding: 8px;
  margin: 0;
  box-sizing: border-box;
}
.Tabla table {
  flex-direction: column;

  align-content: center;
  border-collapse: collapse;
  width: 50%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.Tabla th,
.Tabla td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.Tabla th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.Tabla tr:hover {
  background-color: #f9f9f9;
}

.Tabla button {
  padding: 6px 12px;
  font-size: 14px;
  margin: 0 2px;
  cursor: pointer;
  border-radius: 4px;
  border: none;
  background: #1976d2;
  color: #fff;
}

.Tabla button:hover {
  background: #1565c0;
}
</style>