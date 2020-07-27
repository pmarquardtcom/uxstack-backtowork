<template>
  <div id="cf1">
    <h2>JETZT KONTAKT ANFRAGEN</h2>
    <p>
      Lorem ipsum
      <br />
    </p>

    <SubmitButton @click.native="goToCfStep('cf2')">KONTAKT </SubmitButton><br />
  </div>
</template>

<script>
import SubmitButton from '@/components/steps/inputs/SubmitButton.vue'

export default {
  components: {
    SubmitButton,
  },
  methods: {
    goToCfStep: function(stepNumber) {
      setTimeout(() => {
        this.$store.commit('goToCfStep', stepNumber)
      }, 300)
    },
  },
}
</script>

<style lang="scss"></style>
