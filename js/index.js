
var localurl= "http://192.168.10.12:8080/vet";
document.addEventListener('DOMContentLoaded', () => {
    fetch(localurl+'/races')
    .then(response => response.json())
    .then(races => {
      races.forEach(race => {
        let raceList= document.querySelector("#raceList");
        let option= document.createElement("option");
        option.value= race.race;
        raceList.appendChild(option);
     })
    }).catch(error => {
      console.log("ERROR GETTING RACES: ", error) 
    });
    
    fetch(localurl+'/species')
    .then(response => response.json())
    .then(species => {
      species.forEach(specie => {
        let raceList= document.querySelector("#specieList");
        let option= document.createElement("option");
        option.value= specie.specie;
        raceList.appendChild(option);
      })
    }).catch(error => {
      console.log("ERROR GETTING RACES: ", error) 
    });
    fetch(localurl+'/colors')
    .then(response => response.json())
    .then(colors => {
      colors.forEach(color => {
        let colorList= document.querySelector("#colorList");
        let option= document.createElement("option");
        option.value= color.color;
        colorList.appendChild(option);
      });
    }).catch(error => {
      console.log("ERROR GETTING RACES: ", error) 
    });
  document.querySelector('#formPet').addEventListener('submit', submitPet);
});

function submitPet(event){
    let email= document.querySelector('#email');
    event.preventDefault();
    let form = event.currentTarget;
    form.action= localurl+"/registerPet";
    console.log(form["ced"].value, form["petName"].value, form["email"].value, form["petRace"].value, form["petColor"].value);
    let data= {
      email: email.value,
      ced: form["ced"].value,
      name: form["petName"].value,
      specie: form["petSpecie"].value,
      weight: form["petWeight"].value,
      race: form["petRace"].value,
      color: form["petColor"].value,
      size: Number(form["petSize"].value),
      date: form["petDate"].value
    };
    //console.log(JSON.stringify(data));
    fetch(form.action, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      let divAlert= document.querySelector('#divAlert');
      if(response.status==304){
        divAlert.className= "alert alert-warning";
        divAlert.innerHTML = "Ya tiene una mascota registrada con ese nombre";
      }else if(response.status==201){
        form.reset();
        divAlert.className= "alert alert-success";
        divAlert.innerHTML = "Mascota registrada con éxito";
      }
      divAlert.focus();
    }).catch(error => {
      console.log("ERROR WHILE SUBMITING FORM: ", error);
    });
}
