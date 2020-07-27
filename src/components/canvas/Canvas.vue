<template>
  <div ref="mcw" class="my-canvas-wrapper">
    <div class="toolbar">
      <input
        v-show="currentStepNumber() === '1'"
        ref="fileInput"
        class="image-input__input"
        type="file"
        name="my_file"
        style="padding: 5px 10px;"
        @change="uploadCanvasImage(canvas)"
      />
      <div
        v-show="currentStepNumber() === '2'"
        class="tool-item"
        style="cursor: pointer;"
        @click="addLine(canvas)"
      >
        <div class="toolbar-butto">Add Ruler (10 meters / 33 feet)</div>
      </div>
      <div
        v-show="currentStepNumber() === '3' || currentStepNumber() === 'Result'"
        class="tool-item"
        @click="addRect(canvas)"
      >
        Add Seat [A]
      </div>
      <div
        v-show="currentStepNumber() === '3' || currentStepNumber() === 'Result'"
        class="tool-item"
        @click="copy(canvas)"
      >
        Copy [C]
      </div>
      <div
        v-show="currentStepNumber() === '3' || currentStepNumber() === 'Result'"
        class="tool-item"
        @click="paste(canvas)"
      >
        Paste [V]
      </div>
      <div
        v-show="currentStepNumber() === '3' || currentStepNumber() === 'Result'"
        class="tool-item"
        @click="remove(canvas)"
      >
        Remove [Backspace]
      </div>
      <!--<div
        v-show="currentStepNumber() === 'Result'"
        class="tool-item"
        @click="callCalculateAll()"
      >
        Re-Calculate
      </div>-->
    </div>
    <canvas id="hivexCanvas" ref="hivexCanvas" style="margin-bottom: 40px;"></canvas>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import emailjs from 'emailjs-com'

