import StageService from "../services/StageService";

export default class StagesViewModel {
  constructor() {
    this.stageService = new StageService();
  }

  /**
   * Get blogs entries of the default site
   * @param {Function} setStages Callback to set the blogs
   * @param {Long} tripId Id of the trip
   */
  async getTripStages(setStages, tripId) {
    this.stageService.getTripStages(tripId).then((tripStages) => {
      setStages(tripStages.items);
    });
  }

  /**
   * Create a stage in a trip
   * @param {Long} tripId Id of the trip
   * @param {String} name Name of the stage
   * @param {String} description Description of the stage
   * @param {String} place Name of the stage
   * @param {String} image Base64 of an descriptive image
   */
  async createTripStage(tripId, name, description, place, image) {
    return this.stageService
      .createTripStage(
        +tripId,
        name,
        description,
        place,
        !!image ? await toBase64(image) : ""
      )
      .then(() => {
        this.stageService.clearCache().then(() => {
          window.location.replace(`/${tripId}/stages`);
        });
      });
  }

  /**
   * Delete a stage of a trip
   * @param {Long} stageId
   * @param {Long} tripId
   */
  async deleteTripStage(stageId, tripId) {
    return this.stageService.deleteTripStage(stageId).then(() => {
      this.stageService.clearCache().then(() => {
        window.location.replace(`/${tripId}/stages`);
      })
    });
  }
}

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
