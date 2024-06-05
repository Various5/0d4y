<template>
  <div class="spaceship" :style="{ left: position + 'px' }"></div>
</template>

<script>
export default {
  data() {
    return {
      position: 200,
    };
  },
  mounted() {
    window.addEventListener('keydown', this.move);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.move);
  },
  methods: {
    move(event) {
      if (event.key === 'ArrowLeft' && this.position > 0) {
        this.position -= 10;
      } else if (event.key === 'ArrowRight' && this.position < 400) {
        this.position += 10;
      } else if (event.key === ' ') {
        this.$emit('shoot', this.position);
      }
    },
  },
};
</script>

<style scoped>
.spaceship {
  position: absolute;
  bottom: 10px;
  width: 50px;
  height: 50px;
  background-color: blue;
}
</style>
