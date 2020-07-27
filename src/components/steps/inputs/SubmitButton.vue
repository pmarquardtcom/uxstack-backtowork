<template>
  <button class="submit-button"><slot></slot></button>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.submit-button.disabled {
  opacity: 0.5;
  transition: 0.2s all ease-in-out;
  &:hover {
    transform: unset;
    cursor: not-allowed;
  }
}
.submit-button {
  border: none;

  width: 100%;
  height: 60px;
  text-align: center;
  background: $hivexBlue;
  color: $white;
  font-size: 18px;
  font-weight: bold;
  border-radius: 2px;
  transition: 0.2s;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  @media only screen and (max-width: 768px) {
    position: fixed;
    z-index: 5;
    bottom: 0;
    right: 0;
    width: 160px;
    height: 60px;
    background-size: 140px;
    padding-right: 100px;
  }
}
</style>
