import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('date-picker', 'Unit | Component | date picker', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test("date-picker behaviours", function(assert) {
  var component = this.subject({
    color: 'rgb(255, 0, 0)',
    value: '31/10/2014',
    formatIn: 'DD/MM/YYYY',
    formatOut: 'ddd, MM/DD/YYYY'
  });

  var $component = this.append();

  var expectedValue = 'fri, 10/31/2014',
    expectedMonth = 'october',
    expectedDayWeek = 'friday',
    expectedDay = '31';

  assert.equal($component.find('.value').text().toLowerCase(), expectedValue);

  assert.equal($component.find('.date-picker').length, 1);
  assert.equal($component.find('.value').css('color'), 'rgb(255, 0, 0)');

  assert.ok($component.find('.picker').hasClass('hidden'));

  $component.find('.value').click(); //click to open
    assert.ok(!$component.find('.picker').hasClass('hidden'));
    assert.equal($component.find('.day-week').text().toLowerCase(), expectedDayWeek);
    assert.equal($component.find('.day-month').text(), expectedDay);
    assert.equal($component.find('.month').text().toLowerCase(), expectedMonth);


  $component.find('.month-btn:eq(0)').click(); //next month
    expectedMonth = 'november';
    expectedDayWeek = 'sunday';
    expectedDay = '30';

    assert.equal($component.find('.day-week').text().toLowerCase(), expectedDayWeek);
    assert.equal($component.find('.day-month').text(), expectedDay);
    assert.equal($component.find('.month').text().toLowerCase(), expectedMonth);
 
  $component.find('.month-btn:eq(1)').click(); //prev month
    expectedMonth = 'october';
    expectedDayWeek = 'thursday';

    assert.equal($component.find('.day-week').text().toLowerCase(), expectedDayWeek);
    assert.equal($component.find('.day-month').text(), expectedDay);
    assert.equal($component.find('.month').text().toLowerCase(), expectedMonth);

  $component.find('.selected-date .btn:eq(1)').click(); //Cancel
    assert.ok($component.find('.picker').hasClass('hidden'));
    assert.equal($component.find('.value').text().toLowerCase(), expectedValue);

  $component.find('.value').click();
    assert.ok(!$component.find('.picker').hasClass('hidden'));

  $component.find('.picker-day:eq(0)').click(); //Select a day to change the date
    expectedMonth = 'september';
    expectedDayWeek = 'sunday';
    expectedDay = '28';

    assert.equal($component.find('.day-week').text().toLowerCase(), expectedDayWeek);
    assert.equal($component.find('.day-month').text(), expectedDay);
    assert.equal($component.find('.month').text().toLowerCase(), expectedMonth);

  $component.find('.selected-date .btn:eq(0)').click(); //Done
    expectedValue = 'sun, 09/28/2014';
    assert.equal($component.find('.value').text().toLowerCase(), expectedValue);

});