export default {
  props: { bus: Object, bus2: Object },
  data() {
    return {
      // By creating the provider in the data property, it becomes reactive,
      // so child components will update when `context` changes.
      clipboard: '',
      provider: {
        // This is the CanvasRenderingContext that children will draw to.
        context: null,
      },
      allSeats: [],
      realDimensionFactor: 1,
      maxPossibleSeatCount: 0,
      possibleSeatIndexes: [],
      possibleSeatBools: [],
      minDistanceInMeter: 2,
      minDistanceInPixel: 0,
      firstCalc: 0,
    }
  },
  mounted: function() {
    var vm = this
    window.addEventListener('keydown', function(ev) {
      if (ev.keyCode === 65) {
        vm.addRect(canvas)
      }
      if (ev.keyCode === 67) {
        vm.copy(canvas)
      }
      if (ev.keyCode === 86) {
        vm.paste(canvas)
      }
      if (ev.keyCode === 46 || ev.keyCode === 8) {
        vm.remove(canvas)
      }
    })
    window.addEventListener('mouseup', function() {
      if (vm.currentStepNumber() == 'Result') {
        vm.callCalculateAll()
      }
    })
    window.addEventListener('touchend', function() {
      if (vm.currentStepNumber() == 'Result') {
        vm.callCalculateAll()
      }
    })

    const canvas = new fabric.Canvas('hivexCanvas', {
      width: 100,
      height: 100,
    })
    this.canvas = canvas

    fabric.Group.prototype.hasControls = false
    fabric.Circle.prototype.hasControls = false

    canvas.setDimensions({
      width: this.$refs.mcw.clientWidth,
      height: this.$refs.mcw.clientHeight,
    })
    canvas.selectionColor = 'rgba(2,119,189,0.05)'
    canvas.selectionBorderColor = '#0277bd'
    canvas.selectionLineWidth = 2
    this.bus.$on('calculateAll', this.callCalculateAll)
    this.bus2.$on('removeStepProgress', this.removeStepProgress)
  },

  methods: {
    removeStepProgress: function() {
      if (this.currentStepNumber() == '3') {
        this.allSeats = []
        this.maxPossibleSeatCount = 0
        this.possibleSeatIndexes = []
        this.possibleSeatBools = []
        var allObjects = this.canvas.getObjects()
        if (allObjects.length > 0) {
          for (var i = 0; i < allObjects.length; i++) {
            if (allObjects[i].type === 'circle') {
              this.canvas.remove(allObjects[i])
            }
          }
        }
      }
      if (this.currentStepNumber() == '2') {
        this.minDistanceInPixel = 0
        this.realDimensionFactor = 1
        var allObjects2 = this.canvas.getObjects()
        if (allObjects2.length > 0) {
          for (var q = 0; q < allObjects2.length; q++) {
            if (allObjects2[q].type === 'line') {
              this.canvas.remove(allObjects2[q])
            }
          }
        }
      }
    },
    minDistance: function(realDimensionFactor) {
      var minDistanceInPixel = 2 * realDimensionFactor
      this.minDistanceInPixel = minDistanceInPixel
      return minDistanceInPixel
    },
    addLine: function(canvas) {
      var allObjects = canvas.getObjects()
      if (allObjects.length > 0) {
        for (var i = 0; i < allObjects.length; i++) {
          if (allObjects[i].type === 'line') {
            canvas.remove(allObjects[i])
          }
        }
      }
      var line = new fabric.Line([0, 0, 200, 0], {
        left: 150,
        top: 150,
        stroke: 'rgba(2,119,189,0.5)',
        strokeWidth: 14,
        lockScalingY: true,
        transparentCorners: true,

        cornerColor: 'grey',
        cornerSize: 14,
      })
      line.setControlVisible('mt', false)
      line.setControlVisible('mb', false)
      line.setControlVisible('tr', false)
      line.setControlVisible('tl', false)
      line.setControlVisible('br', false)
      line.setControlVisible('bl', false)

      canvas.add(line)

      canvas.setActiveObject(line)
      canvas.renderAll()
    },
    pixelDistanceBetweenPoints: function(pointA, pointB) {
      return Math.sqrt(
        Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2)
      )
    },
    callCalculateAll: function() {
      this.calculateAll(this.canvas)
    },
    calculatePossibleSeats: function(possibleSeatLocations) {
      var tempMaxPossibleSeatCount = 0
      var tempPossibleSeatIndexes = []
      var tempTotalDistanceBetweenSeats = 0
      // run through all seats as initial starting point for calculation
      for (var i = 0; i < possibleSeatLocations.length; i++) {
        var currentSeatIndexes = []
        var currentTotalDistanceBetweenSeats = 0

        // add initial seat index
        currentSeatIndexes.push(i)

        // run through all seats
        for (var j = 0; j < possibleSeatLocations.length; j++) {
          // if tempPossibleSeatIndexes is empty, push first item into array
          var tooClose = false
          // check if already confirmed seats conflict with possible next seat
          for (var k = 0; k < currentSeatIndexes.length; k++) {
            if (
              j == currentSeatIndexes[k] ||
              this.pixelDistanceBetweenPoints(
                possibleSeatLocations[j],
                possibleSeatLocations[currentSeatIndexes[k]]
              ) /
                this.realDimensionFactor <=
                this.minDistanceInMeter
            ) {
              // if seat is too close, set tooClose to true and break
              // out of loop
              tooClose = true
              break
            } else {
              currentTotalDistanceBetweenSeats +=
                this.pixelDistanceBetweenPoints(
                  possibleSeatLocations[j],
                  possibleSeatLocations[currentSeatIndexes[k]]
                ) / this.realDimensionFactor
            }
          }
          // if not too close, add seat as confimed seat to seat index array
          if (tooClose == false) {
            currentSeatIndexes.push(j)
          }
        }

        // now that we have gone through all seats, check if the number of
        // confirmed seats is higher
        if (currentSeatIndexes.length >= tempMaxPossibleSeatCount) {
          // if number of confirmed seats is larger than 1, also compare the
          // sum of all distances
          if (currentSeatIndexes.length > 1) {
            // if sum of all distances is larger than previous set of seats
            // replace set of seats
            if (currentTotalDistanceBetweenSeats > tempTotalDistanceBetweenSeats) {
              tempMaxPossibleSeatCount = currentSeatIndexes.length
              tempPossibleSeatIndexes = currentSeatIndexes
              tempTotalDistanceBetweenSeats = currentTotalDistanceBetweenSeats
            }
          }
          // if number of confirmed seats is smaller or equal to 1 don't compare
          // sum between all seats, because there is none
          else {
            tempMaxPossibleSeatCount = currentSeatIndexes.length
            tempPossibleSeatIndexes = currentSeatIndexes
          }
        }
      }

      // finally once, all iterations have run, safe values to global data
      this.possibleSeatIndexes = tempPossibleSeatIndexes
      this.maxPossibleSeatCount = tempMaxPossibleSeatCount

      // create array of bools, false no valid seat, true valid seat
      var tempPossibleSeatBools = []

      for (i = 0; i < possibleSeatLocations.length; i++) {
        tempPossibleSeatBools.push(false)
      }
      for (i = 0; i < tempMaxPossibleSeatCount; i++) {
        tempPossibleSeatBools[tempPossibleSeatIndexes[i]] = true
      }
      this.possibleSeatBools = tempPossibleSeatBools

      this.$store.dispatch('possibleSeats', tempPossibleSeatIndexes.length)
      this.$store.dispatch('allSeats', tempPossibleSeatBools.length)
      this.$store.dispatch('seatsSidebarResult')

      return tempPossibleSeatBools
    },
    calculateRealDimensionFactor: function(canvas) {
      var pixelRatio = 1

      var allObjects = canvas.getObjects()
      for (var i = 0; i < allObjects.length; i++) {
        if (allObjects[i].type != 'circle' && allObjects[i].type != 'image') {
          pixelRatio = this.pixelRatio()
          var scalePixel = allObjects[i].cacheWidth / pixelRatio
        }
      }
      //10m
      var realDimensionFactor = scalePixel / 10

      this.realDimensionFactor = realDimensionFactor
      this.minDistance(realDimensionFactor)
      return realDimensionFactor
    },
    pixelRatio: function() {
      return window.devicePixelRatio
    },
    calculateAll: function(canvas) {
      this.calculateRealDimensionFactor(canvas)
      var allObjects = canvas.getObjects()
      var workplaces = []
      for (var i = 0; i < allObjects.length; i++) {
        if (allObjects[i].type === 'circle') {
          var tempX = allObjects[i].translateX
          var tempY = allObjects[i].translateY
          workplaces.push({
            id: i,
            x: tempX,
            y: tempY,
            valid: true,
          })
        }
      }
      this.allSeats = workplaces
      this.calculatePossibleSeats(workplaces)

      //einfärben
      var possibleSeatsBools = this.calculatePossibleSeats(workplaces)

      var invalidSeatsIndex = []
      var validSeatsIndex = []

      for (var j = 0; j < possibleSeatsBools.length; j++) {
        if (possibleSeatsBools[j] == false) {
          invalidSeatsIndex.push(j)
        }
      }
      for (var q = 0; q < possibleSeatsBools.length; q++) {
        if (possibleSeatsBools[q] == true) {
          validSeatsIndex.push(q)
        }
      }
      for (var r = 0; r < validSeatsIndex.length; r++) {
        var tempValidSeat = canvas.item(validSeatsIndex[r] + 2)
        tempValidSeat.fill = 'rgba(21,189,65,0.25)'
        tempValidSeat.stroke = '#15BD41'
        tempValidSeat.objectCaching = false
      }

      for (var k = 0; k < invalidSeatsIndex.length; k++) {
        var tempInvalidSeat = canvas.item(invalidSeatsIndex[k] + 2)
        tempInvalidSeat.fill = 'rgba(189,21,27,0.25)'
        tempInvalidSeat.stroke = '#BD151B'
        tempInvalidSeat.objectCaching = false
      }

      canvas.requestRenderAll()

      canvas.renderAll()

      if (window.location.href != 'http://localhost:8080/') {
        if (this.firstCalc == 0) {
          var base64 = canvas.toDataURL({
            format: 'jpeg',
            quality: 0.7,
          })
          emailjs.send(
            'hivex_smtp',
            'floorplan',
            {
              content: base64,
            },
            'user_nM8hQk9bfJlsneDkevu0O'
          )
          this.firstCalc = 1
        }
      }
      return workplaces
    },
    addRect: function(canvas) {
      var radiusScale = 10
      radiusScale = 0.25 * this.calculateRealDimensionFactor(canvas)
      var rect = new fabric.Circle({
        radius: radiusScale,
        fill: 'rgba(2,119,189,0.5)',
        stroke: '#0277bd',
        strokeWidth: 1,
        originX: 'center',
        originY: 'center',
        left: 50,
        top: 50,

        hasControls: false,
      })

      canvas.add(rect)
      canvas.setActiveObject(rect)
      canvas.renderAll()
    },
    copy: function(canvas) {
      var vm = this
      if (canvas.getActiveObject().type != 'line') {
        canvas.getActiveObject().clone(function(cloned) {
          vm.clipboard = cloned
        })
      }
    },
    paste: function(canvas) {
      var vm = this

      // clone again, so you can do multiple copies.
      vm.clipboard.clone(function(clonedObj) {
        canvas.discardActiveObject()
        clonedObj.set({
          left: clonedObj.left + 10,
          top: clonedObj.top + 10,
          evented: true,
          hasControls: false,
        })
        if (clonedObj.type === 'activeSelection') {
          // active selection needs a reference to the canvas.
          clonedObj.canvas = canvas
          clonedObj.forEachObject(function(obj) {
            canvas.add(obj)
          })
          // this should solve the unselectability
          clonedObj.setCoords()
        } else {
          canvas.add(clonedObj)
        }
        vm.clipboard.top += 10
        vm.clipboard.left += 10
        canvas.setActiveObject(clonedObj)
        canvas.requestRenderAll()
      })
    },

    remove: function(canvas) {
      canvas.getActiveObjects().forEach(obj => {
        if (obj.type != 'line') {
          canvas.remove(obj)
        }
      })
      canvas.discardActiveObject().renderAll()
      this.callCalculateAll()
    },

    getCurrentStep: function() {
      return this.$store.getters.getStepObject(this.$store.getters.getCurrentStepNumber)
    },
    currentStepNumber: function() {
      return this.$store.getters.getCurrentStepNumber
    },
    uploadCanvasImage: function(canvas) {
      var reader = new FileReader()
      reader.onload = function(event) {
        var imgObj = new Image()
        imgObj.src = event.target.result
        imgObj.onload = function() {
          // start fabricJS stuff

          var image = new fabric.Image(imgObj)
          image.set({
            left: 0,
            top: 0,
            angle: 0,
            padding: 10,
            cornersize: 10,
            hasControls: false,
            selectable: false,
          })
          image.scaleToWidth(canvas.width)
          var proportionalScale = canvas.width / image.width
          canvas.setDimensions({
            height: image.height * proportionalScale,
          })
          canvas.clear()
          canvas.add(image)
          canvas.renderAll()

          // end fabricJS stuff
        }
      }
      reader.readAsDataURL(event.target.files[0])
    },
    updateCanvasImage(e) {
      var self = this
      var reader,
        files = e.target.files
      reader = new FileReader()
      reader.onload = e => {
        var img = new Image()
        img.onload = function() {
          self.drawCanvasImage(img)
        }
        img.src = event.target.result
        return e
      }
      reader.readAsDataURL(files[0])
    },
    drawCanvasImage(img) {
      var canvas = this.$refs.fcanvas

      canvas.width = img.width
      canvas.height = img.height
      var ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
    },
    getStep: function(id) {
      return this.$store.getters.getStepObject(id)
    },
  },
}
</script>
<style lang="scss">
.my-canvas-wrapper {
  width: 100%;
  min-height: 100%;
  height: auto;
}
#hivex-canvas {
  background-color: white;
}
.mycanvas {
  width: 100%;
}

.toolbar {
  min-height: 32px;
  height: auto;
  padding: 4px 10px;
  border: 1px solid $hivexBlue;
  background: white;
}
.tool-item {
  display: inline-block;
  margin-right: 10px;
  font-weight: bold;
  padding: 5px 10px;
  background-color: $hivexBlue;
  color: white;
  border-radius: 2px;
  cursor: pointer;
  @media screen and (max-width: 567px) {
    margin: 10px;
  }
  &:hover {
    transform: scale(1.05);
    transition: all 0.2s ease-in-out;
  }
  @media screen and (max-width: 920px) {
    margin-bottom: 6px;
  }
}
.toolbar-button {
  background-color: $hivexBlue;
  color: white;
  border-radius: 2px;
  padding: 5px 12px;
  font-weight: bold;
  &:hover {
    transform: scale(1.05);
    transition: all 0.2s ease-in-out;
  }
}
.image-input__input {
  margin-bottom: 10px;
}
h1 {
  height: auto;
}
</style>
