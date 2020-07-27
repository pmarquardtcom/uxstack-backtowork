<template>
  <div class="step-wrapper result-step-wrapper">
    <div class="step-content result-step">
      <h1 class="step-title" style="margin-bottom:0px;">
        {{ getStep(currentStepNumber).title }}
        HEATMAP
      </h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      answers: 'getAnswers',
    }),
  },
  methods: {
    getStep: function(id) {
      return this.$store.getters.getStepObject(id)
    },
  },
  data() {
    return {
      currentStepNumber: 'Result',
    }
  },
}
</script>

<style lang="scss"></style>
