// App.AccountRoute = Ember.Route.extend({
//   model: function() {
//     return this.store.find('account', 0);
//   },
//   renderTemplate: function() {
//     this.render();  // Render account template
//     this.render('account-basic-info', {
//       into: 'account',
//       outlet: 'basicInfo'
//     });
//     this.render('account-oot', {
//       into: 'account',
//       outlet: 'outOfTown'
//     });
//   }
// });

// App.AccountController = Ember.ObjectController.extend({
//   actions: {
//     editBasicInfo: function() {
//       this.set('isEditingBasicInfo', true);
//     },
//     acceptChanges: function() {
//       this.set('isEditingBasicInfo', false);
//       this.get('model').save();
//     }
//   },
//   isEditingBasicInfo: false,
//   ootOptions: [
//     {text: 'No', val: false},
//     {text: 'Yes', val: true}
//   ]
// });

// App.Account = DS.Model.extend({
//   firstName: DS.attr('string'),
//   lastName: DS.attr('string'),
//   email: DS.attr('string')
// });

// App.Account.FIXTURES = [
//   {
//     id: 0,
//     firstName: 'Chris',
//     lastName: 'Henn',
//     email: 'email@foo.net',
//     oot: false
//   }
// ];
