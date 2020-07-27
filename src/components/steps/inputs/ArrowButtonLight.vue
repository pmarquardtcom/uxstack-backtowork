<template>
  <button class="arrow-button">
    <svg
      id="desktop-arrow"
      width="130"
      height="90"
      viewBox="0 0 130 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style="background-color:#12244a;"
    >
      <rect
        x="0.5"
        y="38.9121"
        width="116.692"
        height="11.9808"
        stroke="#F72949"
        fill="none"
      />
      <path
        d="M84.4668 1.04228L128.43 45.0053L119.958 53.477L75.9951 9.51396L84.4668 1.04228Z"
        stroke="#F72949"
      />
      <path
        d="M75.9962 80.4861L119.959 36.5231L128.431 44.9947L84.4679 88.9577L75.9962 80.4861Z"
        stroke="#F72949"
      />
    </svg>
    <svg
      id="mobile-arrow"
      width="90"
      height="30"
      viewBox="0 0 90 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Arrow">
        <path
          id="weiter"
          d="M3.12939 15.0864L3.30713 16.3052L3.56738 15.207L5.39551 8.75781H6.42383L8.2075 15.207L8.4614 16.3242L8.6582 15.0801L10.0928 8.75781H11.3179L9.0771 18H7.9663L6.06201 11.2651L5.91602 10.5605L5.77002 11.2651L3.7959 18H2.68506L0.450684 8.75781H1.66943L3.12939 15.0864ZM20.4004 13.728H16.395V17.0034H21.0479V18H15.1763V8.75781H20.9844V9.76074H16.395V12.7314H20.4004V13.728ZM26.3726 18H25.1538V8.75781H26.3726V18ZM37.3022 9.76074H34.3315V18H33.1191V9.76074H30.1548V8.75781H37.3022V9.76074ZM46.3975 13.728H42.3921V17.0034H47.0449V18H41.1733V8.75781H46.9814V9.76074H42.3921V12.7314H46.3975V13.728ZM54.4517 14.2612H52.2808V18H51.0557V8.75781H54.1152C55.1562 8.75781 55.9561 8.99479 56.5146 9.46875C57.0775 9.94271 57.3589 10.6325 57.3589 11.5381C57.3589 12.1136 57.2023 12.6151 56.8892 13.0425C56.5802 13.4699 56.1486 13.7894 55.5942 14.001L57.7651 17.9238V18H56.4575L54.4517 14.2612ZM52.2808 13.2646H54.1533C54.7585 13.2646 55.2388 13.1081 55.5942 12.7949C55.9539 12.4818 56.1338 12.0628 56.1338 11.5381C56.1338 10.9668 55.9624 10.5288 55.6196 10.2241C55.2811 9.91943 54.7902 9.76497 54.147 9.76074H52.2808V13.2646Z"
          fill="#F72949"
        />
        <path
          id="Bottom"
          d="M70.7448 25.7226L84.9277 11.5396L88.4632 15.0752L74.2803 29.2581L70.7448 25.7226Z"
          stroke="#F72949"
        />
        <path
          id="Top"
          d="M74.2803 0.895752L88.4632 15.0787L84.9277 18.6142L70.7447 4.43129L74.2803 0.895752Z"
          stroke="#F72949"
        />
      </g>
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    inputText: String,
  },
}
</script>

<style lang="scss">
.arrow-button {
  padding: 0;
  border: none;
  width: auto;
  height: 90px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    stroke-width: 2;
  }
  svg {
    @media only screen and (max-width: 768px) {
      background-color: transparent !important;
    }
  }
  #desktop-arrow {
    @media only screen and (max-width: 768px) {
      display: none;
    }
    svg {
      @media only screen and (max-width: 576px) {
        width: 45px;
        height: 50px;
      }
    }
  }
  #mobile-arrow {
    @media only screen and (min-width: 769px) {
      display: none;
    }
  }
}
</style>
