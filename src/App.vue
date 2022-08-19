<script lang="ts" setup>
import { onMounted } from "vue";
import NavigationBar from "./components/NavigationBar.vue";
import Vue from 'vue';
import AppPopup from "./components/AppPopup.vue";
import store from '@/store';

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
    <!--
      Narrower viewpoint for wide screens so content is not stretched
      too much
    -->
    <div class="container is-max-desktop">
      <NavigationBar />
      <!--
        :key is for resetting the view when navigating to
        a subroute of the same route (such as a query)
      -->
      <router-view :key="$route.fullPath"/>
    </div>
    <div class="popup-block">
      <!--
        Popup notifications in the corner of the screen
      -->
      <AppPopup v-for="popup in store.getters.popups"
      :message="popup.message" 
      :color="popup.color"
      :id="store.getters.popups.indexOf(popup)"
      :key="store.getters.popups.indexOf(popup)" />
    </div>
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
  width: 20rem;
  filter: opacity(0.7);
}
</style>
