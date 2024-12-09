const baseUri = "http://localhost:5143/api/UsersControllerDb"; // Ændret af Rebin: Rettet til korrekt endpoint.

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
 
     getAllUsers() {
       this.error = null;
       axios
       .get("http://localhost:5143/api/UsersControllerDb") //ændret af Rebin
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
          if (!this.licenseplate || !this.password) {
              this.errorMessage = "Both fields are required.";
              this.successMessage = "";
              return;
          }

          // Axios POST request with .then() and .catch() for Login.
          console.log("Sending login request...");
          axios
              .get("http://localhost:5143/api/UsersControllerDb", {
              })
              .then((response) => {
                  const result = response.data;

                  if (result.success) {
                      this.successMessage = "Login successfuldt!";
                      this.errorMessage = "";
                  } else {
                      this.errorMessage = result.message || "Forkert Nummerplade/Password ";
                      this.successMessage = "";
                  }
              })
              .catch((error) => {
                  this.errorMessage = "Der skete en fejl, Prøv igen";
                  this.successMessage = "";
                  console.error(error);
              });
          },
      },
 }).mount("#app");
 