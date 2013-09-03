App.AccountRoute = Ember.Route.extend({
  model: function() {
      this.store.find('account');
  }
});

App.Account = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string')
});

App.Account.FIXTURES = [
  {
    id: 0,
    firstName: 'Chris',
    lastName: 'Henn'
  }
];
