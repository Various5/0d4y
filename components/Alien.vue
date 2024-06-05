<template>
  <div class="alien" :style="{ top: y + 'px', left: x + 'px' }"></div>
</template>

<script>
export default {
  props: ['x', 'y'],
};
</script>

<style scoped>
.alien {
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: red;
}
</style>
