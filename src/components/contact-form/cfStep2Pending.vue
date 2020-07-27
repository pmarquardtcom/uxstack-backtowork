<template>
  <div id="cf2">
    <h2 style="text-align: center;">Thank you!</h2>
    <p style="text-align:center;">Your request will be sent...</p>
    <div class="loading">
      <svg
        id="Square"
        style="margin:20px 0;"
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0)">
          <path d="M0 31.5475L18.2125 21.095V0L0 10.4525V31.5475Z" fill="#58A5F0" />
          <path
            d="M36.2353 10.4525L18.2125 0V21.095L36.2353 31.5475V10.4525Z"
            fill="#0277BD"
          />
          <path
            d="M0 31.5475L18.2125 21.095L36.2353 31.5475L18.2125 42L0 31.5475Z"
            fill="#004C8C"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="110.793" height="42" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      recipient_mail: '',
      recipient_company: '',
      recipient_tel: '',
      recipient_quickcheck_transmit: '',
      recipient_dsgvo: '',
      recipient_qc_summary: '',
    }
  },
  computed: {},
  methods: {
    getStep: function(id) {
      return this.$store.getters.getStepObject(id)
    },
  },
}
</script>

<style lang="scss" scoped>
input[type='text'] {
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

input[type='checkbox'] {
  margin-top: 20px;
}

@keyframes rotate1 {
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotate2 {
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotate3 {
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
#Square {
  animation-name: rotate1;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  transform-origin: center center;
}
#Section-1 {
  animation-name: rotate1;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  transform-origin: center center;
}
#Section-2 {
  animation-name: rotate2;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  transform-origin: center center;
}
#Section-3 {
  animation-name: rotate3;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  transform-origin: center center;
}

.loading {
  display: flex;
  justify-content: center;
  svg {
    width: 128px;
    height: 128px;
  }
}

.contact-icon {
  opacity: 0;
}
</style>
