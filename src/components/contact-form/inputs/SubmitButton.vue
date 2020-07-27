<template>
  <button class="cf-submit-button">
    <p class="button-text">
      <slot></slot>
    </p>
  </button>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.cf-submit-button {
  border: 1px solid $borderColor;
  padding: 2px 40px;
  width: 100%;
  min-width: 100px;
  font-size: 16px;
  background: transparent;
  color: $backgroundColor;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  outline: none !important;
  &:hover {
    border-color: $hivexBlue;
    color: $hivexBlue;
    cursor: pointer;
  }
  &:active {
    background: $hivexBlue;
    border-color: $hivexBlue;
    color: $white;
  }
  &:focus {
    background: $hivexBlue;
    border-color: $hivexBlue;
    color: $white;
  }
  .button-text {
    letter-spacing: 6px;
  }
}
</style>
