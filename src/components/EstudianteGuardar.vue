<template>
<div class="estudiante-container">
    <h2>Guardar Nuevo Estudiante</h2>
    
    <div class="form-section">
        <form @submit.prevent="guardar()">
            <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" v-model="nuevoEstudiante.nombre" required>
            </div>
            <div class="form-group">
                <label for="apellido">Apellido:</label>
                <input type="text" id="apellido" v-model="nuevoEstudiante.apellido" required>
            </div>
            <div class="form-group">
                <label for="fechaNacimiento">Fecha de Nacimiento:</label>
                <input type="date" id="fechaNacimiento" v-model="nuevoEstudiante.fechaNacimiento" required>
            </div>
            <div class="form-group">
                <label for="genero">Género:</label>
                <select id="genero" v-model="nuevoEstudiante.genero" required>
                    <option value="">Seleccione...</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                </select>
            </div>
            <div class="button-group">
                <button type="submit">Guardar Estudiante</button>
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
import { guardarFachada } from "../clients/EstudianteClient.js";

export default {
    data() {
        return {
            nuevoEstudiante: {
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
        async guardar() {
            try {
                const estudianteToBody = {
                    nombre: this.nuevoEstudiante.nombre,
                    apellido: this.nuevoEstudiante.apellido,
                    fechaNacimiento: this.nuevoEstudiante.fechaNacimiento + 'T00:00:00',
                    genero: this.nuevoEstudiante.genero
                };
                await guardarFachada(estudianteToBody);
                this.mostrarMensaje('Estudiante guardado exitosamente', 'success');
                
            } catch (error) {
                this.mostrarMensaje('Error al guardar el estudiante: ' + error.message, 'error');
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
