$(document).ready(function() {
  App.init();
  Dashboard.init();
  getUsers();
});
var koresults = new kouserresults();

function getUsers() {
  var idToken = localStorage.getItem("id_token");
  koresults.getList(idToken);

}

function userTableAfterRender() {

$('.user-info').click(function (e) {
    for(var i=0;i<koresults.results().users().length;i++) {
      if(koresults.results().users()[i].user_id() == e.toElement.id) {
        koresults.selectedUser(koresults.results().users()[i]);
        //$('.user-info').modal();
        $('#modal-dialog').modal('show')

        $('#modal-dialog').on('hidden.bs.modal', function (e) {
          koresults.selectedUser(null);
        })

      }
    }
});
}


ko.applyBindings(koresults);
