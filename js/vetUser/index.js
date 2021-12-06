let localurl= "http://172.20.10.2:8000";
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#getClients").addEventListener('click', getClients);
  document.querySelector("#getAllServices").addEventListener('click', getAllServices);
  document.querySelector("#getAllBills").addEventListener('click', getAllBills);
  document.querySelector("#loadInfo").addEventListener('click', loadInfo);
  document.querySelector("#adminAddUser").addEventListener('click', adminActions);
  document.querySelector("#createBill").addEventListener('click', createBill);
  let userType= window.sessionStorage.getItem("type");
  if(userType === "user"){
    document.querySelector("#adminAddUser").style.display= "none";
  }else if (userType === "admin"){
    document.querySelector("#divActionsAdmin").style.display= "block";
  }else {
    document.querySelector("#divActions").innerHTML = `
    <div class="alert alert-danger" role="alert">
      Acceso denegado!
    </div>`;
  }
});

function getClients(event){
  event.preventDefault();
  document.querySelector("#divClients").style.display = "block";
  document.querySelector("#divServices").style.display = "none";
  document.querySelector("#divBills").style.display = "none";
  document.querySelector("#divLoadInfo").style.display = "none";
  document.querySelector("#divAdminActions").style.display = "none";
  document.querySelector("#divFormCreateBills").style.display = "none";
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
    clients.forEach(client => {
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
  document.querySelector("#divLoadInfo").style.display = "none";
  document.querySelector("#divAdminActions").style.display = "none";
  document.querySelector("#divFormCreateBills").style.display = "none";
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
      tService.textContent= service.type;
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
  document.querySelector("#divLoadInfo").style.display = "none";
  document.querySelector("#divAdminActions").style.display = "none";
  document.querySelector("#divFormCreateBills").style.display = "none";
  let div= document.querySelector("#divFormBills");
  div.innerHTML= `
    <form action="" method="post" id="formBills">
      <div class="mb-3">
        Cédula del cliente: <input list="listClients" id="ced" class="form-control" required>
        <datalist id= listClients>
        </datalist>
      </div>
      <div class="mb-3">
        <input type="submit" id="submit" class="btn btn-primary" value="Ingresar">
      </div>
    </form>
    `;
  fetch(localurl + "/clients")
  .then(response => response.json())
  .then(clients => {
    clients.forEach(cliente => {
      let clientsList= document.querySelector("#listClients");
      let option= document.createElement("option");
      option.value= cliente.ced.trim();
      clientsList.appendChild(option);
    });
  });
  document.querySelector("#formBills").addEventListener("submit", getClientBills);
}

function getClientBills(event){
  event.preventDefault();
  let form= event.currentTarget;
  let data= {
    ced: form["ced"].value, 
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
    let thPayMethods= document.createElement("th");
    thPetName.textContent= "NOMBRE DE LA MASCOTA";
    thDate.textContent= "FECHA DE FACTURACIÓN";
    thRate.textContent= "COSTO";
    thClient.textContent= "EMAIL DEL CLIENTE";
    thServices.textContent= "SERVICIOS PRESTADOS";
    thPayMethods.textContent= "MÉTODO DE PAGO";
    tr.appendChild(thPetName);
    tr.appendChild(thDate);
    tr.appendChild(thClient);
    tr.appendChild(thRate);
    tr.appendChild(thServices);
    tr.appendChild(thPayMethods);
    tBody.appendChild(tr);
    console.log(bills);
    bills.forEach(bill => {
      //console.log(tBody);
      //console.log(b);
      let tr= document.createElement("tr");
      let tPetName= document.createElement("td");
      let tDate= document.createElement("td");
      let tServices= document.createElement("td");
      let tRate= document.createElement("td");
      let tClient= document.createElement("td");
      let tPayMethods= document.createElement("td");
      tPetName.textContent= bill.pet.name;
      tDate.textContent= bill.date;
      tRate.textContent= bill.rate;
      tClient.textContent= bill.pet.owner.email;
      let ul= document.createElement("ul");
      bill.services.forEach(service => {
        let li= document.createElement("li");
        li.textContent= service.type;
        ul.appendChild(li);
      });
      tServices.appendChild(ul);
      let ul2= document.createElement("ul");
      bill.payMethods.forEach(pm => {
        let li= document.createElement("li");
        li.textContent= pm.method;
        ul2.appendChild(li);
      });
      tPayMethods.appendChild(ul2);
      tr.appendChild(tPetName);
      tr.appendChild(tDate);
      tr.appendChild(tClient);
      tr.appendChild(tRate);
      tr.appendChild(tServices);
      tr.appendChild(tPayMethods);
      tBody.appendChild(tr);
    })
  });
}

function loadInfo(event){
  event.preventDefault();
  document.querySelector("#divClients").style.display = "none";
  document.querySelector("#divServices").style.display = "none";
  document.querySelector("#divBills").style.display = "none";
  document.querySelector("#tBodyBills").innerHTML="";
  document.querySelector("#divLoadInfo").style.display = "block";
  document.querySelector("#divAdminActions").style.display = "none";
  document.querySelector("#divFormCreateBills").style.display = "none";
  let div= document.querySelector("#divLoadInfo");
  div.innerHTML= `
    <form action="" method="post" id="formLoadInfo" enctype="multipart/form-data">
      <div class="mb-3">
        Ingrese el archivo Excel: <input type="file" name="file" id="file" class="form-control" accept=".xlsx,.xls" required>
      </div>
      <div class="mb-3">
        <input type="submit" id="submit" class="btn btn-primary" value="Ingresar">
      </div>
    </form>
    `;
  document.querySelector('#formLoadInfo').addEventListener("submit", event => {
    event.preventDefault();
    let form= event.currentTarget;
    let data= new FormData(form);
    fetch(localurl+"/users/loadInfo", {
      method: "POST",
      //headers: { 'Content-Type': 'multipart/form-data'},
      body: data
    })
    .then(response => {
      console.log(response.status);
    });
  });
}

function adminActions(event){
  console.log("asdf");
  event.preventDefault();
  document.querySelector("#divClients").style.display = "none";
  document.querySelector("#divServices").style.display = "none";
  document.querySelector("#divBills").style.display = "none";
  document.querySelector("#tBodyBills").innerHTML="";
  document.querySelector("#divLoadInfo").style.display = "none";
  document.querySelector("#divAdminActions").style.display = "block";
  document.querySelector("#divFormCreateBills").style.display = "none";
  let div= document.querySelector("#divAdminActions");
  div.innerHTML= `
    <form action="" method="post" id="formAddUser">
      <div class="mb-3">
        Username: <input type="text" class="form-control" name="" id="username">
        Contraseña: <input type="password" class="form-control" name="" id="password">
      </div>
      <div class="mb-3">
        <input class="btn btn-primary" type="submit" value="Crear Usuario">
      </div>
    </form>
  `;
  div.style.display= "block";
  document.querySelector('#formAddUser').addEventListener("submit", event => {
    event.preventDefault();
    let form= event.currentTarget;
    let data= {
      username: form["username"].value,
      pass: form["password"].value,
      type: "admin"
    };
    console.log(data);
    fetch(localurl+"/users", {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(response => {
      console.log(response.status);
      if(response.status == 201){
        alert("Usuario creado con éxito");
      }else{
        alert("No se pudo crear el usuario");
      }
    });
  });
}

function createBill(event){
  event.preventDefault();
  document.querySelector("#divClients").style.display = "none";
  document.querySelector("#divServices").style.display = "none";
  document.querySelector("#divBills").style.display = "none";
  document.querySelector("#tBodyBills").innerHTML="";
  document.querySelector("#divLoadInfo").style.display = "none";
  document.querySelector("#divAdminActions").style.display = "none";
  document.querySelector("#divFormCreateBills").style.display = "block";
  fetch(localurl+'/bills/getPayMethods')
    .then(response => response.json())
    .then(pms => {
      pms.forEach(pm => {
        let pmsList= document.querySelector("#listPayMethods");
        let option= document.createElement("option");
        option.value= pm.method;
        pmsList.appendChild(option);
      })
    }).catch(error => {
      console.log("ERROR GETTING PMS: ", error) 
    });
    fetch(localurl+'/services')
    .then(response => response.json())
    .then(services => {
      services.forEach(s => {
        let servicesList= document.querySelector("#listServices");
        let option= document.createElement("option");
        option.value= s.type;
        servicesList.appendChild(option);
      })
    }).catch(error => {
      console.log("ERROR GETTING RACES: ", error) 
    });
  document.querySelector('#formCreateBills').addEventListener("submit", event => {
    event.preventDefault();
    let form= event.currentTarget;
    let ss = form['idServices'].value.split(';');
    let pms = form['idPayMethods'].value.split(';');
    ss= ss.map(s => s.trim());
    pms= pms.map(s => s.trim());
    let data= {
      petName: form['petName'].value,
      ced: form['idClient'].value,
      services: ss,
      payMethods: pms,
    };
    fetch(localurl + '/bills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(response => {
      if(response.status === 201){
        alert("Factura creada con éxito");
      }else{
        alert("Ups!, algo salió mal");
      }
    });
  });
}
