<template>
<div class="estudiante-container">
    <h2>Datos Estudiante</h2>
    
    <div class="form-section">
        <form @submit.prevent="actualizarParcial()">
            <div class="form-group">
                <label for="parcialId">ID del Estudiante:</label>
                <input type="number" id="parcialId" v-model.number="parcialEstudiante.id" required>
            </div>
            <div class="form-group">
                <label for="parcialNombre">Nombre:</label>
                <input type="text" id="parcialNombre" v-model="parcialEstudiante.nombre" >
            </div>
            <div class="form-group">
                <label for="parcialApellido">Apellido:</label>
                <input type="text" id="parcialApellido" v-model="parcialEstudiante.apellido" >
            </div>
          
            <div class="button-group">
                <button type="submit">Actualizar</button>
                 <button @click="borrar(id)">Borrar</button>
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
import { actualizarParcialFachada,borrarFachada } from "../clients/EstudianteClient.js";

export default {
    data() {
        return {
            parcialEstudiante: {
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
        async actualizarParcial() {
            try {
                // Crear objeto solo con los campos que tienen valor
                const estudianteToBody = {};
                
                if (this.parcialEstudiante.nombre && this.parcialEstudiante.nombre.trim() !== '') {
                    estudianteToBody.nombre = this.parcialEstudiante.nombre.trim();
                }
                
                if (this.parcialEstudiante.apellido && this.parcialEstudiante.apellido.trim() !== '') {
                    estudianteToBody.apellido = this.parcialEstudiante.apellido.trim();
                }
                
                if (this.parcialEstudiante.fechaNacimiento && this.parcialEstudiante.fechaNacimiento !== '') {
                    estudianteToBody.fechaNacimiento = this.parcialEstudiante.fechaNacimiento + 'T00:00:00';
                }
                
                if (this.parcialEstudiante.genero && this.parcialEstudiante.genero !== '') {
                    estudianteToBody.genero = this.parcialEstudiante.genero;
                }

                // Verificar que al menos un campo tenga valor
                if (Object.keys(estudianteToBody).length === 0) {
                    this.mostrarMensaje('Debe completar al menos un campo para actualizar', 'error');
                    return;
                }

                await actualizarParcialFachada(estudianteToBody, this.parcialEstudiante.id);
                
                const camposActualizados = Object.keys(estudianteToBody).join(', ');
                this.mostrarMensaje(`Campos actualizados exitosamente: ${camposActualizados}`, 'success');
                
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
     
       async borrar(){
        await this.borrarFachada(this.id);
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

