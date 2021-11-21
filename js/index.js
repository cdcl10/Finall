document.addEventListener('DOMContentLoaded', () => {
  try{
    fetch('http://192.168.0.107:8080/petForm/races')
    .then(response => response.json())
    .then(races => {
      races.forEach(race => {
        console.log(race);
      });
    });
    fetch('http://192.168.0.107:8080/petForm/colors')
    .then(response => response.json())
    .then(colors => {
      colors.forEach(color => {
        console.log("Colors ---------------------------------------");
        console.log(color);
      });
    });
  }catch(error){
    console.log("ERROR WHEN GET THE RACES AND COLORS: ", error)
  }

  document.querySelector('#btnSubmit').addEventListener('click', submitPet);
});

function submitPet(){
  let email= document.querySelector('#email');
  fetch('http://192.168.0.107:8080/clients/'+email.value+'/pets', {
    method: 'POST', 
    body: JSON.stringify({
      ownerId: email,
      name: document.querySelector('#petName').value,
      specie: document.querySelector('#petSpecie').value,
      race: document.querySelector('#petRace').value,
      color: document.querySelector('#petColor').value,
      size: document.querySelector('#petSize').value,
      birthDate: document.querySelector('#petDate').value,
    })
  })
  .then(response => response.json())
  .then(result => {
    console.log(result);
  });
}