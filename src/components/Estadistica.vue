<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="12" class="">
        <v-btn
          variant="tonal"
          class="my-5 btnGenerarText"
          @click="generarEstadistica"
        >
          GENERAR ESTADISTICA
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="Total de palabras"
          variant="solo-filled"
          readonly
          v-model="totalPalabras"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="Numero de palabras unicas"
          variant="solo-filled"
          readonly
          v-model="numPalabrasUnicas"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <p class="text-h6">Palabras unicas y su frecuencia</p>
        <v-virtual-scroll
          :height="300"
          :items="palabrasConFrecuencia"
        >
          <template v-slot:default="{ item }"> {{ item.palabra }} ({{ item.frecuencia }} veces, frecuencia relativa: {{ item.frecuenciaRelativa }}) </template>
        </v-virtual-scroll>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { leerArchivo } from '../utils/leerArchivo';

const totalPalabras = ref(0);
const numPalabrasUnicas = ref(0);
const palabrasDiferentes = ref([]);

const palabrasConFrecuencia = ref([]);

const generarEstadistica = async () => {
  console.log('Generar estadistica');
  const texto = await leerArchivo();
  const palabras = texto.split(/\s+/);
  const setPalabrasDiferentes = new Set(palabras);

  totalPalabras.value = palabras.length;
  numPalabrasUnicas.value = setPalabrasDiferentes.size;

  // Calcular la frecuencia de cada palabra
  const frecuenciaPalabras = {};
  palabras.forEach(palabra => {
    if (frecuenciaPalabras[palabra]) {
      frecuenciaPalabras[palabra]++;
    } else {
      frecuenciaPalabras[palabra] = 1;
    }
  });

  // Calcular la frecuencia relativa de cada palabra
  const frecuenciaRelativaPalabras = {};
  Object.keys(frecuenciaPalabras).forEach(palabra => {
    frecuenciaRelativaPalabras[palabra] = frecuenciaPalabras[palabra] / palabras.length;
  });

  // Crear objetos para cada palabra con su frecuencia absoluta y relativa
  const palabrasConFrecuenciaArray = Array.from(setPalabrasDiferentes).map(palabra => ({
    palabra,
    frecuencia: frecuenciaPalabras[palabra],
    frecuenciaRelativa: frecuenciaRelativaPalabras[palabra].toFixed(4),
  }));

  palabrasConFrecuencia.value = palabrasConFrecuenciaArray;
};
</script>

<style scoped>
.btnGenerarText {
  width: 100%;
}
</style>
