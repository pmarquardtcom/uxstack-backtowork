<template>
  <button name="prev_page" class="back-button">‹ BACK</button>
</template>

<script>
export default {}
</script>

<style lang="scss">
.back-button {
  color: $hivexBlue;
  border: 0;
  background: $backgroundColor;
  padding: 20px 0;
  margin-bottom: 10px;
  margin-left: 40px;
  text-align: left;
  transition: all 0.2s ease-in-out;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
      color: $hivexDarkBlue;
    }
  }

  @media only screen and (max-width: 768px) {
    position: fixed;
    z-index: 5;
    bottom: 0;
    left: 0;
    padding-left: 0;
    padding-right: 20px;
    margin-bottom: 12px;
    background: white;
  }
}
.error-back {
  color: white;
  border: 0;
  background: #0277bd;
  border-radius: 2px;
  font-weight: bold;
  padding: 10px 20px;
  display: block;
  margin: 0 auto;
  &:hover {
    color: white;
    transform: scale(1.05);
    transition: all 0.2s ease-in-out;
  }
}
</style>
