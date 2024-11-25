const app = Vue.createApp
(
    {
        data() 
        {
            return { //our DOM with available parking spaces in our garage.
                totalSpaces: 50, // Total capacity of the garage (static)
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
                  if (this.carsParked > 0) {
                    this.carsParked--;
                  }
                },

              },
        },

        computed: //always counts the the total of available parking spaces
        {
            availableSpaces() {
              return this.totalSpaces - this.carsParked;
            },
        },
    }
)