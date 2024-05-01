<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="6">
        <v-text-field
          clearable
          label="Valor nGrama"
          variant="underlined"
          v-model="inputNGrama"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          clearable
          label="Tamaño texto"
          variant="underlined"
          v-model="inputLenText"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-col cols="12" class="text-center">
      <v-btn variant="tonal" class="my-5 btnGenerarText" @click="generarTexto">
        GENERAR TEXTO
      </v-btn>
      <v-textarea
        v-model="txtTextoGenerado"
        label="Texto generado"
        variant="outlined"
      ></v-textarea>
      <v-btn variant="tonal" class="my-5 btnGenerarText" @click="limpiarCampos">
        LIMPIAR CAMPOS
      </v-btn>
    </v-col>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { leerArchivo } from "../utils/leerArchivo";

const inputNGrama = ref("");
const inputLenText = ref("");
const txtTextoGenerado = ref("");

const limpiarCampos = () => {
  inputNGrama.value = "";
  inputLenText.value = "";
  txtTextoGenerado.value = "";
};

const generarTexto = async () => {
  // console.log("Valores de: ", inputNGrama.value, inputLenText.value);
  const texto = await leerArchivo();
  const palabrasDiferentes = extraerPalabrasDiferentes(texto.toString());
  const matriz = generarListaProbabilidades(palabrasDiferentes);
  llenarListaProbabilidades(
    matriz,
    palabrasDiferentes,
    texto.toString(),
    inputNGrama.value
  );
  const matrizFA = generarListaFrecuenciasAcumuladas(matriz);
  console.log(matrizFA);
  const textoGenerado = generarTextoAleatorio(
    matrizFA,
    palabrasDiferentes,
    inputLenText.value
  );
  txtTextoGenerado.value = textoGenerado;
};

function extraerPalabrasDiferentes(texto) {
  const palabras = texto.split(/\s+/);
  const palabrasDiferentes = new Set(palabras);
  console.log(`Palabras diferentes: ${palabrasDiferentes.size}`);
  console.log(`Palabras totales: ${palabras.length}`);
  console.log(`Las palabras diferentes son: ${Array.from(palabrasDiferentes)}`);
  return palabrasDiferentes;
}

function generarListaProbabilidades(palabrasDiferentes) {
  const matriz = [];
  palabrasDiferentes.forEach((palabra) => {
    const fila = [];
    palabrasDiferentes.forEach((palabra2) => {
      fila.push(0);
    });
    matriz.push(fila);
  });

  return matriz;
}

function llenarListaProbabilidades(
  matriz,
  palabrasDiferentes,
  contenido,
  nGrama
) {
  const palabras = contenido.split(/\s+/);

  for (let i = 0; i < palabras.length - nGrama; i++) {
    const palabra = palabras[i];
    const palabra2 = palabras[i + 1];
    const indice1 = Array.from(palabrasDiferentes).indexOf(palabra);
    const indice2 = Array.from(palabrasDiferentes).indexOf(palabra2);

    if (indice1 !== -1 && indice2 !== -1) {
      matriz[indice1][indice2] += 1;
    }
  }
}

function generarListaFrecuenciasAcumuladas(matriz) {
  const matrizFA = matriz.map((fila) => [...fila, 0]);

  const filas = matrizFA.length;
  const columnas = matrizFA[0].length;

  for (let fila = 0; fila < filas; fila++) {
    let suma = 0;
    for (let i = 0; i < columnas - 1; i++) {
      if (matrizFA[fila][i] > 0) {
        suma += matrizFA[fila][i];
        matrizFA[fila][columnas - 1] = suma;
        matrizFA[fila][i] = suma;
      }
    }
  }

  return matrizFA;
}

function generarTextoAleatorio(matrizFA, palabrasDiferentes, nPalabras) {
  const textosGenerados = [];

  for (let i = 0; i < 1; i++) {
    console.log(`Texto ${i + 1}: generado`);
    let palabra = "el";
    let texto = "";

    for (let j = 0; j < nPalabras; j++) {
      const indice = Array.from(palabrasDiferentes).indexOf(palabra);
      const numero = Math.floor(
        Math.random() * matrizFA[indice][matrizFA[indice].length - 1]
      );

      for (let k = 0; k < matrizFA[indice].length - 1; k++) {
        if (numero < matrizFA[indice][k]) {
          palabra = Array.from(palabrasDiferentes)[k];
          texto += palabra + " ";
          break;
        }
      }
    }
    // console.log(texto);
    textosGenerados.push(texto);
  }

  return textosGenerados;
}
</script>

<style scoped>
.btnGenerarText {
  width: 100%;
}
</style>
