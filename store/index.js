// store/index.js
export const state = () => ({
    score: 0,
    lives: 3,
    gameOver: false,
  });
  
  export const mutations = {
    incrementScore(state) {
      state.score += 10;
    },
    decrementLives(state) {
      state.lives -= 1;
    },
    setGameOver(state, status) {
      state.gameOver = status;
    },
  };
  
  export const actions = {
    incrementScore({ commit }) {
      commit('incrementScore');
    },
    decrementLives({ commit }) {
      commit('decrementLives');
    },
    setGameOver({ commit }, status) {
      commit('setGameOver', status);
    },
  };
  