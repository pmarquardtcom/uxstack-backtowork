<template>
  <div id="contact-form">
    <div class="contact-icon"></div>
    <cfStep1 v-show="currentCfNumber() === 'cf1'" />
    <cfStep2 v-show="currentCfNumber() === 'cf2'" />
    <cfStep2Pending v-show="currentCfNumber() === 'cf2Pending'" />

    <cfStep3 v-show="currentCfNumber() === 'cf3'" />
    <cfStep3Error v-show="currentCfNumber() === 'cf3Error'" />
  </div>
</template>

<script>
import cfStep1 from '@/components/contact-form/cfStep1.vue'
import cfStep2 from '@/components/contact-form/cfStep2.vue'
import cfStep2Pending from '@/components/contact-form/cfStep2Pending.vue'

import cfStep3 from '@/components/contact-form/cfStep3.vue'
import cfStep3Error from '@/components/contact-form/cfStep3Error.vue'

export default {
  components: {
    cfStep1,
    cfStep2,
    cfStep2Pending,
    cfStep3,
    cfStep3Error,
  },
  data() {
    return {}
  },
  methods: {
    currentCfNumber: function() {
      return this.$store.getters.getCurrentCfNumber
    },
  },
}
</script>

<style lang="scss">
#contact-form {
  position: relative;
  background: $white !important;
  min-width: 250px;
  padding: 20px 40px;
  box-shadow: 0px 2px 4px rgba(102, 102, 102, 0.25);
  color: $hivexBlue;

  @media only screen and (max-width: 768px) {
    margin-top: 100px;
    margin-right: 20px;
    .submit-button {
      margin-right: 10px;
      margin-top: 10px;
      bottom: 10px;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  @media only screen and (max-width: 576px) {
    margin-top: 10px;
    margin-bottom: 120px;
    padding: 40px 20px;
  }
}
</style>
