let localurl= "http://localhost:8083";
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#getClients").addEventListener('click', getClients);
  document.querySelector("#getAllServices").addEventListener('click', getAllServices);
});

function getClients(event){
  event.preventDefault();
  document.querySelector("#divClients").style.display = "block";
  document.querySelector("#divServices").style.display = "none";
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