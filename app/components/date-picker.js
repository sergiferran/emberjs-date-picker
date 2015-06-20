import Ember from 'ember';

export default Ember.Component.extend({
  isPickerVisible: false,
  color: 'gray',
  value: 'today',
  minValue: null,
  maxValue: null,
  date: null,
  newDate: null,
  formatIn: 'YYYY-MM-DD',
  formatOut: 'ddd, MM/DD/YYYY',
  clickListener: null,
  isFlipped: false,

  init: function() {
    this._super();
    var clickListener = function(ev) {
      var $target = Ember.$(ev.target),
        isClickedOutside = $target.parents('.picker').length === 0 && !$target.hasClass('picker') && !$target.hasClass('picker-day');

      if (isClickedOutside) {
        this.send('closePicker');
      }
    };
    this.set('clickListener', Ember.run.bind(this, clickListener));
  },

  willDestroy: function(){
  	Ember.$(document.body).off('mousedown', this.get('clickListener'));
  	this.set('clickListener', null);
  	return this._super();
  },

  getDate: function() {
    var date = this.get('date');
    if (!date && 'today' === this.get('value')) {
      date = moment();
      this.set('date', date);
    }
    return date;
  },
  setDate: function() {
    var value = this.get('value');
    if (value) {
      var valueM = moment(value, this.get('formatIn')),
        date = this.getDate();
      if (!date || !valueM.isSame(date, 'day')) {
        this.set('date', valueM);
      }
    }
  }.on('init').observes('value'),

  setValue: function() {
    var date = this.getDate();
    if (this.get('value') !== 'today') {
      this.set('value', date.format(this.get('formatIn')));
    }
  }.observes('date'),

  changeColor: function() {
    var color = this.get('color');
    this.$('.picker-container').css({
      backgroundColor: color,
      color: color
    });
    this.$('.value').css({
      color: color
    });
  }.on('didInsertElement').observes('color'),

  valueFormatted: function() {
    var date = this.getDate();
    if (date) {
      return date.format(this.get('formatOut'));
    }
  }.property('date'),

  monthPicker: function() {
    var date = this.get('newDate');
    if (date) {
      return date.format('MMM YYYY');
    }
  }.property('newDate'),

  dayWeekFormatted: function() {
    var date = this.get('newDate');
    if (date) {
      return date.format('dddd');
    }
  }.property('newDate'),
  dayMonthFormatted: function() {
    var date = this.get('newDate');
    if (date) {
      return date.format('DD');
    }
  }.property('newDate'),
  monthFormatted: function() {
    var date = this.get('newDate');
    if (date) {
      return date.format('MMMM');
    }
  }.property('newDate'),

  weekdays: function() {
    var dow = moment.langData()._week.dow,
      dayweeks = moment.weekdaysMin();
    if (dow !== 0) {
      return dayweeks.concat(dayweeks.splice(0, dow));
    }
    return dayweeks;
  }.property(),

  weeks: function() {
    var date = this.get('newDate');
    if (!date) {
      return null;
    }
    var day = moment(date).startOf('month').startOf('week'),
      lastDay = moment(date).endOf('month').endOf('week'),
      month = date.month(),
      today = moment(),
      format = this.get('formatIn'),
      minValue = this.get('minValue'),
      maxValue = this.get('maxValue'),
      weeks = [],
      days = [],
      disabled;

    if (minValue) {
      minValue = moment(minValue, format);
    }
    if (maxValue) {
      maxValue = moment(maxValue, format);
    }
    do {
      disabled = false;
      if (minValue) {
        disabled = day.isBefore(minValue);
      }
      if (!disabled && maxValue) {
        disabled = day.isAfter(maxValue);
      }
      days.push({
        disabled: disabled,
        active: day.month() === month,
        day: day.date(),
        value: day.format(format),
        current: day.isSame(date, 'day'),
        today: day.isSame(today, 'day')
      });
      if (days.length % 7 === 0) {
        weeks.push(days);
        days = [];
      }

      day.add(1, 'days');
    } while (day.isBefore(lastDay) || day.isSame(lastDay));
    return weeks;
  }.property('newDate'),

  actions: {
    openPicker: function() {
      var date = this.getDate();
      this.set('newDate', moment(date));
      this.set('isPickerVisible', true);
      Ember.run.later(this, function() {
        var $picker = this.$('.picker');
        $picker.css('top', this.get('isFlipped') ? -($picker.outerHeight() + 15) : 'auto');
      }, 0);
      Ember.$(document.body).on('mousedown', this.get('clickListener'));
    },

    closePicker: function() {
      var newDate = this.get('newDate');
      if (newDate) {
        this.set('value', newDate.format(this.get('formatIn')));
      }
      this.set('isPickerVisible', false);
      Ember.$(document.body).off('mousedown', this.get('clickListener'));
    },

    switchPicker: function() {
      var isPickerVisible = this.get('isPickerVisible');
      if (isPickerVisible) {
        this.send('closePicker');
      } else {
        this.send('openPicker');
      }
    },

    cancelPicker: function() {
      this.set('newDate', null);
      this.send('closePicker');
    },

    nextMonth: function() {
      var date = this.get('newDate'),
        maxValue = this.get('maxValue');

      if (maxValue) {
        maxValue = moment(maxValue, this.get('formatIn'));
        if (date.isSame(maxValue, 'month')){
			return;
        }
      }

      date.add(1, 'months');
      if (date.isAfter(maxValue, 'day')) {
        this.set('newDate', moment(maxValue));
      } else {
        this.notifyPropertyChange('newDate');
      }
    },

    prevMonth: function() {
      var date = this.get('newDate'),
        minValue = this.get('minValue');

      if (minValue) {
        minValue = moment(minValue, this.get('formatIn'));
        if (date.isSame(minValue, 'month')) {return;}
      }

      date.add(-1, 'months');
      if (date.isBefore(minValue, 'day')) {
        this.set('newDate', moment(minValue));
      } else {
        this.notifyPropertyChange('newDate');
      }
    },

    changeDay: function(day) {
      if (!day.disabled) {
        this.set('newDate', moment(day.value, this.get('formatIn')));
      }
    }
  }
});
