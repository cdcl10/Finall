var localurl= "http://192.168.0.107:8083/clients";
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector("#formRegister").addEventListener('submit', submitForm)
});

function submitForm(event){
  event.preventDefault();
  let form= event.currentTarget;
  let data= {
    email: form["email"].value,
    ced: form["ced"].value,
    name: form["name"].value,
    address: form["address"].value
  };
  //console.log(data);
  fetch(localurl, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(response => {
    let divAlert= document.querySelector("#divAlert");
    if(response.status == 201){
      divAlert.className= "alert alert-warning";
      divAlert.innerHTML= "Se ha registrado con éxito";
    }else if(response.status == 302){
      divAlert.className= "alert alert-success";
      divAlert.innerHTML= "Se han actualizado los datos con éxito";
    }else {
      divAlert.className= "alert alert-danger";
      divAlert.innerHTML= "El email ya se encuentra registrado";
    }
    form.reset();
    divAlert.focus();
  }).catch(err => {
    console.log("Error while submiting form: ", err);
  });
}