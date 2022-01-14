<template>
<div class="text-white">{{ position }}</div>
<div
  class="handler"
  draggable="true"
  @drag="handleDrag"
  @dragstart="handleDragStart"
  @dragend="handleDragEnd"
  @drop="handleDragEnd"
/>

<div
  class="text-white w-5 h-5 bg-green-700"
  draggable="true"
  @drag="handleDrag"
  @dragstart="handleDragStart"
  :style="{
    transform: `translate(${position.x}px, ${position.y}px`
  }"
/>

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
    };
  },
  methods: {
    handleDragStart($event) {
      console.log('start', $event);
    },
    handleDrag($event) {
      const { position } = this;
      console.log('drag', $event.pageX, $event.offsetX, $event.x, $event.clientX, position);
      position.x = ($event.pageX);
      // position.y = ($event.offsetY);
      // const { target } = $event;
      // target.style.transform = `translate(${position.x}px, ${position.y}px)`;
    },
    handleDragEnd($event) {
      console.log('over', $event);
      const { position } = this;
      const { target } = $event;
      target.style.transform = `translate(${position.x}px, ${position.y}px)`;
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
  /*transform: translateX(-16px);*/
  touch-action: none;
  user-select: none;
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
</style>
