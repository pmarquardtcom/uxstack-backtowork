<template>
  <div class="step-wrapper">
    <div class="step-content">
      <h1 class="step-title">{{ getCurrentStep().question }}</h1>
      CANVAS MIT LINIENWERKZEUG...
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {},

  data() {
    return {}
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
  },
}
</script>

<style lang="scss">
.step-wrapper {
  display: flex;
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
.step-title {
  margin-bottom: 95px;
}

@media screen and (min-width: 1000px) {
  .step-title {
    width: 86%;
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
