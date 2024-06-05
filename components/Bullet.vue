<template>
  <div class="bullet" :style="{ bottom: y + 'px', left: x + 'px' }"></div>
</template>

<script>
export default {
  props: ['x', 'y'],
};
</script>

<style scoped>
.bullet {
  position: absolute;
  width: 5px;
  height: 20px;
  background-color: yellow;
}
</style>
