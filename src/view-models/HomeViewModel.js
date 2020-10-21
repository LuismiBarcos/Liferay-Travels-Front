import UsersService from "../services/UsersService";
import TripService from "../services/TripService";

export default class HomeViewModel {
  constructor() {
    this.usersService = new UsersService();
    this.tripService = new TripService();
  }

  /**
   * Set the users of the Liferay instance
   * @param {Function} setUsers Callbat to set the users
   */
  async getUsers(setUsers) {
    this.usersService.getUsers().then((siteUserAccounts) => {
      setUsers(siteUserAccounts.items);
    });
  }

  /**
   * Set the trips of the Liferay Travels app
   * @param {Function} setTrips Callback to set the trips
   * @param {Function} setTrips Callback to set the actions
   */
  async getTrips(setTrips, setActions) {
    this.tripService.getTrips().then((trips) => {
      setTrips(trips.items);
      setActions(trips.actions)
    });
  }

  /**
   * Create a trip with the data provided by the user
   * @param {String} name Name of the trip
   * @param {String} description Description of the trp
   * @param {Date} startingDate Date when the trip begin
   * @param {File} image Image file
   */
  async createTrip(name, description, startingDate, image) {
    return this.tripService
      .createTrip(
        name,
        description,
        !!startingDate ? new Date(startingDate) : new Date(),
        !!image ? await toBase64(image) : ""
      )
      .then(() => {
        this.tripService.clearCache().then(() => {
          window.location.replace(`/`);
        });
      });
  }

  /**
   * Delete a trip given its id.
   * @param {Long} tripId Id of the trip to delete
   */
  async deleteTrip(tripId) {
    return this.tripService.deleteTrip(tripId).then(() => {
      this.tripService.clearCache().then(() => {
        window.location.replace(`/`);
      });
    });
  }

  async filterTrips(setTrips, setActions, filter) {
    return this.tripService.filterTrips(filter).then((trips) => {
      setTrips(trips.items)
      setActions(trips.actions)
    })
  }
}

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
