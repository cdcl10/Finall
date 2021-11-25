var localurl= "http://localhost:8083/users";
var weburl= "http://localhost:5500/";
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
    if(response.status === 404){
      let div= document.querySelector('#divAlert');
      div.className= "alert alert-warning";
      div.textContent= "Usuario o contraseña son incorrectas";
      div.focus();
    }else if(response.status === 302){
      console.log("user");
      window.location.replace(weburl+"/vetUser/index.html");
    }else if(response.status === 308){
      console.log("admins");
      window.location.replace(weburl+"/adminUser/index.html");
    }
    response.json()
    .then(data => console.log(data));
  }).catch(error => {
    console.log("ERROR Login user: ", error);
  });
}