<template>
  <svg class="stat-circle" viewBox="1.6 1.6 16.8 16.8">
    <circle class="bg" cx="10" cy="10" r="8"></circle>
    <circle class="progress" cx="10" cy="10" r="8" :data-percentage="percentage"></circle>
    <text x="62%" y="70%">{{ percentage }}%</text>
  </svg>
</template>

<script>
import { TweenMax } from 'gsap/all'

export default {
  props: {
    percentage: Number,
  },
  watch: {
    percentage: {
      immediate: true,
      deep: true,

      handler() {
        this.$nextTick(function() {
          var $statCircle = document.querySelectorAll('.stat-circle circle')
          for (var i = 0; i < $statCircle.length; i++) {
            var p = parseFloat($statCircle[i].dataset.percentage)
            var off = -51 - (51 / 100) * p
            new TweenMax.to($statCircle[i], 0.8, {
              strokeDashoffset: off,
            })
          }
        })
      },
    },
  },
  mounted: function() {
    var $statCircle = document.querySelectorAll('.stat-circle circle')
    for (var i = 0; i < $statCircle.length; i++) {
      var p = parseFloat($statCircle[i].dataset.percentage)
      var off = -51 - (51 / 100) * p
      new TweenMax.to($statCircle[i], 0.8, {
        strokeDashoffset: off,
      })
    }
  },
}
</script>

<style lang="scss">
.stat-circle {
  width: 40%;
  margin: 20px auto;
  display: block;
  circle.bg {
    fill: none;
    stroke: #f1f1f1;
    stroke-width: 0.4;
  }
  circle.progress {
    fill: none;
    stroke: $hivexBlue;
    stroke-width: 0.8;
    stroke-dasharray: 51 51;
    stroke-dashoffset: -51;
    stroke-linecap: round;
  }
  text {
    font-size: 4px;
    text-anchor: middle;
    fill: $hivexBlue;
  }
}
</style>
