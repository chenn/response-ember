App.IncidentRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('responder');
  }
});

App.IncidentController = Ember.ArrayController.extend({
  sortProperties: ['status', 'name'],
  sortAscending: false
});
