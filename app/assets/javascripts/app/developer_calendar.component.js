Vue.component('developer-calendar', {
  data: function() {
    return {
      calendar: [],
      slotSelected: null,
      slotOnHover: null,
      dates: [],
    }
  },
  template: `<div class="developer-calendar">
              <div class="developer-calendar__name">{{developer}}</div>
              <div class="developer-calendar__calendar">
                <div>
                  <div class="developer-calendar__months">
                    <div class="developer-calendar__month"
                         v-if="date.day() == 1"
                         v-for="date in dates">
                      {{date.format('MMMM')}}
                    </div>
                  </div>

                  <div class="developer-calendar__days">
                    <div class="developer-calendar__day"
                         v-for="date in dates"
                         :class="{'developer-calendar__day--important': date.day() == 1}">
                      <div>{{date.format('DD')}}</div>
                      <div>{{date.format('dd')}}</div>
                    </div>
                  </div>
                </div>
                <div class="developer-calendar__hour-row" v-for="slots in calendar">
                  <day-slot v-for="slot in slots"
                    :color="slot.color"
                    :mode="slot.mode"
                    @click.native="selectSlot(slot)"
                    @mouseover.native="slotOnHover = slot">
                  </day-slot>
                </div>
              </div>
            </div>`,
  props: ['developer', 'assignments', 'start', 'end', 'projects'],
  methods: {
    selectSlot: function (slot) {
      if(this.slotSelected) {
        let colors = ['green', 'black', 'yellow', 'blue', 'pink', 'white', 'gray', 'purple'];
        let color = _.sample(colors);
        _.forEach(_.flattenDeep(this.calendar), function(slot) {
          if(slot.mode == 'selected')
            slot.color = color;
        });
        this.slotSelected = undefined;
      }
      else {
        this.slotSelected = slot;
      }

      this.updateSelected();
    },
    updateSelected: function() {
      var self = this;
      _.forEach(_.flattenDeep(this.calendar), function(slot) {
        let inSelection = (
                          self.slotSelected &&
                          self.slotOnHover &&
                          self.slotSelected.dayIndex <= slot.dayIndex &&
                          self.slotSelected.hourIndex <= slot.hourIndex &&
                          slot.dayIndex <= self.slotOnHover.dayIndex &&
                          slot.hourIndex <= self.slotOnHover.hourIndex
                          )

        slot.mode = inSelection ? 'selected': 'normal';
      });
    },
  },
  watch: {
    slotOnHover: function() {
      this.updateSelected();
    }
  },
  created: function() {
    let hours = [1, 2, 3, 4, 5, 6, 7, 8];
    let date = moment(this.start);

    var datesTemp = [];
    while(date.isBefore(this.end)) {
      if(date.day() < 6 && date.day() > 0)
        datesTemp.push(date.clone());

      date.add(1, 'day');
    }

    this.dates = datesTemp;
    let self = this;
    this.calendar = hours.map(function(hour, hourIndex) {
      return self.dates.map(function(date, dateIndex) {
        return {
          dayIndex: dateIndex,
          hourIndex: hourIndex,
          color: 'green',
          mode: 'normal',
        }
      });
    });
  }
})
