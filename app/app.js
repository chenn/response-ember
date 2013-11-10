App.Store = DS.Store.extend({
  adapter: DS.FixtureAdapter
});

// Enable pushState
// App.Router.reopen({
//   location: 'history'
// });

App.Router.map(function() {
  this.resource('incident', {path: '/incident'});
  this.resource('account', {path: '/account'});
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('incident')
  }
});

App.DateRangeComponent = Ember.Component.extend({
  actions: {
    acceptChanges: function() {
      start = new Date(this.get('start'));
      end = new Date(this.get('end'));
      if (isNaN(start)) {
        this.$('.start.date').addClass('error');
      }
      else if (isNaN(end)) {
        this.$('.end.date').addClass('error');
      }
      else {
        this.$('.date').removeClass('error');
        this.set('startDate', start);
        this.set('endDate', end);
        this.set('start', start.toDateString().slice(4));
        this.set('end', end.toDateString().slice(4));
      }
    }
  }
});

App.EditInfoView = Ember.TextField.extend({});

Ember.Handlebars.helper('edit-info', App.EditInfoView);
