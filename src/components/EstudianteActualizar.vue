<template>
<div class="estudiante-container">
    <h2>Actualizar Estudiante</h2>
    
    <div class="form-section">
        <form @submit.prevent="actualizar()">
            <div class="form-group">
                <label for="actualizarId">ID del Estudiante:</label>
                <input type="number" id="actualizarId" v-model.number="actualizarEstudiante.id" required>
            </div>
            <div class="form-group">
                <label for="actualizarNombre">Nombre:</label>
                <input type="text" id="actualizarNombre" v-model="actualizarEstudiante.nombre" required>
            </div>
            <div class="form-group">
                <label for="actualizarApellido">Apellido:</label>
                <input type="text" id="actualizarApellido" v-model="actualizarEstudiante.apellido" required>
            </div>
            <div class="form-group">
                <label for="actualizarFechaNacimiento">Fecha de Nacimiento:</label>
                <input type="date" id="actualizarFechaNacimiento" v-model="actualizarEstudiante.fechaNacimiento" required>
            </div>
            <div class="form-group">
                <label for="actualizarGenero">Género:</label>
                <select id="actualizarGenero" v-model="actualizarEstudiante.genero" required>
                    <option value="">Seleccione...</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                </select>
            </div>
            <div class="button-group">
                <button type="submit">Actualizar Estudiante</button>
            </div>
        </form>
    </div>

    <!-- Mensajes de estado -->
    <div v-if="mensaje" class="mensaje" :class="tipoMensaje">
        {{ mensaje }}
    </div>
</div>
</template>

<script>
import { actualizarFachada } from "../clients/EstudianteClient.js";

export default {
    data() {
        return {
            actualizarEstudiante: {
                id: null,
                nombre: '',
                apellido: '',
                fechaNacimiento: '',
                genero: ''
            },
            mensaje: '',
            tipoMensaje: ''
        }
    },
    methods: {
        async actualizar() {
            try {
                const estudianteToBody = {
                    nombre: this.actualizarEstudiante.nombre,
                    apellido: this.actualizarEstudiante.apellido,
                    fechaNacimiento: this.actualizarEstudiante.fechaNacimiento + 'T00:00:00',
                    genero: this.actualizarEstudiante.genero
                };
                await actualizarFachada(estudianteToBody, this.actualizarEstudiante.id);
                this.mostrarMensaje('Estudiante actualizado exitosamente', 'success');
                
            } catch (error) {
                this.mostrarMensaje('Error al actualizar el estudiante: ' + error.message, 'error');
            }
        },
        mostrarMensaje(texto, tipo) {
            this.mensaje = texto;
            this.tipoMensaje = tipo;
            setTimeout(() => {
                this.mensaje = '';
                this.tipoMensaje = '';
            }, 5000);
        },
       
        volver() {
            this.$router.push('/estudiante');
        }
    }
}
</script>
<style scoped>
.estudiante-container {
    max-width: 500px;
    margin: 40px auto;
    padding: 30px;
    font-family: 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #ececec 0%, #bdbdbd 100%);
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(60,60,60,0.12);
    text-align: left;
}

.form-section {
    padding: 24px;
    border-radius: 12px;
    background-color: #f5f5f5;
    box-shadow: 0 2px 8px rgba(80,80,80,0.08);
    text-align: left;
}

.form-group {
    margin-bottom: 18px;
    text-align: left;
}

.form-group label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
    color: #424242;
    letter-spacing: 0.5px;
    text-align: left;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 12px;
    border: 1px solid #bdbdbd;
    border-radius: 6px;
    font-size: 15px;
    background-color: #eeeeee;
    transition: border-color 0.2s, box-shadow 0.2s;
    color: #212121;
    box-shadow: 0 1px 4px rgba(60,60,60,0.07);
}

.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-color: #757575;
    box-shadow: 0 0 8px rgba(60,60,60,0.18);
}

.button-group {
    display: flex;
    gap: 12px;
    margin-top: 24px;
    justify-content: flex-end;
}

button {
    background: linear-gradient(90deg, #757575 0%, #bdbdbd 100%);
    color: #fff;
    padding: 12px 28px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 17px;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(60,60,60,0.12);
    transition: background 0.3s, box-shadow 0.3s;
    text-align: left;
}

button:hover {
    background: linear-gradient(90deg, #616161 0%, #bdbdbd 100%);
    box-shadow: 0 4px 16px rgba(60,60,60,0.18);
}

.btn-secondary {
    background: linear-gradient(90deg, #9e9e9e 0%, #e0e0e0 100%);
    color: #fff;
}

.btn-secondary:hover {
    background: linear-gradient(90deg, #616161 0%, #e0e0e0 100%);
}

.mensaje {
    margin-top: 24px;
    padding: 16px;
    border-radius: 6px;
    font-weight: 600;
    text-align: left;
    font-size: 16px;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 8px rgba(60,60,60,0.10);
}

.mensaje.success {
    background-color: #e0f2f1;
    color: #388e3c;
    border: 1px solid #81c784;
}

.mensaje.error {
    background-color: #ffebee;
    color: #c62828;
    border: 1px solid #ef9a9a;
}
</style>
