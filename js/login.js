var localurl= "http://192.168.0.107:8083/users";
var weburl= "https://wiliamfm.github.io/bd1-final-view/";
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#formLogin').addEventListener('submit', submitFormLogin);
});

function submitFormLogin(event){
  event.preventDefault();
  let form= event.currentTarget;
  data= {
    username: form["username"].value,
    password: form["password"].value
  };
  //console.log(data);
  fetch(localurl+"/validate", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(response => {
    console.log(response.status);
    console.log("RESPONSE", response.headers);
    if(response.status === 404){
      let div= document.querySelector('#divAlert');
      div.className= "alert alert-warning";
      div.textContent= "Usuario o contraseña son incorrectas";
      div.focus();
    }else if(response.status === 302){
      console.log("user");
      window.sessionStorage.setItem("type", "user");
    }else if(response.status === 308){
      console.log("admins");
      window.sessionStorage.setItem("type", "admin");
    }
    window.location.replace(weburl+"/vetUser/index.html");
  }).catch(error => {
    console.log("ERROR Login user: ", error);
  });
}