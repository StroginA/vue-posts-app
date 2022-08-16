<script lang="ts">
import UserSelect from "./components/UserSelect.vue";

export default {
  components: {
    UserSelect
  }
}
</script>

<template>
  <div id="app" class="section is-flex is-flex-direction-column">
    <div class="container is-max-widescreen">
      <div class="columns is-desktop">
        <UserSelect class="column is-one-third"/>
        <router-view class="column" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
@import "../src/assets/fontawesome/fontawesome.min.css";
@import "../src/assets/fontawesome/solid.min.css";
</style>
