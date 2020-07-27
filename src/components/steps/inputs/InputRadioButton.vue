<template>
  <div>
    <div class="frm_radio radio">
      <label
        ><input :id="value" :key="value" type="radio" name="RadioGroup"/>
        <slot></slot>
        <span class="label-visible"><span class="fake-radiobutton"></span></span
      ></label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss">
.frm_radio {
  display: block;
  position: relative;
  margin: 30px 0 !important;
}

.frm_radio input {
  position: absolute;
  margin: 5px;
  padding: 0;
  visibility: hidden;
}

/* Radio Buttons 1 */
.frm_radio .label-visible {
  margin-left: 3em;
  margin-bottom: 0;
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
    }
  }
}

.frm_radio label {
  padding-left: 60px;
  text-transform: uppercase;
  font-size: 20px;
  letter-spacing: 4px;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
      color: $hivexBlue;
      transition: all 0.2s ease-in-out;
      .fake-radiobutton {
        border-color: $hivexBlue;
      }
    }
  }
  @media only screen and (max-width: 576px) {
    font-size: 14px;
    padding-left: 50px;
  }
}

.fake-radiobutton {
  position: absolute;
  display: block;
  top: -5px;
  left: 3px;
  width: 30px;
  height: 30px;
  border: 1px solid #d8d8d8;
  background-color: #0a1835;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
}
.fake-radiobutton:after {
  content: '';
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 22px;
  height: 22px;
  background: $hivexBlue;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 50%;
}

.active input[type='radio'] + span .fake-radiobutton:after {
  display: block;
}
.not-active input[type='radio'] + span .fake-radiobutton:after {
  display: none;
}
</style>
