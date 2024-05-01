<template>
  <v-container class="fill-height">
    <v-row>
      <v-card>
        <v-toolbar color="primary" title="Práctica 4. Generador de textos">
        </v-toolbar>

        <div class="d-flex flex-row">
          <v-tabs v-model="tab" color="primary" direction="vertical">
            <v-tab
              prepend-icon="fa-solid fa-chart-line"
              text="I. Estadistica"
              value="estadistica"
            ></v-tab>
            <v-tab
              prepend-icon="fa-solid fa-font"
              text="II. Generador de texto"
              value="generadorTexto"
            ></v-tab>
          </v-tabs>

          <v-tabs-window v-model="tab" >
            <v-tabs-window-item value="estadistica" class="formGenerador">
              <v-card flat>
                <v-card-text>
                  <Estadistica />
                </v-card-text>
              </v-card>
            </v-tabs-window-item>

            <v-tabs-window-item value="generadorTexto" class="formGenerador">
              <v-card flat>
                <v-card-text>
                  <GeneradorTexto />
                </v-card-text>
              </v-card>
            </v-tabs-window-item>
          </v-tabs-window>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    tab: "estadistica",
  }),
};
</script>

<style scoped>
.formGenerador{
    width: 900px;
    height: 600px;
}
</style>