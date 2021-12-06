var localurl= "http://172.20.10.2:8000/users";
document.addEventListener('DOMContentLoaded', () => {
  window.sessionStorage.removeItem("type");
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
    //console.log("RESPONSE", response.headers);
    let aux= false;
    if(response.status === 404){
      let div= document.querySelector('#divAlert');
      div.className= "alert alert-warning";
      div.textContent= "Usuario o contraseña son incorrectas";
      div.focus();
      window.sessionStorage.removeItem("type");
    }else if(response.status === 302){
      console.log("user");
      window.sessionStorage.setItem("type", "user");
      aux= true;
    }else if(response.status === 200){
      console.log("admin");
      window.sessionStorage.setItem("type", "admin");
      aux= true;
    }
    if(aux){
      window.location.replace(weburl+"/vetUser/index.html");
    }
  }).catch(error => {
    console.log("ERROR Login user: ", error);
  });
}
