export async function leerArchivo() {
  try {
    // const response = await fetch("src/assets/diarioGregCompleto.txt");
    // const response = await fetch("src/assets/diarioGregCorto.txt");
    const response = await fetch("src/assets/el_quijote.txt");
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Error al leer el archivo:", error);
  }
}