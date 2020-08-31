import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Print_Service } from '../printService'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& button': {
      flexBasis: '20%',
      margin: '2%'
    }
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    marginTop: '5%',
    marginBottom: '7%',
    minWidth: 120,
  },
}));

export default function PrinterComponent() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [deviceList, setDevices] = React.useState([]);
  const [printer, setPrinter] = React.useState(null);
  const [zebraPrinter, setZebraPrinter] = React.useState(null);

  useEffect(() => {
    window.BrowserPrint.getLocalDevices(function (deviceList) {
      setDevices(deviceList.printer)
    }, (err) => {
      console.log(err)
    })
  }, [])
  const handleChange = (event) => {
    setPrinter(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleStatusCheck = () => {
    // printer.getConfiguration(function (status) {
    //   console.log(status.getMessage())
    // }, function (error) {
    //   console.error("***Error**** ", error)
    // })
  };
  const writeIframe = (str) => {
    var doc = document.getElementById('info').contentWindow.document;
    doc.open();
    doc.write(str);
    doc.close()
  }
  const handleList = () => {
    let str = ""
    deviceList.map(device => { str += `<li>${device.name}</li>` })
    writeIframe(str)
  }
  const checkConfig = () => {
  }
  const handlePrint = () => {
    let networkCallResponse = `
    ^XA

^FX Top section with logo, name and address.
^CF0,20
^FO10,10^GB25,25,25^FS
^FO20,20^FR^GB25,25,25^FS
^FO24,24^GB8,8,8^FS
^FO50,25^FDDriscolls, Inc.^FS
^CF0,18
^FO50,55^FDWatsonville^FS
^FO50,75^FDCalifornia^FS
^FO50,95^FDUnited States (USA)^FS
^FO10,120^GB700,1,3^FS

^FX Second section with recipient address and permit information.
^CF0,8
^FO20,140^FDKapil Pandey^FS
^FO20,160^FD100 Main Street^FS
^FO20,180^FDSpringfield TN 39021^FS
^FO20,200^FDUnited States (USA)^FS
^CFA,10
^FO125,145^GB60,60,2^FS
^FO135,160^FDPermit^FS
^FO135,180^FD123456^FS
^FO10,230^GB700,1,3^FS

^FX Third section with barcode.
^BY1,2,50
^FO38,250^BC^FD12345678^FS

^FX Fourth section (the two boxes on the bottom).
^FO20,330^GB160,70,2^FS
^FO130,330^GB1,70,2^FS
^CFA,10
^FO40,340^FDCtr. X34B-1^FS
^FO40,360^FDREF1 F00B47^FS
^FO40,380^FDREF2 BL4H8^FS
^CFF,10
^FO140,355^FDCA^FS

^XZ
    `
    Print_Service.print(printer, networkCallResponse)
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-dialog-select-label">Printers</InputLabel>
        <Select
          labelId="demo-dialog-select-label"
          id="demo-dialog-select"
          value={printer}
          onChange={handleChange}
          input={<Input />}
        >
          {deviceList.map((device, indx) => <MenuItem value={device} key={indx}>{device.name}</MenuItem>)}
        </Select>
      </FormControl>
      <div className={classes.root}>
        <Button onClick={handleList} color="primary" variant="outlined">List Devices</Button>
        <Button onClick={handleStatusCheck} color="primary" variant="outlined" disabled>Check Status</Button>
        <Button onClick={checkConfig} color="primary" variant="outlined" disabled>Show Configs</Button>
        <Button onClick={handlePrint} color="primary" variant="contained" disabled={!printer}>Browser Print</Button>
        <iframe width="100%" id="info"></iframe>
      </div>
    </>
  );
}
