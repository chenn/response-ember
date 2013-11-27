App.Response = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  message: DS.attr('string'),
  status: DS.attr('number')
});
