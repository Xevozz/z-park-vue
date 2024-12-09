const baseUri = "http://localhost:5143/api/UsersControllerDb"; // Ændret af Rebin: Rettet til korrekt endpoint.

 Vue.createApp({
   data() {
     return {
       Userslist: [], // Ændret af Rebin: Rettet fra User til Userslist.
       error: null,
       statuscode: null,
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
 
     PostUser() {
       this.error = null;
       axios
         .post(baseUri, {
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
   },
 }).mount("#app");
 