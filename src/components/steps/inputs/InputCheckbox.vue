<template>
  <button id="value" :key="value" class="input-checkbox">
    <p class="button-text">
      {{ value }}
    </p>
  </button>
</template>

<script>
export default {
  props: {
    value: String,
  },
}
</script>

<style lang="scss" scoped>
.input-checkbox {
  height: auto;
  border: 1px solid #55627c;
  padding: 20px 30px;
  width: auto;
  min-width: 100px;
  font-size: 18px;
  margin-right: 30px;
  margin-bottom: 30px;
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

  &.active {
    background: $hivexBlue;
    border-color: $hivexBlue;
    color: $white;
  }

  .button-text {
    letter-spacing: 6px;
    text-transform: uppercase;
    font-weight: 400;
  }
  @media only screen and (max-width: 576px) {
    width: 100%;
    margin-right: 0;
    font-size: 14px;
    padding: 20px 0px;
  }
}
</style>
