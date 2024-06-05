<template>
  <div class="game">
    <Spaceship @shoot="shootBullet" />
    <Alien v-for="(alien, index) in aliens" :key="index" :x="alien.x" :y="alien.y" />
    <Bullet v-for="(bullet, index) in bullets" :key="index" :x="bullet.x" :y="bullet.y" />
    <div class="score">Score: {{ score }}</div>
    <div class="lives">Lives: {{ lives }}</div>
    <div v-if="gameOver" class="game-over">Game Over</div>
  </div>
</template>

<script>
import Spaceship from '~/components/Spaceship.vue';
import Alien from '~/components/Alien.vue';
import Bullet from '~/components/Bullet.vue';

export default {
  components: { Spaceship, Alien, Bullet },
  data() {
    return {
      bullets: [],
      aliens: [],
    };
  },
  computed: {
    score() {
      return this.$store.state.score;
    },
    lives() {
      return this.$store.state.lives;
    },
    gameOver() {
      return this.$store.state.gameOver;
    },
  },
  mounted() {
    this.initAliens();
    this.gameLoop = setInterval(this.updateGame, 50);
  },
  beforeDestroy() {
    clearInterval(this.gameLoop);
  },
  methods: {
    initAliens() {
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 10; col++) {
          this.aliens.push({ x: col * 40, y: row * 40 });
        }
      }
    },
    shootBullet(position) {
      this.bullets.push({ x: position + 22.5, y: 20 });
    },
    updateGame() {
      this.updateBullets();
      this.updateAliens();
    },
    updateBullets() {
      this.bullets.forEach((bullet, index) => {
        bullet.y += 5;
        if (bullet.y > 600) {
          this.bullets.splice(index, 1);
        }
      });
      this.checkCollisions();
    },
    updateAliens() {
      this.aliens.forEach((alien) => {
        alien.y += 1;
        if (alien.y > 550) {
          this.$store.dispatch('decrementLives');
          if (this.lives === 0) {
            this.$store.dispatch('setGameOver', true);
            clearInterval(this.gameLoop);
          }
        }
      });
    },
    checkCollisions() {
      this.bullets.forEach((bullet, bIndex) => {
        this.aliens.forEach((alien, aIndex) => {
          if (bullet.x > alien.x && bullet.x < alien.x + 30 && bullet.y > alien.y && bullet.y < alien.y + 30) {
            this.bullets.splice(bIndex, 1);
            this.aliens.splice(aIndex, 1);
            this.$store.dispatch('incrementScore');
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.game {
  position: relative;
  width: 500px;
  height: 600px;
  margin: 0 auto;
  background-color: black;
}
.score, .lives, .game-over {
  color: white;
  position: absolute;
  top: 10px;
  left: 10px;
}
.game-over {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
}
</style>
