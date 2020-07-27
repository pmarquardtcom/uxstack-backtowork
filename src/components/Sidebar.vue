<template>
  <div id="hivex-factor">
    <div class="factor-icon"></div>
    <h2 class="hivex-title">{{ sidebarTitle }}</h2>
    <PercentageCircle
      v-if="getCurrentStep().id === 'Result'"
      :percentage="getPercentage()"
    />
    <p style="line-height:1.4em; font-weight:normal; " v-html="sidebarContent"></p>

    <SubmitButton class="next-button" @click.native="nextStep()">{{
      sidebarButton
    }}</SubmitButton>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SubmitButton from '@/components/steps/inputs/SubmitButton.vue'
import PercentageCircle from '@/components/PercentageCircle.vue'

export default {
  components: {
    SubmitButton,
    PercentageCircle,
  },
  props: {
    parentrefs: Object,
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      currentStepNumber: 'getCurrentStepNumber',
    }),
    sidebarContent: function() {
      return this.getStep(this.currentStepNumber).sidebarContent
    },
    sidebarTitle: function() {
      return this.getStep(this.currentStepNumber).sidebarTitle
    },
    sidebarButton: function() {
      return this.getStep(this.currentStepNumber).sidebarButton
    },
  },
  methods: {
    ...mapActions(['next', 'prev']),
    getCurrentStep: function() {
      return this.$store.getters.getStepObject(this.$store.getters.getCurrentStepNumber)
    },
    nextStep: function(choice) {
      if (this.$store.getters.getCurrentStepNumber === '3') {
        this.$parent.callCalc()
      }
      this.next(choice)
    },
    previousStep: function() {
      this.prev()
    },
    getPercentage: function() {
      return this.$store.getters.getPercentage
    },
    getStep: function(id) {
      return this.$store.getters.getStepObject(id)
    },
    getStepProgress: function(id) {
      return this.$store.getters.getStepObject(id).progress
    },
    goToStep: function(stepNumber) {
      this.$store.commit('goToStep', stepNumber)
    },
    setAnswer: function(answerStep, answer) {
      this.$store.commit('setAnswer', { answerStep, answer })
    },
  },
}
</script>

<style lang="scss">
#hivex-factor {
  position: relative;
  background: $white !important;
  min-width: 250px;
  padding: 20px 40px;
  box-shadow: 0px 2px 4px rgba(102, 102, 102, 0.25);
  color: $hivexBlue;
  h2 {
    font-size: 24px;
  }
  @media only screen and (max-width: 768px) {
    flex: 0;
    margin-top: 20px;
    margin-right: 20px;
    .next-button.submit-button {
      margin-right: 10px;
      margin-top: 10px;
      bottom: 10px;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  @media only screen and (max-width: 576px) {
    margin-top: 10px;
    margin-bottom: 40px;
    padding: 40px 20px;
  }
  .next-button {
    margin-top: 20px;
  }
}
</style>
