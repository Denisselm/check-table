// Crear las referencias a los elementos
        // input, button, tbody, total, aprendidos, faltanPorAprender
        const conceptoInput = document.querySelector(".form-concepto input");
        const conceptoBoton = document.querySelector(".form-concepto button");
        const tbody = document.querySelector("table tbody");
        // Referencias del Resumen
        const totalSpan = document.querySelector(".resumen .total");
        const aprendidosSpan = document.querySelector(".resumen .aprendidos");
        const faltaPorAprenderSpan = document.querySelector(
            ".resumen .falta-por-aprender"
        );

        // Crear las variables globales necesarias
        const conceptos = [];

        // Crear una función para agregar nuevos conceptos
        const agregarConceptos = () => {
            // Tomar el value del input
            const conceptoInputValue = conceptoInput.value;
            // crear la entidad(object) del concepto
            const idAleatorio = Math.floor(Math.random() * (9999 - 1)) + 1;
            const concepto = {
                id: idAleatorio,
                descripcion: conceptoInputValue,
                estado: false
            };
            // Agregar el nuevo concepto al arreglo conceptos
            conceptos.push(concepto);
            conceptoInput.value = "";
        };

        // Agregar el evento click al botón, y utilices la función agregarConceptos
        // elemento, agregar un evento, el evento se llama click, la función de callback
        // va a invocar la función agregarConceptos

        // Crear una función que renderice/actualice la tabla con los conceptos actuales
        const actualizarTabla = () => {
            // Limpiar los registros de la tabla
            tbody.innerHTML = "";
            // Recorrer el arreglo de concpetos
            conceptos.forEach((concepto) => {
                // Crear el template de la nueva fila a la tabla
                const template = `
            <tr>
              <td>${concepto.id}</td>
              <td>${concepto.descripcion}</td>
              <td>
                  <input 
                  ${concepto.estado === true ? "checked" : ""}
                  onchange="actualizarEstadoDeUnConcepto(${concepto.id})"
                  type="checkbox"/>
                  <span
                  onclick="editarConcepto(${concepto.id})"> 🖊 </span>
                  <span
                   onclick="eliminarConcepto(${concepto.id})" > ❌ </span>
              </td>
            </tr>
          `;
                // Agregar la nueva fila a la tabla
                tbody.innerHTML += template;
            });
        };

        // Crear una función que actualice el resumen
        const actualizarResumen = () => {
            // Calcular el total de conceptos
            const cantidadTotalDeConceptos = conceptos.length;
            // Calcular cuántos conceptos se han aprendido
            const conceptosAprendidos = conceptos.filter(
                (concepto) => concepto.estado === true
            ).length;

            // Calcular cuántos conceptos faltan por aprender
            const conceptosFaltantesPorAprender = conceptos.filter(
                (concepto) => concepto.estado === false
            ).length;
            // Actualizar el resumen ocupando las referencias correspondientes
            totalSpan.innerHTML = cantidadTotalDeConceptos;
            aprendidosSpan.innerHTML = conceptosAprendidos;
            faltaPorAprenderSpan.innerHTML = conceptosFaltantesPorAprender;
        };

        //  Crear una función para eliminar conceptos
        const eliminarConcepto = (id) => {
            // Con el id(parámetro) se deberá eliminar el concpeto del arreglo
            // Ubicar el índice del elemento cuyo id sea igual al recibido
            const index = conceptos.findIndex((concepto) => concepto.id == id);
            conceptos.splice(index, 1);
            actualizarTabla();
            actualizarResumen();
        };

        // Crear una función para editar la descripcion de un concepto
        const editarConcepto = (id) => {
            // Encontrar el concepto que coincida con el id(parametro) recibido
            const conceptoEncontrado = conceptos.find(
                (concepto) => concepto.id == id
            );
            // Se guarda en una variable la descripción actual
            const descripcionActual = conceptoEncontrado.descripcion;
            // Se le pide al usuario con un prompt que modifique la descripción
            conceptoEncontrado.descripcion = prompt(
                "Modifica la descripción",
                descripcionActual
            );


            // Actualizar la tabla
            actualizarTabla();
        };

        // Crea una función que actualice el estado de un concepto y refresque el resumen
        const actualizarEstadoDeUnConcepto = (id) => {
            // Encontrar el concepto por el id
            const conceptoEncontrado = conceptos.find(
                (concepto) => concepto.id == id
            );
            // Cambiar el estado
            const estadoActual = conceptoEncontrado.estado;
            conceptoEncontrado.estado = !estadoActual;
            // Actualizar el resumen y la tabla
            actualizarTabla();
            actualizarResumen();
        };

        conceptoBoton.addEventListener("click", () => {
            agregarConceptos();
            actualizarTabla();
            actualizarResumen();
        });