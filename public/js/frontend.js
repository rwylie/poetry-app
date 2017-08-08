var User = {};
function auth () {
  return new Promise(function (resolve, reject) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(function (result) {
        User.user = result.user;
        $.post( "/save_uid", {uid: result.user.uid})
          .done(function () {
            resolve(User);
            var next_url = location.search;
            if (next_url) {
              next_url = next_url.split("=")[1];
            }
            location.href = next_url || "/";
          });
      })
      .catch(function (e) {
        reject(e);
      });
  });
}

firebase.auth()
  .onAuthStateChanged(function(user) {
    if (user) {
      User.user = user;
      console.log(user);
      $.post( "/save_uid", {uid: user.uid});
      document.getElementById('loggedout').innerHTML =  User.user.displayName + " is a poetic genius!";
      poemBy();
    }
  });

function logout () {
  firebase.auth().signOut().then(function() {
    User = {};
    $.post("/logout");
    loggedOut();
  }, function(error) {
    console.log(error);
  });
}

function loggedOut() {
    document.getElementById('loggedout').innerHTML = "Goodbye. You are now logged out";
}
function poemBy() {
  if (User)
  {
    var poemby = document.getElementById('poem-by');
    if (poemby) {
      poemby.innerHTML = User.user.displayName;
    }

    var uid = document.getElementById('uid');
    if (uid) {
      uid.value = User.user.uid;
    }
  }
}
$(document).ready(function(){
     $('.parallax').parallax();
// the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
     $('.modal').modal();
//show edit and hide poem
     $("#e").click(function(){
     $('#poemEdit').show();
     $('#poemShow').hide();
     $(this).hide();
   });
    // Initialize collapse button
    $(".button-collapse").sideNav();


});
