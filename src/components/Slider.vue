<template>
<div>
  <div class="slider-container" ref="slider">
    <div class="color-bg" />
    <div
      class="color-bar"
      :style="{
      width : `${offset}px`
    }"
    />
    <div
      ref="thumb"
      class="handler"
      draggable="true"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      :style="{
      left : `${offset}px`
    }"
    />
  </div>
  <div class="scales w-full flex">
    <div
      v-for="(range, idx) in rangesModified" :key="idx"
      class="flex mt-5 justify-between"
      :style="{width: `${range}%`}"
    >
      <div class="scale text-white flex items-center justify-center">{{ values[idx] }}</div>
      <div
        v-if="idx === range.length - 1"
        class="scale text-white flex items-center justify-center">
          {{ values[idx+1] }}
      </div>
    </div>
  </div>
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
      position: { x: 0, y: 0 },
      offset: 50,
      values: [3, 6, 9, 12, 15, 50],
      ranges: [1, 1, 1, 1, 1.33],
    };
  },
  computed: {
    rangesModified() {
      const total = this.ranges.reduce((a, b) => a + b);
      return this.ranges.map((range) => ((range / total) * 100).toFixed(2));
    },
  },
  methods: {
    handleMouseDown(event) {
      const { slider, thumb } = this.$refs;
      event.preventDefault(); // prevent selection start (browser action)
      const shiftX = event.clientX - thumb.getBoundingClientRect().left;
      // shiftY not needed, the thumb moves only horizontally

      const onMouseMove = (_event) => {
        // const elemBelow = document.elementFromPoint(_event.clientX + 5, _event.clientY + 20);
        // if (!elemBelow) return;
        // // potential droppables are labeled with the class "droppable" (can be other logic)
        // const droppableBelow = elemBelow.closest('.scale');
        // console.log('elemBelow', elemBelow, droppableBelow.getBoundingClientRect());
        // if (droppableBelow) {
        //   let newLeft = droppableBelow.getBoundingClientRect().x
        //     - shiftX - slider.getBoundingClientRect().left;
        //   if (newLeft < 0) {
        //     newLeft = 0;
        //   }
        //   const rightEdge = slider.offsetWidth - thumb.offsetWidth;
        //   if (newLeft > rightEdge) {
        //     newLeft = rightEdge;
        //   }
        //   this.offset = newLeft;
        // }
        // ======
        let newLeft = _event.clientX - shiftX - slider.getBoundingClientRect().left;
        // the pointer is out of slider => lock the thumb within the bounaries
        if (newLeft < 0) {
          newLeft = 0;
        }
        const rightEdge = slider.offsetWidth - thumb.offsetWidth;
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }
        this.offset = newLeft;
      };

      const onMouseUp = () => {
        this.handleMouseUp();
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    handleMouseUp() {
      const { slider } = this.$refs;
      window.slider = slider;
      setTimeout(() => {
        // alert('works');
        const proportion = ((this.offset / slider.offsetWidth) * 100).toFixed(2);
        if (proportion > 50) {
          this.offset = slider.offsetWidth * 0.5;
        } else {
          this.offset = 0;
        }
      }, 1000);
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
  @apply w-0 h-0 relative;
}
.handler:before {
  @apply rounded-full w-5 h-5 absolute box-content;
  content: "";
  border: 6px solid #FFD05D;
  background: #1B1B1B;
  z-index: 2;
  /*left: 50%;*/
  /*transform: translateX(-16px);*/
  touch-action: none;
  user-select: none;
  top: -16px;
  left: -16px;
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
</style>
