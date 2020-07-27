/* eslint-disable prettier/prettier */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    currentStepNumber: 'IntroStep',
    currentCfNumber: 'cf2',
    steps: [
      {
        id: 'IntroStep',
        progress: '0',
        contentTitle: 'Learn more about UXstack!',
        sidebarTitle: 'Test',
        sidebarContent: 'Test',
        sidebarButton: 'Test',
      },
      {
        id: '1',
        progress: '0',
        contentTitle: 'Upload image of floor plan',
        sidebarTitle: 'Step 1 - Upload image of your floor plan',
        sidebarContent:
          'Upload an image of your office floor plan, this can be a screenshot, exported image from your CAD software or PDF, but you can also draw your plan by hand and take a picture.<br><br> IMPORTANT: Please draw a 10-meter line on your floor plan so that we can get the right scale later.',
        sidebarButton: 'NEXT STEP',
      },
      {
        id: '2',
        progress: '33',
        contentTitle: 'Skalierung definieren (10m)',
        sidebarTitle: 'Step 2 - Define scale of your floor plan.',
        sidebarContent:
          'The bar is the real length of 10 meters or 33 feet on your floor plan.<br><br>Click the button <strong>Add Ruler</strong> in the toolbar and pull to adjust.',
        sidebarButton: 'NEXT STEP',
      },
      {
        id: '3',
        progress: '66',
        contentTitle: 'Arbeitsplätze festlegen',
        sidebarTitle: 'Step 3 - Set up your seating layout',
        sidebarContent:
          'Start by clicking <strong>Add Seat</strong> and pull to the right location.<br><br> You can select multiple seats with the shift key or by creating a rectangular selection area with your mouse.<br><br>You can <strong>Copy</strong> and <strong>Paste</strong> selected seats across the floor plan. And <strong>Remove</strong> it again.<br><br> Once your layout is set up, just click <strong>CALCULATE</strong>.',
        sidebarButton: 'CALCULATE',
      },
      {
        id: 'Result',
        progress: '100',
        contentTitle: 'Hier ist Ihre persönliche Auswertung',
        sidebarTitle: 'Stay safe!',
        sidebarContent: '1',
        sidebarButton: 'GET IN TOUCH',
      },
      {
        id: 'Akquisition',
        progress: '100',
        contentTitle: 'Learn more about UXstack!',
        sidebarTitle: 'Test',
        sidebarContent: 'Test',
        sidebarButton: 'Test',
      },
    ],
    //Pixel per 10 meter
    canvasScale: '',

    canvasWorkPlaces: [],
    possibleSeats: 0,
    allSeats: 0,

    //PHIL
    possibleSeatIndexes: '',
    maxPossibleSeatCount: '',
    possibleSeatBools: ''
  },
  actions: {
    next(context) {
      var currentStep = this.getters.getCurrentStepNumber

      var nextStep = ''

      switch (currentStep) {
        case 'IntroStep':
          nextStep = '1'
          break
        case '1':
          nextStep = '2'
          break
        case '2':
          nextStep = '3'
          break
        case '3':
          nextStep = 'Result'
          break
        case 'Result':
          nextStep = 'Akquisition'
          break
        default:
          break
      }
      setTimeout(() => {
        context.commit('goToStep', nextStep), window.scrollTo(0, 0)
      }, 300)
    },
    prev(context) {
      var currentStep = this.getters.getCurrentStepNumber
      var prevStep = 'IntroStep'
      switch (currentStep) {
        case 'IntroStep':
          break
        case '1':
          prevStep = 'IntroStep'
          break;
        case '2':
          prevStep = '1'
          break
        case '3':
          prevStep = '2'
          break
        case 'Result':
          prevStep = '3'
          break
        case 'Akquisition':
          prevStep = 'Result'
          break
        default:
          break
      }
      setTimeout(() => {
        context.commit('goToCfStep', 'cf2'),
          context.commit('goToStep', prevStep),
          window.scrollTo(0, 0)
      }, 200)
    },
    possibleSeats(context, seats) {
      context.commit('possibleSeats', seats)
    },
    allSeats(context, seats) {
      context.commit('allSeats', seats)
    },
    seatsSidebarResult(context) {
      context.commit('seatsSidebarResult')
    }
  },
  mutations: {
    goToStep(state, step) {
      state.currentStepNumber = step
    },
    goToCfStep(state, step) {
      state.currentCfNumber = step
    },
    possibleSeats(state, seats) {
      state.possibleSeats = seats
    },
    allSeats(state, seats) {
      state.allSeats = seats
    },
    seatsSidebarResult(state) {
      var resultText = 'We found <strong>' + state.possibleSeats + '</strong> out of <strong>' + state.allSeats + '</strong> seats that can be used!<br><br>This is the maximum number of useable seats while complying with the 2-meter distance rule, to keep everyone safe and comfortable.<br><br>Your floor plan is automatically re-calculated when adding, moving or removing seats.<br><br>We would love to hear your feedback or any other thought you may have!'
      state.steps[4].sidebarContent = resultText
    }
  },
  getters: {
    getStepProgress: state => id => {
      let currentStep = state.steps.find(step => step.id === id)
      return currentStep.progress
    },
    getCurrentStepNumber: state => {
      return state.currentStepNumber
    },
    getCurrentCfNumber: state => {
      return state.currentCfNumber
    },
    getPercentage: state => {
      var tempPercentage = state.possibleSeats / state.allSeats * 100
      tempPercentage = parseFloat(tempPercentage.toFixed(1))
      return tempPercentage
    },
    getStepObject: state => id => {
      return state.steps.find(step => step.id === id)
    },
  },
})
export default store
