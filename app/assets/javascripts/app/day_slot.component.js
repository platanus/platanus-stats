Vue.component('day-slot', {
  template: `<div :class="classObject"
                  :style="{ 'background-color': color }">
            </div>`,
  // mode = normal | selected
  props: ['color', 'mode'],
  computed: {
    classObject: function() {
      return {
        'day-slot': true,
        'day-slot--selected': this.mode == 'selected',
      }
    }
  }
})
