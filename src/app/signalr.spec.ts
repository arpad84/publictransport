import {Signalr} from "./signalr";


describe('Signalr', () => {
  it('should create an instance', () => {
    expect(new Signalr('https://publictransportapi.azurewebsites.net/api/vehicleHub')).toBeTruthy();
  });
});
