//deberia ser del backend
export function obtenerPaginasPermitidas(usuario){
    let arreglo;
    if(usuario === 'admin'){
        //Paginas del admin
        arreglo = ['/about','/estudiante','/notas','/403','/home'];
        console.log("entro como admin");
    }
    if(usuario === 'estudiante'){
        //paginas de estudiante
         arreglo = ['/about','/estudiante','/403','/home'];
         console.log("entro como estudiante");
    }
    return arreglo;
}