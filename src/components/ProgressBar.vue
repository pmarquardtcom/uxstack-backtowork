<template>
  <div>
    <div class="progress-bar">
      <div class="progress" :style="{ width: progressWidth + '%' }"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    progressWidth: {
      type: String,
      default: '0',
    },
  },

  data() {
    return {}
  },
}
</script>

<style lang="scss">
.progress-bar {
  position: fixed;
  border: 1px solid $hivexBlue;
  width: 100%;
  height: 16px;
  bottom: 0;
  box-sizing: border-box;
  background-color: $backgroundColor;
  .progress {
    transition: all 0.4s ease-in-out;

    height: 16px;
    background-color: $hivexBlue;
  }
  @media only screen and (max-width: 768px) {
    position: fixed;
    z-index: 5;
    bottom: 80px;
    left: 0;
    width: 100%;
  }
}
</style>
