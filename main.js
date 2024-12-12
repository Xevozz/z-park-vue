const baseUri = "http://localhost:5143/api/UsersControllerDb"; // Ændret af Rebin: Rettet til korrekt endpoint.


class loginData {
  constructor(licenseplate, password){
    this.licenseplate = licenseplate; 
    this.password = password; 
  }
}

 Vue.createApp({
   data() {
     return {
       Userslist: [], // Ændret af Rebin: Rettet fra User til Userslist.
       error: null,
       statuscode: null,
       loggedInUser: null, // Stores the username after login
       licenseplate: "",
       Name: "",
       Surname: "",
       Mail: "",
       Username: "",
       Password: "",
       StationId:"06170", //Roskilde Lufthavn som datakilde.
       ApiKey:"f12adcb1-0bcb-4d7b-ad45-b8475b0f12fd", //Personlig API-key fra DMI.

     };
   },
 
   created() {
     console.log("created method called");
     this.getAllUsers(); // Ændret og tilføjet af Rebin: Tilføjet for at hente brugere ved opstart.
   },
 
   methods: {

    cleanList() {
      this.Userslist = []; // Ændret af Rebin: Rettet fra User til Userslist.
      this.error = null;
      console.log("count Users: " + this.Userslist.length); // Ændret af Rebin: Rettet fra User.length til Userslist.length.
    },

    //Bruger Axios GET ved brug af DMI endpoint stringen med stationid og api-key, med fejlhåndtering.
    getWeatherData() {
      this.loading = true; //indikerer at en dataindlæsning, som en API-anmodning er i gang, hvis true indlæses data
      this.error = null; // Nulstiller fejlinformationen, før der udføres en ny proces. fjerner gamle fejlhåndteringer.

      //Bruges som "Endpoint" til at connected til DMIs URL.
      const endpoint = `https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?stationId=${this.StationId}&api-key=${this.ApiKey}`;

      axios
        .get(endpoint)
        .then((response) => { //indhenter Vejret
            this.weatherData = response.data; //DMI's data response, gerne med vejret.
         })
            .catch((error) => { //fejlhåndtering
            this.error = 'Kunne ikke få fat i vejr data: ' + error.message;
          })
            .finally(() => { //fejlhåndtering
            this.loading = false;
          });
    },
 
     getAllUsers() {
       this.error = null;
       axios
       .get(baseUri) //ændret af Rebin
         .then((response) => {
           console.log("in function getAllUsers");
           console.log("status code: " + response.status);
 
           this.Userslist = response.data; // Ændret af Rebin: Rettet fra User til Userslist.
           this.status = response.status;
 
           console.log("length of the Userslist array: " + this.Userslist.length);
         })
         .catch((error) => {
           this.Userslist = []; // Ændret af Rebin: Rettet fra User til Userslist.
           this.error = error.message;
           console.log("Error: " + this.error);
         });
     },
 
     getById(licenseplate) {
       this.error = null;
       const uri = `${baseUri}/${licenseplate}`; // Ændret af Rebin
       axios
         .get(uri)
         .then((response) => {
           console.log("Uri: " + uri);
           console.log("status code: " + response.status);
 
           this.Userslist = [response.data]; // Ændret af Rebin: Direkte tildeling til array ved userlist.
           this.status = response.status;
         })
         .catch((error) => {
           this.Userslist = []; // Ændret af Rebin: Rettet fra User til Userslist.
           this.error = error.message;
           console.log("Error: " + this.error);
         });
     },
 
     OpretBruger() {
      console.log("OpretBruger kaldt"); // Debugging
      this.error = null;
      axios
          .post("http://localhost:5143/api/UsersControllerDb", {
            licenseplate: this.licenseplate,
            Name: this.Name,
            Surname: this.Surname,
            Mail: this.Mail,
            Username: this.Username,
            Password: this.Password,
         })  
         .then((response) => {
           console.log("status code: " + response.status);
           this.status = response.status;

           alert("Bruger oprettet med succes!");
           window.location.href = "Brugere.html";
         })
         .catch((error) => {
           this.error = error.message;
           console.log("Error: " + this.error);
         });
     },
 
     deleteUserById(id) {
       this.error = null;
       const uri = `${baseUri}/${id}`; // Ændret af Rebin
       axios
         .delete(uri)
         .then((response) => {
           console.log("status code: " + response.status);
           this.status = response.status;
         })
         .catch((error) => {
           this.error = error.message;
           console.log("Error: " + this.error);
         });
     },

     
    verifyLogin() {
          console.log("Log ind metode kaldt");
          if (this.licenseplate == "" || this.Password == "") {
              console.error("Nummerplade og kodeord skal udfyldes");
              return;
          }
  
          const loginAttempt = new loginData(this.licenseplate, this.Password);
  
          axios({
              url: 'http://localhost:5143/api/UsersControllerDb/login',
              data: loginAttempt,
              method: "POST"
          })
              .then((response) => {
                  console.log("Serverens svar:", response.data);
                  if (response.status == 200) {
                      this.loggedInUser = response.data.username; // Sæt den loggede ind bruger
                      alert("Login succesfuldt!");
                  } else {
                      alert("Forkert nummerplade eller kodeord.");
                  }
              })
              .catch((error) => {
                  console.error("Login fejl:", error);
              });
      },
  
      logout() {
          console.log("Log ud metode kaldt");
          this.loggedInUser = null; // Fjern login-status
          this.licenseplate = "";  // Nulstil indtastningsfelter
          this.Password = "";
          alert("Du er nu logget ud.");
      }
  },
 }).mount("#app");
 