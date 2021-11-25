let localurl= "http://localhost:8083";
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#getClients").addEventListener('click', getClients);
  document.querySelector("#getAllServices").addEventListener('click', getAllServices);
  document.querySelector("#getAllBills").addEventListener('click', getAllBills);
});

function getClients(event){
  event.preventDefault();
  document.querySelector("#divClients").style.display = "block";
  document.querySelector("#divServices").style.display = "none";
  document.querySelector("#divBills").style.display = "none";
  fetch(localurl+"/clients")
  .then(response => response.json())
  .then(clients => {
    let tBody= document.querySelector("#tBodyClients");
    tBody.textContent = '';
    let tr= document.createElement("tr");
    let thName= document.createElement("th");
    let thEmail= document.createElement("th");
    let thAddress= document.createElement("th");
    let thPets= document.createElement("th");
    thName.textContent= "NOMBRE";
    thEmail.textContent= "EMAIL";
    thAddress.textContent= "DIRECCIÓN";
    thPets.textContent= "MASCOTAS";
    tr.appendChild(thName);
    tr.appendChild(thEmail);
    tr.appendChild(thAddress);
    tr.appendChild(thPets);
    tBody.appendChild(tr);
    clients.clients.forEach(client => {
      let tr= document.createElement("tr");
      let tName= document.createElement("td");
      let tEmail= document.createElement("td");
      let tAddress= document.createElement("td");
      let tPets= document.createElement("td");
      let btnPets= document.createElement("button");
      tName.textContent= client.name;
      tEmail.textContent= client.email;
      tAddress.textContent= client.address;
      btnPets.innerHTML= "Ver mascotas";
      btnPets.onclick= function () {
        seePets(client.pets);
      };
      let ul= document.createElement("ul")
      client.pets.forEach(pet => {
        let li= document.createElement("li")
        li.textContent= pet.name;
        ul.appendChild(li);
      });
      tPets.appendChild(ul);
      tr.appendChild(tName);
      tr.appendChild(tEmail);
      tr.appendChild(tAddress);
      tr.appendChild(tPets);
      tBody.appendChild(tr);
    })
  });
}

function seePets(pets){
  let body= document.querySelector("body");
  let table= document.createElement('table');
  table.className= "table";
  let thead= document.createElement("thead");
  let tr= document.createElement("tr");
  let thName= document.createElement("th");
  thName.textContent= "NOMBRE";
  tr.appendChild(thName);
  thead.appendChild(tr);
  let tbody= document.createElement("tbody");
  pets.forEach(pet => {
    let tr= document.createElement("tr");
    let tName= document.createElement("td");
    tName.textContent= pet.name;
    tr.appendChild(tName);
    tbody.appendChild(tr);
  });
  table.appendChild(thead);
  table.appendChild(tbody);
  body.appendChild(table);
}

function getAllServices(event){
  event.preventDefault();
  document.querySelector("#divBills").style.display = "none";
  document.querySelector("#divClients").style.display = "none";
  document.querySelector("#divServices").style.display = "block";
  fetch(localurl+"/services")
  .then(response => response.json())
  .then(services => {
    let tBody= document.querySelector("#tBodyServices");
    tBody.textContent = '';
    let tr= document.createElement("tr");
    let thService= document.createElement("th");
    let thRate= document.createElement("th");
    thService.textContent= "SERVICIO";
    thRate.textContent= "TARIFA";
    tr.appendChild(thService);
    tr.appendChild(thRate);
    tBody.appendChild(tr);
    services.forEach(service => {
      let tr= document.createElement("tr");
      let tService= document.createElement("td");
      let tRate= document.createElement("td");
      tService.textContent= service.service;
      tRate.textContent= service.rate;
      tr.appendChild(tService);
      tr.appendChild(tRate);
      tBody.appendChild(tr);
    })
  });
}

function getAllBills(event){
  event.preventDefault();
  document.querySelector("#divClients").style.display = "none";
  document.querySelector("#divServices").style.display = "none";
  document.querySelector("#divBills").style.display = "block";
  document.querySelector("#tBodyBills").innerHTML="";
  let div= document.querySelector("#divFormBills");
  div.innerHTML= `
    <form action="" method="post" id="formBills">
      <div class="mb-3">
        Email del cliente: <input type="text" id="email" class="form-control" required>
      </div>
      <div class="mb-3">
        <input type="submit" id="submit" class="btn btn-primary" value="Ingresar">
      </div>
    </form>
    `;
  document.querySelector("#formBills").addEventListener("submit", getClientBills);
}

function getClientBills(event){
  event.preventDefault();
  let form= event.currentTarget;
  let data= {
    email: form["email"].value, 
    name: ""
  };
  fetch(localurl+"/users/bills", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(bills => {
    let tBody= document.querySelector("#tBodyBills");
    tBody.textContent = '';
    let tr= document.createElement("tr");
    let thPetName= document.createElement("th");
    let thDate= document.createElement("th");
    let thRate= document.createElement("th");
    let thClient= document.createElement("th");
    let thServices= document.createElement("th");
    thPetName.textContent= "NOMBRE DE LA MASCOTA";
    thDate.textContent= "FECHA DE FACTURACIÓN";
    thRate.textContent= "COSTO";
    thClient.textContent= "EMAIL DEL CLIENTE";
    thServices.textContent= "SERVICIOS PRESTADOS";
    tr.appendChild(thPetName);
    tr.appendChild(thDate);
    tr.appendChild(thClient);
    tr.appendChild(thRate);
    tr.appendChild(thServices);
    tBody.appendChild(tr);
    //console.log(bills);
    bills.forEach(bill => {
      console.log(tBody);
      bill.forEach(b => {
        //console.log(b);
        let tr= document.createElement("tr");
        let tPetName= document.createElement("td");
        let tDate= document.createElement("td");
        let tServices= document.createElement("td");
        let tRate= document.createElement("td");
        let tClient= document.createElement("td");
        tPetName.textContent= b.petName;
        tDate.textContent= b.date;
        tRate.textContent= b.rate;
        tClient.textContent= b.client;
        let ul= document.createElement("ul");
        b.services.forEach(service => {
          let li= document.createElement("li");
          li.textContent= service;
          ul.appendChild(li);
        });
        tServices.appendChild(ul);
        tr.appendChild(tPetName);
        tr.appendChild(tDate);
        tr.appendChild(tServices);
        tr.appendChild(tRate);
        tr.appendChild(tClient);
        tBody.appendChild(tr);
      });
    })
  });
}

function fillTableBills(tbody){

}