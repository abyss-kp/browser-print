//Gets the application configuration
const _getAppConfig = () => {
  window.BrowserPrint.getApplicationConfiguration((success) => {
    console.log(success)
  }, (err) => {
    console.log(err)
  })
}

//Discover all of the devices that are available to the host system
const _getDeviceList = () => {
  window.BrowserPrint.getLocalDevices(function (deviceList) {
    console.log("Devices present in your network are: ", deviceList)
    return deviceList
  }, (err) => {
    console.log(err)
  })
}

//Gets the user specified default device by type; to avoid having to run a full discovery on every page load
const _defaultDevices = () => {
  window.BrowserPrint.getDefaultDevice("printer",
    function (device) { console.log(device) },
    function (error) { console.log(error) });
}
const _getConfig = (zebraPrinter) => {
  zebraPrinter.getConfiguration(function (response) {
    console.log("Configs are: ", response)
  }, function (error) {
    console.error("***Error**** ", error)
  })
}
const _getStatus = (zebraPrinter) => {
  zebraPrinter.getConfiguration(function (status) {
    console.log(status.getMessage())
  }, function (error) {
    console.error("***Error**** ", error)
  })
}
const _print = (device, data = "~wc") => {
  device.send(data,
    function (success) { console.log("Sent to printer"); },
    function (error) { console.error("Error:" + error); });
  /*  var zebraPrinter = new Zebra.Printer(device);
   zebraPrinter.isPrinterReady().then(function () {
     return zebraPrinter.write("~wc");
   }).catch(function (error) {
     console.error(error);
   }) */

}
export const Print_Service = {
  getAppConfig: _getAppConfig,
  getDevices: _getDeviceList,
  defaultDevices: _defaultDevices,
  getConfig: _getConfig,
  getStatus: _getStatus,
  print: _print,

}