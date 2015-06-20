import Ember from 'ember';

export default Ember.Controller.extend({
	minValue1: moment().subtract(5,'days'),
	maxValue1: moment().add(5,'days'),

	minValue2: moment().startOf('month'),
	maxValue2: moment().add(1, 'month').endOf('month')
});
