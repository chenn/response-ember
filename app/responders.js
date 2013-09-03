App.RespondersRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('responder');
  }
});

App.RespondersController = Ember.ArrayController.extend({
  sortProperties: ['status', 'name'],
  sortAscending: false
});
