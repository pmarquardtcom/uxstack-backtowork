<script>
// Note how there's no template or styles in this component.

// Helper functions to convert a percentage of canvas area to pixels.

export default {
  // Gets us the provider property from the parent <my-canvas> component.
  inject: ['provider'],

  props: {
    // Start coordinates (percentage of canvas dimensions).
    x1: {
      type: Number,
      default: 0,
    },
    y1: {
      type: Number,
      default: 0,
    },

    // End coordinates (percentage of canvas dimensions).
    x2: {
      type: Number,
      default: 0,
    },
    y2: {
      type: Number,
      default: 0,
    },

    // The value to display.
    value: {
      type: Number,
      defualt: 0,
    },

    // The color of the box.
    color: {
      type: String,
      default: '#F00',
    },
  },

  data() {
    return {}
  },

  render() {
    // Since the parent canvas has to mount first, it's *possible* that the context may not be
    // injected by the time this render function runs the first time.
    if (!this.provider.context) return
    const ctx = this.provider.context

    ctx.beginPath()
    ctx.arc(95, 50, 40, 0, 2 * Math.PI)
    ctx.stroke()

    return '1'
  },
}
</script>
