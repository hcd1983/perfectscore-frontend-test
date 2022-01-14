<template>
<div class="text-white">{{ range }}</div>
<div id='track'>
  <div id="knob"></div>
</div>
<div class="slider-container" ref="track">
  <div class="color-bg" />
  <div class="color-bar" />
  <div
    ref="knob"
    class="handler"
    draggable="true"
    @drag="handleDrag"
    @dragstart="handleDragStart"
  />
</div>
<div class="w-full relative flex items-center">
  <div class="color-bar" />
  <input ref="slider" type="range" v-model="position">
</div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    range: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      position: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.setSlider();
    });
  },
  methods: {
    handleDragStart($event) {
      console.log('start', $event);
    },
    handleDrag($event) {
      console.log('drag', $event);
    },
    setSlider() {
      if (typeof window === 'undefined') return;
      let dragging = false;
      let knobOffset = 0;
      const { track } = this.$refs;
      const { knob } = this.$refs;
      const trackWidth = track.offsetWidth;
      const trackLeft = track.offsetLeft;
      // const trackRight = trackLeft + trackWidth;

      const knobWidth = knob.offsetWidth;
      const maxRight = trackWidth - knobWidth; // relatively to track

      knob.addEventListener('mousedown', (e) => {
        // knob offset relatively to track
        knobOffset = e.clientX - knob.offsetLeft;
        dragging = true;
      });

      window.addEventListener('mouseup', () => {
        dragging = false;
      });

      window.addEventListener('mousemove', (e) => {
        if (dragging) {
          // current knob offset, relative to track
          let offset = e.clientX - trackLeft - knobOffset;
          if (offset < 0) {
            offset = 0;
          } else if (offset > maxRight) {
            offset = maxRight;
          }

          knob.style.left = `${offset}px`;
        }
      });
    },
  },
};
</script>

<style scoped>
.slider-container{
  @apply relative flex items-center;
  width: calc(100% + 8px);
  transform: translateX(-4px);
}
.handler{
  @apply rounded-full w-5 h-5 relative box-content;
  border: 6px solid #FFD05D;
  background: #1B1B1B;
  z-index: 2;
  /*left: 50%;*/
  transform: translateX(-16px);
}
.color-bg {
  @apply rounded-full absolute top-1/2 w-full;
  z-index: 1;
  height: 8px;
  margin-top: -4px;
  background-color: rgba(255, 255, 255, .3);
}

.color-bar {
  @apply rounded-full bg-red-500 absolute top-1/2 w-1/2;
  z-index: 2;
  height: 8px;
  margin-top: -4px;
}

input {
  @apply w-full rounded-full;
  appearance: none;
  height: 8px;
  background-color: rgba(255, 255, 255, .3);
}
input::-webkit-slider-thumb{
  @apply rounded-full w-5 h-5;
  appearance: none;
  border: 6px solid #FFD05D;
  background: #1B1B1B;
  z-index: 2;
  position: relative;
}
input::-moz-range-thumb {
  @apply rounded-full w-5 h-5 box-content;
  appearance: none;
  border: 6px solid #FFD05D;
  background: #1B1B1B;
}

#track {width: 200px;height: 5px; margin:100px; background: red}
#knob {height: 10px; width: 40px; background: yellow;position: relative; }
</style>
