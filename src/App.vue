<template>
  <v-app>
    <v-main>
      <MainPage />
    </v-main>
    <v-btn
      class="ma-2"
      icon="mdi-theme-light-dark"
      location="top right"
      position="absolute"
      @click="$vuetify.theme.cycle()"
    />
  </v-app>
</template>

<script lang="ts" setup>
  import MainPage from '@/components/MainPage.vue'
</script>
