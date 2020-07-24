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
    marginTop:'5%',
    marginBottom:'7%',
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
^CF0,60
^FO50,50^GB100,100,100^FS
^FO75,75^FR^GB100,100,100^FS
^FO93,93^GB40,40,40^FS
^FO220,50^FDDriscolls, Inc.^FS
^CF0,30
^FO220,115^FDWatsonville^FS
^FO220,155^FDCalifornia^FS
^FO220,195^FDUnited States (USA)^FS
^FO50,250^GB700,1,3^FS

^FX Second section with recipient address and permit information.
^CFA,30
^FO50,300^FDKapil Pandey^FS
^FO50,340^FD100 Main Street^FS
^FO50,380^FDSpringfield TN 39021^FS
^FO50,420^FDUnited States (USA)^FS
^CFA,15
^FO600,300^GB150,150,3^FS
^FO638,340^FDPermit^FS
^FO638,390^FD123456^FS
^FO50,500^GB700,1,3^FS

^FX Third section with barcode.
^BY5,2,270
^FO100,550^BC^FD12345678^FS

^FX Fourth section (the two boxes on the bottom).
^FO50,900^GB700,250,3^FS
^FO400,900^GB1,250,3^FS
^CF0,40
^FO100,960^FDCtr. X34B-1^FS
^FO100,1010^FDREF1 F00B47^FS
^FO100,1060^FDREF2 BL4H8^FS
^CF0,190
^FO470,955^FDCA^FS

^XZ
    `
    Print_Service.print(printer,networkCallResponse)
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
