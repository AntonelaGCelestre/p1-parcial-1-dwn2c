let discos = [];

// Función para buscar por nombre de disco y autor//
function buscarPorNombreAutor(nombreDisco, autor) {
  for(let i = 0; i < discos.length; i++) {
    if(discos[i].nombre === nombreDisco && discos[i].autor === autor) {
      return true;
    }
  }
  return false;
}

//Función para buscar por código//
function buscarPorCodigo(codigo) {
  for(let i = 0; i < discos.length; i++) {
    if(discos[i].codigo === codigo) {
      return true;
    }
  }
  return false;
}

// Para cargar todo lo del Disco//
function cargar() {
  let disco = {};
  let codigoExistente = true;
  let maxDuracion = 0;
  
  while(codigoExistente) {
    let codigo = parseInt(prompt("Ingrese el código numérico único del disco (entre 1 y 999):"));
    
    if(codigo >= 1 && codigo <= 999 && !buscarPorCodigo(codigo)) {
      disco.codigo = codigo;
      codigoExistente = false;
    } else {
      alert("El código ingresado ya fue utilizado o no es válido.");
    }
  }
  
  disco.nombre = prompt("Ingrese el nombre del disco:");
  disco.autor = prompt("Ingrese el autor o banda del disco:");
  
  // Se verifica si el disco ya ha sido ingresado//
  if(buscarPorNombreAutor(disco.nombre, disco.autor)) {
    alert("El disco o el autor ingresado ya existe.");
    return;
  }
  
  disco.pistas = [];
  let cargarPistas = true;
  
  while(cargarPistas) {
    let pista = {};
    
    pista.nombre = prompt("Ingrese el nombre de la pista:");
    
    if(pista.nombre === "") {
      alert("El nombre de la pista no puede quedar vacío.");
      continue;
    }
    
    let duracion = parseInt(prompt("Ingrese la duración de la pista en segundos (entre 0 y 7200):"));
    
    if(duracion >= 0 && duracion <= 7200) {
      pista.duracion = duracion;
      if (pista.duracion > maxDuracion) {
        maxDuracion = pista.duracion;
      }
    } else {
      alert("La duración de la pista debe estar entre 0 y 7200 segundos inclusive.");
      continue;
    }
    
    disco.pistas.push(pista);
    
    let confirmarPista = confirm("¿Desea ingresar otra pista?");
    
    if(!confirmarPista) {
      cargarPistas = false;
    }
  }
  
  if(disco.pistas.length === 0) {
    alert("Debe ingresar al menos una pista.");
    return;
  }
  
  discos.push(disco);
  alert("Disco cargado con éxito.");
  
  console.log(`La duración máxima de este disco es de ${maxDuracion} segundos`);
}

// Se muestran los datos cargados del Disco. Inserto html y agrego color para los requisitos requeridos//
function mostrar() {
  let html = "<h2>Listado de discos</h2>";
  let maxDuracion = maxDuracionDisco();

  discos.forEach(disco => {
    html += `<u>Nombre del disco:</u> ${disco.nombre}<br>
      <u>Autor o banda del disco:</u> ${disco.autor}<br>
      <u>Código numérico único del disco:</u> ${disco.codigo}<br>
      <u>Pistas:</u><br>`;
    
    disco.pistas.forEach(pista => {
      if(pista.duracion > 180) {
        html += `<span style="color:red;">${pista.nombre} (${pista.duracion} segundos)</span><br>`;
      } else {
        html += `${pista.nombre} (${pista.duracion} segundos)<br>`;
      }
    });
    
    html += "<br>";
  });
  
  html += `<span style="color:green;">La duración máxima de entre todas las pistas es de: (${maxDuracion} segundos)</span><br>`;

  document.getElementById("listado-discos").innerHTML = html;
}

// Calculo Máxima duración //
function maxDuracionDisco() {
  let maxDuracion = 0;

  discos.forEach(disco => {
    disco.pistas.forEach(pista => {
      if (pista.duracion > maxDuracion) {
        maxDuracion = pista.duracion;
      }
    })
  });
  
  return maxDuracion;
}
