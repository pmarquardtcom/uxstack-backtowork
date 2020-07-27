<template
  ><div id="app">
    <Header />
    <BackButton
      :style="{ visibility: hideBack() }"
      @click.native="previousStep()"
    ></BackButton>
    <CoronaCheck :bus2="bus2" />
    <ProgressBar :progress-width="getCurrentStep().progress" />
  </div>
</template>

<script>
import Vue from 'vue'

import { mapActions } from 'vuex'

import Header from '@/components/Header'
import BackButton from '@/components/steps/inputs/BackButton.vue'

import CoronaCheck from '@/components/CoronaCheck.vue'
import ProgressBar from '@/components/ProgressBar.vue'

import '@/assets/styles/index.scss'

export default {
  name: 'App',
  components: {
    Header,
    BackButton,
    CoronaCheck,
    ProgressBar,
  },

  data: () => ({
    bus2: new Vue(),
    sharedData: window.sharedData,
  }),
  methods: {
    ...mapActions(['next', 'prev']),
    hideBack: function() {
      if (this.currentStepNumber() === 'IntroStep') {
        return 'hidden'
      } else {
        return 'visible'
      }
    },
    nextStep: function(choice) {
      this.next(choice)
    },
    previousStep: function() {
      this.prev()
      this.bus2.$emit('removeStepProgress')
    },
    currentStepNumber: function() {
      return this.$store.getters.getCurrentStepNumber
    },
    getCurrentStep: function() {
      return this.$store.getters.getStepObject(this.$store.getters.getCurrentStepNumber)
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/index.scss';
html,
body {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  margin: 0;
  background: $backgroundColor;
  font-family: $font-stack;
  color: $hivexBlue;
  line-height: 1.4;
}
#app,
body,
html {
  width: 100%;
}

a {
  color: $white;
  transition: 0.25s all ease-in-out;
  text-decoration: none;
}
a:visited {
  color: $white;
}
a:hover {
  color: $hivexBlue;
}
</style>
