const baseUri = "http://localhost:5180/"

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
            getUserByLicenseplate: "",
            deleteUserByLicenseplate:1,
            Name:"Niklas",
            Lastname:"Pedersen",
            Licenseplate:"BY12345",
            Phone: 12345678,
            Email: "niklas.loev@gmail.com",

                            //our DOM with available parking spaces in our garage.
            totalParkingSpaces: 50, // Total capacity of the garage (static)
            carsParked: 0,   // Current number of parked cars (changes with parked cars)
          };

        },

        methods:  //This methods reacts when a sensor / button is triggered. when enters/exits the garage.
        {
            methods: { 
                addCar() { /// Adds a "parked" car, when a car enters the parking Garage.
                  if (this.carsParked < this.totalSpaces) { //Checks available spaces and deducts a parking space from the total.
                    this.carsParked++; //confirms car is parked
                  }
                },

                removeCar() { /// Removes a "parked" car, when a car exits the parking Garage.
                  if (this.carsParked > 0) { //Checks available spaces and adds a parking space from the total.
                    this.carsParked--; //confirms car has exited
                  }
                },

              },
        },

        computed: //always counts the total of available parking spaces
        {
            availableSpaces() {
              return this.totalSpaces - this.carsParked;
            },
        },
    }).mount("#app")