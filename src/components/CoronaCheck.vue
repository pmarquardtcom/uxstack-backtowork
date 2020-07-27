<template>
  <div id="corona-check" ref="coronacheck" :class="currentStepNumber()">
    <IntroStep v-show="currentStepNumber() === 'IntroStep'" />

    <Sidebar v-show="hideSidebar()" class="hivex-factor-wrapper" :parentrefs="$refs" />
    <ContactForm
      v-show="currentStepNumber() === 'Akquisition'"
      class="contact-form-wrapper"
    />
    <div class="qa-wrapper">
      <MyCanvas
        v-if="currentStepNumber() != 'Akquisition' && currentStepNumber() != 'IntroStep'"
        ref="mycanvas"
        :bus="bus"
        :bus2="bus2"
        style="width: 100%; height: auto;"
      >
      </MyCanvas>
      <AkquisitionStep v-show="currentStepNumber() === 'Akquisition'" />
    </div>
    <div class="mobile-footer"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import IntroStep from '@/components/steps/IntroStep.vue'

import MyCanvas from '@/components/canvas/Canvas.vue'

import Sidebar from '@/components/Sidebar.vue'
import ContactForm from '@/components/ContactForm.vue'
//import ScaleDefinition from '@/components/steps/ScaleDefinition.vue'
//import WorkplacePlacement from '@/components/steps/WorkplacePlacement.vue'
//import ResultStep from '@/components/steps/ResultStep.vue'
import AkquisitionStep from '@/components/steps/AkquisitionStep.vue'

export default {
  components: {
    IntroStep,
    AkquisitionStep,
    Sidebar,
    ContactForm,
    MyCanvas,
  },
  props: { bus2: Object },

  data() {
    return {
      bus: new Vue(),
    }
  },
  methods: {
    currentStepNumber: function() {
      return this.$store.getters.getCurrentStepNumber
    },
    getCurrentStep: function() {
      return this.$store.getters.getStepObject(this.$store.getters.getCurrentStepNumber)
    },
    getStep: function(id) {
      return this.$store.getters.getStepObject(id)
    },
    callCalc: function() {
      this.bus.$emit('calculateAll')
    },
    hideSidebar: function() {
      if (
        this.currentStepNumber() === 'Akquisition' ||
        this.currentStepNumber() === 'IntroStep'
      ) {
        return false
      } else {
        return true
      }
    },
  },
}
</script>

<style lang="scss">
#corona-check {
  display: flex;
  min-height: calc(100vh - (240px));
  height: auto;
  align-items: stretch;
  margin-top: auto;
  margin-bottom: auto;
  @media only screen and (max-width: 1024px) {
    padding-left: 20px;
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
  @media only screen and (max-width: 576px) {
    padding-left: 20px;
    display: block;
    padding-right: 20px;
  }
}
.qa-wrapper {
  display: flex;
  flex-direction: column;
  flex: 4;
  float: left;
  padding-left: 40px;
  padding-right: 40px;

  @media only screen and (max-width: 1023px) {
    flex: 4;
    margin-right: 20px;
    float: unset;
    padding-right: 0;
  }
  @media only screen and (max-width: 768px) {
    flex: 4;
    margin-top: 20px;
    margin-right: 40px;
    float: unset;
    padding-right: 0;
  }
  @media only screen and (max-width: 567px) {
    margin-right: 20px;
    float: unset;
    margin-bottom: 120px;
    padding-left: 0;
  }
}
.hivex-factor-wrapper {
  flex: 1;
}
.contact-form-wrapper {
  flex: 1;
}

.mobile-footer {
  display: none;
  @media only screen and (max-width: 768px) {
    display: block;
    width: 100%;
    height: 80px;
    position: fixed;
    z-index: 4;
    bottom: 0;
    left: 0;
    padding-top: 10px;
    background-color: white;
  }
}
</style>
