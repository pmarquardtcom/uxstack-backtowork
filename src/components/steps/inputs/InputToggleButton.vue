<template>
  <button class="input-toggle-button">
    <p class="button-text">{{ inputText }}</p>
  </button>
</template>

<script>
export default {
  props: {
    inputText: String,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.input-toggle-button {
  margin: 0;
  box-sizing: content-box;
  height: 60px;
  border: 1px solid #55627c;
  padding: 10px 20px;
  width: auto;
  min-width: 60px;
  font-size: 18px;
  background: transparent;
  color: white;
  transition: all 0.1s ease-in-out;
  outline: none !important;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: $hivexBlue;
      color: $hivexBlue;
      cursor: pointer;
    }
  }
  .input-toggle-button.active {
    background: $hivexBlue;
    border-color: $hivexBlue;
    color: $white !important;
  }
  &:active {
    background: $hivexBlue;
    border-color: $hivexBlue;
    color: $white !important;
  }

  .button-text {
    letter-spacing: 6px;
    text-transform: uppercase;
    font-weight: 400;
  }
  @media only screen and (max-width: 576px) {
    width: 91%;
    margin-right: 0;
    font-size: 14px;
    margin-bottom: 30px;
  }
}
</style>
