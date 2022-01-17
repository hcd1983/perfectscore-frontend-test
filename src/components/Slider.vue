<template>
<div>
  <div
    class="slider-container"
    ref="slider"
  >
    <div class="color-bg" />
    <div
      class="color-bar"
    >
      <span
        :style="{
          width: `${offsetDistance}%`
        }"
      />
    </div>
    <div
      ref="thumb"
      class="handler"
      :style="{
      left : `${offsetDistance}%`
    }"
    >
      <span
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
      />
    </div>
  </div>
  <div
    class="scales w-full relative h-7"
  >
    <div
      v-for="(val, idx) in values" :key="idx"
      class="absolute w-0 h-0 top-full flex items-center justify-center text-white z-10"
      :class="{
        'opacity-50' : this.value !== val
      }"
      :style="{
        left: `${idx > 0 ? rangesModified[idx-1].position : 0}%`,
      }"
    >
      <span class="cursor-pointer" @click.stop="setValue(val)">{{ val }}</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    ranges: {
      type: Array,
      default() {
        return [1, 1, 1, 1, 1.33];
      },
    },
    values: {
      type: Array,
      default() {
        return [3, 6, 9, 12, 15, 50];
      },
    },
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      position: { x: 0, y: 0 },
      offset: 50,
    };
  },
  computed: {
    rangesModified() {
      const total = this.ranges.reduce((a, b) => a + b);
      let position = 0;
      return this.ranges.map((_range, idx) => {
        const range = ((_range / total) * 100).toFixed(2);
        position = idx === this.ranges.length - 1 ? 100 : position + Number(range);
        return {
          range,
          position: Number(position.toFixed(2)),
        };
      });
    },
    offsetDistance() {
      const targetIndex = this.values.indexOf(this.value);
      const total = this.ranges.reduce((a, b) => a + b);
      if (targetIndex === 0) return 0;
      return (this.ranges.slice(0, targetIndex).reduce((a, b) => a + b, 0) / total) * 100
        .toFixed(2);
    },
  },
  methods: {
    handleMouseDown(event) {
      const { slider, thumb } = this.$refs;
      event.preventDefault(); // prevent selection start (browser action)
      const shiftX = event.clientX - thumb.getBoundingClientRect().left;
      // shiftY not needed, the thumb moves only horizontally

      const onMouseMove = (_event) => {
        let newLeft = _event.clientX - shiftX - slider.getBoundingClientRect().left;
        // the pointer is out of slider => lock the thumb within the bounaries
        if (newLeft < 0) {
          newLeft = 0;
        }
        const rightEdge = slider.offsetWidth - thumb.offsetWidth;
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }

        // eslint-disable-next-line max-len
        let left = ((_event.clientX - slider.getBoundingClientRect().left) / slider.offsetWidth) * 100;
        if (left < 0) left = 0;
        if (left > 100) left = 100;
        const targetIndex = this.rangesModified.findIndex((range) => range.position >= left);
        const leftSide = targetIndex === 0 ? 0 : this.rangesModified[targetIndex - 1].position;
        const rightSide = this.rangesModified[targetIndex].position;
        // eslint-disable-next-line max-len
        const value = left - leftSide < rightSide - left ? this.values[targetIndex] : this.values[targetIndex + 1];
        this.setValue(value);
        this.offset = newLeft;
      };

      const onMouseUp = () => {
        // this.handleMouseUp();
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
    setValue(value) {
      this.$emit('update:value', value);
    },
  },
};
</script>

<style scoped>
.slider-container{
  @apply relative flex items-center z-20;
  width: calc(100% + 8px);
  transform: translateX(-4px);
}
.handler{
  @apply w-0 h-0 relative z-30;
}
.handler span {
  @apply rounded-full w-5 h-5 absolute box-content cursor-pointer;
  border: 6px solid #FFD05D;
  background: #1B1B1B;
  /*left: 50%;*/
  /*transform: translateX(-16px);*/
  touch-action: none;
  user-select: none;
  top: -16px;
  left: -16px;
}
.color-bg {
  @apply absolute top-1/2 w-full rounded-full;
  z-index: 1;
  height: 8px;
  margin-top: -4px;
  background-color: rgba(255, 255, 255, .3);
}

.color-bar {
  @apply absolute top-1/2 w-full;
  z-index: 2;
  height: 8px;
  margin-top: -4px;
}

.color-bar span{
  @apply rounded-full block h-full;
  /* this will do the magic */
  mask:linear-gradient(#000 0 0);
}

.color-bar span:before {
  content:"";
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-image: linear-gradient(to right, #FFD25F, #FF5C01);
}
.scales > div:first-child {
  @apply transform translate-x-1 justify-start;
}

.scales > div:last-child {
  @apply transform -translate-x-1 right-0 justify-end;
  left: auto !important;
}
</style>
