<template>
  <header id="header">
    <div class="left-header">
      <a id="logo" href="https://backtowork.uxstack.design/">
        <img src="@/assets/img/uxstack-logo.jpg" alt="UXstack" class="hivex-logo" />
        <span
          style="border-left:1px solid #0277bd; padding-left:10px;display:inline-block"
          >Back to Work Calculator<br /><strong>BETA</strong></span
        >
      </a>
    </div>

    <div class="right-header">
      <a id="closeButton" href="https://uxstack.design/">
        <img src="@/assets/img/close-icon.svg" alt="Close" />
      </a>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss">
#header {
  box-shadow: 0px 2px 4px rgba(102, 102, 102, 0.25);
  padding-top: 20px;
  height: 60px;
  background-color: $white;
  margin-bottom: 10px;

  .left-header {
    width: auto;
    float: left;
  }
  .right-header {
    width: auto;
    float: right;
    @media only screen and (max-width: 576px) {
      display: none;
    }
  }
  .hivex-logo {
    display: inline-block;
    width: 120px;
    margin-left: 40px;
    padding-right: 8px;
    @media only screen and (max-width: 576px) {
      margin-left: 10px;
    }
  }
  #logo {
    padding-top: 20px;
    padding-left: 20px;
    @media only screen and (max-width: 768px) {
      padding-left: 10px;
    }
    @media only screen and (max-width: 576px) {
      padding-left: 5px;
    }
  }
  #closeButton {
    float: right;
    padding-top: 6px;
    padding-right: 20px;

    svg {
      @media only screen and (max-width: 768px) {
        width: 40px;
      }
      &:hover path {
        transition: all 0.2s ease-in-out;
        stroke-width: 2;
      }
    }
  }
  @media only screen and (max-width: 576px) {
    margin-bottom: 20px;
  }
}
</style>
