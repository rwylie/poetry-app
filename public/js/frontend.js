var User = {};
function auth () {
  return new Promise(function (resolve, reject) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(function (result) {
        User.user = result.user;
        resolve(User);
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
      document.getElementById('loggedout').innerHTML =  User.user.displayName + " is a poetic genius!";
      poemBy();
    }
  });

function logout () {
  firebase.auth().signOut().then(function() {
    User = {};
  }, function(error) {
    // An error happened.
  });
}

function loggedOut() {
    document.getElementById('loggedout').innerHTML = "Goodbye. You are now logged out";
}
function poemBy() {
  if (User)
  {
  document.getElementById('poem-by').innerHTML = User.user.displayName;
  document.getElementById('uid').value = User.user.uid;
  }
}
$(document).ready(function(){
     $('.parallax').parallax();
// the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
     $('.modal').modal();
});
