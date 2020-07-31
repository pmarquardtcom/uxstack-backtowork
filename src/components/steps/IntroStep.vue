<template>
  <div>
    <div style="height:100vh">
      <div class="first-container">
        <h2>Welcome to the Back to Work Calculator!<br /></h2>
        <p style="font-size:16px;">
          The corona virus (COVID-19) forced many organisations to work from home and has
          challenged the way we have used offices in the past. We want to help you plan
          the step from working from home, back to the office. So your seating plan will
          be your best friend on how to make your workplace safe and people comfortable to
          return to their desk.
          <br /><br />
          It's completely free and in 3 easy steps all done. We maximize the number of
          useable seats on your floor plan while maintaining a 2 meter distance.
          <br /><br />
          UXstack is interested in analyzing and understanding what affect spatial
          features of the office have on the human wellbeing and productivity. So we
          thought, why not help out others in challenging times. Yes, just like that.
        </p>
        <SubmitButton class="next-button" style="width: 50%" @click.native="nextStep()"
          >START NOW</SubmitButton
        >
        <p style="opacity:0.7">
          <br /><br />Disclaimer:<br />The information given by the Service is for general
          guidance on matters of interest only. Even if UXstack takes every precaution to
          insure that the content of the 'Back to Work Calculator' is both current and
          accurate, errors can occur. Plus, given the changing nature of laws, rules and
          regulations, there may be delays, omissions or inaccuracies in the information
          contained on the 'Back to Work Calculator'.<br />UXstack will not be liable to
          You or anyone else for any decision made or action taken in reliance on the
          information given by the 'Back to Work Calculator' or for any consequential,
          special or similar damages, even if advised of the possibility of such damages.
          <br /><br />
          <a href="https://www.uxstack.design/imprint/" target="_blank">Imprint</a> |
          <a href="https://www.uxstack.design/privacy/" target="_blank">Privacy</a> |
          <a v-show="gaActive" href="#" @click.prevent="disableTracking"
            >Disable GoogleAnalytics</a
          >
          <a v-show="!gaActive" href="#" @click.prevent="enableTracking"
            >Enable GoogleAnalytics</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SubmitButton from '@/components/steps/inputs/SubmitButton.vue'

export default {
  components: { SubmitButton },
  data() {
    return { gaActive: true }
  },
  mounted() {
    this.$ga.page('/')
  },
  methods: {
    ...mapActions(['next', 'prev']),
    getCurrentStep: function() {
      return this.$store.getters.getStepObject(this.$store.getters.getCurrentStepNumber)
    },
    nextStep: function(choice) {
      this.next(choice)
    },
    previousStep: function() {
      this.prev()
    },
    disableTracking: function() {
      this.$ga.disable()
      this.gaActive = false
      alert('Tracking disabled')
    },
    enableTracking: function() {
      this.$ga.enable()
      this.gaActive = true
      alert('Tracking enabled')
    },
  },
}
</script>

<style lang="scss" scoped>
.submit-button {
  margin-right: 10px;
  margin-top: 10px;
  bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
.step-wrapper {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: column !important;
  height: 70vh;
  padding-right: 100px;
  @media screen and (min-width: 769px) and (max-width: 1440px) {
    min-height: 70vh;
    height: auto;
    padding-right: 10px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 40px;
    height: auto;
    padding-right: 10px;
  }
}
.first-container {
  padding: 60px;
  width: 40%;
  float: left;
}
.second-container {
  width: 40%;
  padding: 60px;
  float: right;
  .floor-image {
    width: 100%;
    @media screen and (max-width: 768px) {
      width: 100%;
      margin: 0 auto;
    }
  }
}
@media screen and (max-width: 1300px) {
  .first-container {
    width: 90%;
    padding: 10px;
    float: none;
    h2,
    p {
      hyphens: auto;
    }
  }
  .second-container {
    width: 90%;
    padding: 10px;
    float: none;
    margin-bottom: 120px;

    iframe {
      width: 100%;
    }
  }
}
.step-title {
  margin-bottom: 95px;
}

@media screen and (min-width: 1000px) {
  .step-title {
    width: 100%;
  }
}

.step-content {
  margin-bottom: auto;
  flex: 2;
}
.step-back {
  margin-top: auto;
}
</style>
