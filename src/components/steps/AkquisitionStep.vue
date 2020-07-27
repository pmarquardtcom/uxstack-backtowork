<template>
  <div>
    <div style="height:100vh">
      <h2>
        There are a lot of opportunities<br />
        and pitfalls in a workspace.
      </h2>
      <p style="font-size:16px; width:50%;">
        We can help you to identify those so you can make informed decisions on how to
        improve your existing space or compare new property you are looking to add to your
        portfolio.<br /><br />
        <strong
          ><a href="https://www.uxstack.design/" target="_blank"
            >More information ›</a
          ></strong
        >
      </p>
      <img src="@/assets/img/empire-state-analyse-1.png" class="floor-image" />
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
.floor-image {
  width: 50%;
  @media screen and (max-width: 768px) {
    width: 80%;
    margin: 0 auto;
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
