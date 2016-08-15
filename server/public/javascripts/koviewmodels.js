function kouser(data) {
  if (!data) { return; }

  if (data.logins_count) {
    this.logins_count = ko.observable(data.logins_count);
  } else {
    this.logins_count = ko.observable();
  }

  if (data.user_id) {
    this.user_id = ko.observable(data.user_id);
  } else {
    this.user_id = ko.observable();
  }

  if (data.last_login) {
    this.last_login = ko.observable(data.last_login);
  } else {
    this.last_login = ko.observable();
  }

  if (data.name) {
    this.name = ko.observable(data.name);
  } else {
    this.name = ko.observable();
  }

  if (data.picture) {
    this.picture = ko.observable(data.picture);
  } else {
    this.picture = ko.observable();
  }

  if (data.email) {
    this.email = ko.observable(data.email);
  } else {
    this.email = ko.observable();
  }

  this.identities = ko.observableArray([]);
}

function kouserresult(data) {
  if (!data) { return; }

  if (data.start) {
    this.start = ko.observable(data.start);
  } else {
    this.start = ko.observable();
  }


  if (data.limit) {
    this.limit = ko.observable(data.limit);
  } else {
    this.limit = ko.observable();
  }

  if (data.length) {
    this.length = ko.observable(data.length);
  } else {
    this.length = ko.observable();
  }

  if (data.total) {
    this.total = ko.observable(data.total);
  } else {
    this.total = ko.observable();
  }

  this.users = ko.observableArray([]);
  if (data.users) {
    ko.mapping.fromJS(data.users, {}, this.users);
  }

}

var kouserresults = function(data) {

  this.users = ko.observableArray([]);
  this.results = ko.observable();
  this.selectedUser = ko.observable();
  this.resultsJSON = {};

  this.total_logins = ko.computed(function () {
    var tc = 0;
    if(this.users && this.users().length > 0) {
      for(var i=0;i<this.users().length;i++) {
        tc += this.users()[i].logins_count();
      }
    }
    return tc;
  }, this);
};

kouserresults.prototype = function() {

  var getList = function(token) {
    var self = this;
    axios.get('/api/users', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(function (response) {
        self.resultsJSON = response.data;
        self.results(new kouserresult(response.data));
        ko.mapping.fromJS(response.data.users, {}, self.users);
        localStorage.setItem("users.results", JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return {
        getList: getList
    }
}();
