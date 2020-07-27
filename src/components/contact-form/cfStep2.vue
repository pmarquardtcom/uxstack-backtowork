<template
  ><div id="cf2">
    <h2>How may we contact you?</h2>

    <form class="contact-form" @submit.prevent="validateForm">
      <label
        >E-Mail*
        <input v-model="recipient_mail" type="email" placeholder="Your E-mail" required />
      </label>
      <label
        >Name<input
          v-model="recipient_name"
          type="text"
          placeholder="Your name"
        /> </label
      ><br />
      <label
        >Company
        <input
          v-model="recipient_company"
          type="text"
          placeholder="Your company"
        /> </label
      ><br />
      <label
        >Message
        <textarea
          v-model="recipient_message"
          rows="6"
          cols="36"
          name="message"
          placeholder="Your message"
          class="textarea-hivex"
        >
Your message...</textarea
        > </label
      ><br />
      <label>
        <input v-model="recipient_dsgvo" type="checkbox" required />
        Yes, I agree with the
        <a href="https://uxstack.design/privacy/" target="_blank">Privacy Policy</a>*
      </label>

      <SubmitButton style="margin-top:20px;" @click.prevent="validateForm()"
        >SUBMIT</SubmitButton
      >
    </form>
  </div>
</template>

<script>
import SubmitButton from '@/components/steps/inputs/SubmitButton.vue'
import emailjs from 'emailjs-com'

export default {
  components: {
    SubmitButton,
  },
  data() {
    return {
      recipient_mail: '',
      recipient_company: '',
      recipient_name: '',
      recipient_dsgvo: '',
      recipient_message: '',
      mail_state: '',
    }
  },
  computed: {},
  methods: {
    getStep: function(id) {
      return this.$store.getters.getStepObject(id)
    },
    goToCfStep: function(stepNumber) {
      this.$store.commit('goToCfStep', stepNumber)
    },
    validateForm: function() {
      if (this.recipient_mail === '') {
        return false
      } else if (this.recipient_dsgvo === '' || this.recipient_dsgvo === false) {
        return false
      } else {
        this.sendEmail()

        this.goToCfStep('cf2Pending')
      }
    },
    sendEmail: function() {
      let template_params = {
        recipient_mail: this.recipient_mail,
        recipient_company: this.recipient_company,
        recipient_name: this.recipient_name,
        recipient_message: this.recipient_message,
      }

      emailjs
        .send('hivex_smtp', 'hivex_corona', template_params, 'user_nM8hQk9bfJlsneDkevu0O')
        .then(
          result => {
            this.mail_state = result
            this.goToCfStep('cf3')
          },
          error => {
            this.mail_state = error
            this.goToCfStep('cf3Error')
          }
        )
    },
  },
}
</script>

<style lang="scss">
input[type='text'],
input[type='email'],
input[type='tel'] {
  width: 100%;
  background: transparent;
  padding: 5px 5px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 2px solid $borderColor;
  font-size: 14px;
  &:focus {
    outline: none;
  }
}
.textarea-hivex {
  border: 0;
  width: 100%;
  font-family: $font-stack;
  border-bottom: 2px solid $borderColor;
  resize: none;
}
input[type='checkbox'] {
  width: 14px;
  height: 14px;
  margin: 8px 4px 8px 0;
}
</style>
