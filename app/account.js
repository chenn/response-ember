App.AccountRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('account', 0);
  }
});

App.AccountController = Ember.ObjectController.extend({
  actions: {
    editBasicInfo: function() {
      this.set('isEditingBasicInfo', true);
    },
    acceptChanges: function() {
      this.set('isEditingBasicInfo', false);
      this.get('model').save();
    }
  },
  isEditingBasicInfo: false
});

App.Account = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string')
});

App.Account.FIXTURES = [
  {
    id: 0,
    firstName: 'Chris',
    lastName: 'Henn',
    email: 'email@foo.net'
  }
];

App.EditInfoView = Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus;
  }
});

Ember.Handlebars.helper('edit-info', App.EditInfoView);
