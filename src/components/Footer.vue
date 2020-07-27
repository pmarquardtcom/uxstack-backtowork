<template
  ><footer id="footer">
    <a class="imprint-link" href="https://uxstack.design/impressum/" target="_blank"
      >Impressum</a
    ><a class="privacy-link" href="https://uxstack.design/datenschutz/" target="_blank"
      >Datenschutz</a
    >
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss">
#footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  color: $hivexBlue;
  padding: 20px 20px;
  a {
    color: $hivexBlue;
    &:hover {
      color: $hivexBlue;
    }
  }
  .imprint-link {
    padding: 0 40px;
  }
  @media only screen and (max-width: 576px) {
    display: none;
  }
}
</style>
