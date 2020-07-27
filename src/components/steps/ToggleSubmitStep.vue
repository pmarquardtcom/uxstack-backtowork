<template>
  <div class="step-wrapper submit-step">
    <div class="step-content">
      <div>
        <h1 class="step-title">{{ getCurrentStep().question }}</h1>
        <div class="inner-content">
          <div class="answer-content">
            <InputToggleButton
              v-for="(choice, index) in getCurrentStep().choices"
              :key="index"
              :input-text="choice"
              :value="choice"
              :class="checkCurrentSelected(index)"
              @click.native="setCurrentSelected(index)"
            >
            </InputToggleButton>
          </div>
          <SubmitButton
            :disabled="choiceIndex != '' ? false : true"
            :class="choiceIndex != '' ? 'enabled' : 'disabled'"
            @click.native="nextStep(choiceIndex)"
          />
        </div>
      </div>
    </div>
    <div class="step-back">
      <BackButton @click.native="previousStep()" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SubmitButton from '@/components/steps/inputs/SubmitButton.vue'

import InputToggleButton from '@/components/steps/inputs/InputToggleButton.vue'
import BackButton from '@/components/steps/inputs/BackButton.vue'

export default {
  components: {
    InputToggleButton,
    BackButton,
    SubmitButton,
  },
  data() {
    return {
      choiceIndex: '',
      toggleDisabled: false,
    }
  },
  methods: {
    ...mapActions(['next', 'prev', 'calcResults']),
    getCurrentStep: function() {
      return this.$store.getters.getStepObject(this.$store.getters.getCurrentStepNumber)
    },
    setCurrentSelected: function(index) {
      this.choiceIndex = index.toString()
      this.$store.commit('setSelected', index)
    },
    checkCurrentSelected: function(index) {
      var currentSelected = this.getCurrentStep().selected
      if (currentSelected === index) {
        return 'active'
      } else {
        return 'not-active'
      }
    },
    nextStep: function(choice) {
      this.next(choice)
    },
    previousStep: function() {
      this.prev()
      setTimeout(() => {
        this.choiceIndex = ''
      }, 100)
    },
  },
}
</script>

<style lang="scss">
.submit-step .input-toggle-button.active {
  background: $hivexBlue;
  border-color: $hivexBlue;
  color: $white !important;
}
@media screen and (max-width: 768px) {
  .answer-content {
    width: 100%;
  }
}
.step-title {
  margin-bottom: 95px;
  @media only screen and (max-width: 768px) {
    margin-bottom: 30px;
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
