import axios from "axios";  

const URL = 'http://localhost:8081/api/matricula/v1/estudiantes';
//Guarda
// public void guardar(@RequestBody EstudianteTo estudianteTo)
const guardar = async (body) => {
    const data = axios.post(`${URL}`, body).then(resp => resp.data);
    console.log("guardar", data);
}
//buscar todos
// public List<EstudianteTo> buscarTodos()
const buscarTodos = async () => {
    const data = await axios.get(`${URL}`).then(resp => resp.data);
    return data;
}

//actualiza
// public void actualizar(@RequestBody EstudianteTo estudianteTo)
const actualizar = async (body,id) => {    
    axios.put(`${URL}/${id}`, body).then(resp => resp.data);
}       

//actualizarParcial
// public void actualizarParcial(@RequestBody EstudianteTo estudianteTo, @PathVariable("id") Long id)
const actualizarParcial = async (body,id) => {    
   axios.patch(`${URL}/${id}`, body).then(resp => resp.data);
}
//eliminar
// public void eliminar(@PathVariable("id") Long id)
const borrar = async (id) => {    
    axios.delete(`${URL}/${id}`).then(resp => resp.data);
}   




//Fachada
export const guardarFachada = async (body) => {
    await guardar(body);
}
export const BucarTodosFachada = async()=>{
    await buscarTodos();
}
export const actualizarFachada = async (body, id) => {
    await actualizar(body, id);
}
export const actualizarParcialFachada = async (body, id) => {
    await actualizarParcial(body, id);
}
export const borrarFachada = async (id) => {
    await borrar (id);
}
