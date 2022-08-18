<script lang="ts" setup>
import { onMounted } from "vue";
import NavigationBar from "./components/NavigationBar.vue";
import Vue from 'vue';
import AppPopup from "./components/AppPopup.vue";

onMounted(() => {
  document.body.classList.add("has-navbar-fixed-top");
})
</script>
<script lang="ts">
export default Vue.extend({
  components: {
    NavigationBar
  }
})
</script>

<template>
  <div id="app" class="section">
    <div class="container is-max-desktop">
      <NavigationBar />
      <router-view :key="$route.fullPath"/>
    </div>
    <AppPopup :message="'Sample popup'" :color="'is-info'" 
    class="popup-block"/>
  </div>
</template>

<style lang="scss">
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
@import "../src/assets/fontawesome/fontawesome.min.css";
@import "../src/assets/fontawesome/solid.min.css";
.popup-block {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  max-width: 30rem;
}
</style>
