App.Store = DS.Store.extend({
  adapter: DS.FixtureAdapter
});

App.Router.map(function() {
  this.resource('responders', {path: '/responders'});
  this.resource('account', {path: '/account'});
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('responders')
  }
});
