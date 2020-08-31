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

^FX Top section with square logo
^CF0,20
^FO10,10^GB35,35,35^FS
^FO18,18^FR^GB35,35,35^FS
^FO23,23^GB16,16,16^FS

^FX Top section with square name and address
^FO70,13^FDDriscolls, Inc.^FS
^CFA,19
^FO70,35^FDWatsonville^FS
^FO70,55^FDCalifornia^FS
^FO70,75^FDUnited States (USA)^FS
^FO10,100^GB700,1,1^FS

^FX Second section with barcode.
^BY2,2,35
^FO60,110^BC^FD12345678^FS

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
