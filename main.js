const baseUri = "http://localhost:5143/api/Z-ParkLib/Model/User"
    /* DB Port = 1433 */
    /* Localhost Port = 5143 */

Vue.createApp
(
    {
        data() 
        {
          return {
            newlist:[],
            Userslist: [],
            error: null,
            statuscode:null,
            getUserById: "",
            deleteUserById:"",
            PostUser: "",
            Licenseplate:"",
            Name:"",
            Surname: "",
            Mail: "",
            Username: "",
            Password: "",

                                    //our DOM with available parking spaces in our garage.
            totalParkingSpaces: 50, // Total capacity of the garage (static)
            carsParked: 0,          // Current number of parked cars (changes with parked cars)
          };

        },

          /*created(){
            // created() is a life cycle method, not an ordinary method
            // created() is called automatically when the page is loaded
              console.log("created method called")
                this.getAllUsers()
          },*/

        methods:  // This methods reacts when a sensor / button is triggered. when enters / exits the garage.
        {
            methods: { 
              cleanList() {
                this.User = [];
                this.error = null;
                console.log("count Users : " + this.User.length);
              },

              getAllUsers() {
                  this.error = null;
                  //axios call that returns all the elements from the webservice
                  axios.get(baseUri)
                  .then(response => {
      
                  console.log("in function getAllUsers");
                  console.log("status code: "+ response.status );
      
                  //add the returning data from the webservice to the variable carlists
                  this.User = response.data;
                  this.status = response.status;
                    
                  console.log("length of the userlist array " + this.User.length)
      
      
                  })
                  .catch(error => {
                    //resultElement.innerHTML = generateErrorHTMLOutput(error);
                    this.User = []
                    this.error = error.message
                    console.log("Error:" + this.error);
                  })      
                
              },

                getById(Licenseplate){
                  this.error = null;
                  //axios call that returns the items from a specified user 
                  uri = baseUri +"/"+id
                  axios.get(uri)
                  .then(response => {
                  
                  console.log("Uri: " + uri)
      
                  console.log("in function getById");
                  console.log("status code: "+ response.status );
      
                  //add the returning data from the webservice to the variable posts
                  //this.Userslist = response.data;
                  this.User = [];
                  this.User.push(response.data);
                  this.status = response.status;
                    
                  console.log("length of the Userslists array " + this.User.length)
                  })
                  .catch(error => {
                    this.User = []
                    this.error = error.message
                    console.log("Error:" + this.error);
                  })
              },

                PostUser(){
                  this.error = null;
                  axios.post(baseUri,{"Licenseplate":this.Licenseplate, "Navn":this.Name,"Efternavn":this.Surname, "Mail":this.Mail, "Brugernavn":this.Username, "Password":this.Password})
                  .then(response => {
                  
                  console.log("URI: ")
      
                  console.log("in post Users");
                  console.log("status code: "+ response.status );
      
                  //add the returning data from the webservice to the variable posts
                  //this.Userslists = response.data;
                  this.status = response.status;
                    
                  console.log("length of Users array " + this.User.length)
                  })
                  .catch(error => {
                    this.User = []
                    this.error = error.message
                    console.log("Error:" + this.error);
                  })    
              },

              deleteUserById(id){
                this.error = null;
                uri = baseUri +"/"+id
                //axios call that returns the items from a specified user 
                axios.delete(uri)
                .then(response => {
                
                console.log("Uri: " + uri)
    
                 console.log("in function getUserById");
                 console.log("status code: "+ response.status );
    
                 //add the returning data from the webservice to the variable posts
                 this.User = response.data;
                 this.status = response.status;
                  
                 console.log("length of the userlists array " + this.User.length)
                })

                .catch(error => {
                  this.User = []
                  this.error = error.message
                  console.log("Error:" + this.error);
                })      
            },

              /*addUser() { /// Adds a "parked" car, when a car enters the parking Garage.
                if (this.carsParked < this.totalSpaces) { //Checks available spaces and deducts a parking space from the total.
                  this.carsParked++; //confirms car is parked
                  }
                },

                removeCar() { /// Removes a "parked" car, when a car exits the parking Garage.
                  if (this.carsParked > 0) { //Checks available spaces and adds a parking space from the total.
                    this.carsParked--; //confirms car has exited
                  }
                },

              },*/
        },

        computed: //always counts the total of available parking spaces
        {
            availableSpaces() {
              return this.totalSpaces - this.carsParked;
            },
        },
      }

    }).mount("#app")