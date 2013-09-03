App.ResponderController = Ember.ObjectController.extend({
  actions: {
    setStatus: function(code) {
        this.set('status', code)
    },
    delete: function() {
        this.get('model').deleteRecord();
    }
  },
  statusClass: function() {
    var modelStatus = this.get('status'),
        styleClass = '';
    if (modelStatus === 3) {
      styleClass = 'success';
    }
    else if (modelStatus === 2) {
      styleClass = 'danger';
    }
    else if (modelStatus === 1) {
      styleClass = 'warning';
    }
    else {
      styleClass = '';
    };
    return styleClass;
  }.property('status')
});

App.Responder = DS.Model.extend({
  name: DS.attr('string'),
  message: DS.attr('string'),
  status: DS.attr('number'),
});

App.Responder.FIXTURES = [
  {
    id: 0,
    name: 'Chris Henn',
    message: 'responding to location',
    status: 3
  },
  {
    id: 1,
    name: 'Another Person',
    message: 'cant make it',
    status: 2
  },
  {
    id: 2,
    name: 'Cant Text',
    message: 'something unrelated',
    status: 1
  },
  {
    id: 4,
    name: 'Someone Else',
    message: 'I won\'t be there',
    status: 2
  },
  {
    id: 3,
    name: 'Just Responded',
    message: 'I am available',
    status: 0
  }
];
