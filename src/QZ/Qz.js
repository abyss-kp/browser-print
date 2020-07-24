import React, { Component } from 'react'
import qz from 'qz-tray'
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Print_Service } from '../printService'
import { withStyles } from '@material-ui/core';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    '& button': {
      flexBasis: '20%',
      margin: '2%'
    }
  },
  formControl: {
    margin: '5%',
    minWidth: 155,
  },
});
const findPrinters = () => {
  qz.printers.find().then(function (data) {
    var list = '<ul>';
    for (var i = 0; i < data.length; i++) {
      list += `<li>&nbsp; ${data[i]} </li><br/>`
    }
    list += "</ul>"
    var doc = document.getElementById('QzPrinter').contentWindow.document;
    doc.open();
    doc.write(list);
    doc.close()
    console.log("<strong>Available printers:</strong><br/>" + list);
  }).catch(function (e) { console.error(e); });
}
class Qz extends Component {
  state = {
    printers: [],
    selectedPrinter: null,
    config: {},
    type: null
  }
  componentDidMount() {
    const that = this
    //reties 1 time in  15 seconds if permission is denied
    if (!qz.websocket.isActive())
      qz.websocket.connect({ retries: 1, delay: 15 }).then(() => {
        console.log("connected !!!!!")
        qz.printers.find().then(function (found) {
          console.log(found);
          that.setState({ printers: found })
        });
      });
  }
  // componentWillUnmount() {
  //   return qz.websocket.disconnect();
  // }
  handleSelect = (e) => {
    var config = qz.configs.create(e.target.value);
    this.setState({ selectedPrinter: e.target.value, config })
  }
  handleTypeChange = (e) => {
    this.setState({ type: e.target.value })
  }
  handlePrint = () => {
    let data = []
    switch (this.state.type) {
      case 'PDF': data = [{
        type: 'pixel',
        format: 'html',
        flavor: 'plain',
        data: '<h1>Hello JavaScript!</h1>'
      }]
        break;
      case 'RAW':
        data = ['^XA^FO50,50^ADN,36,20^FDRAW ZPL EXAMPLE^FS^XZ'];   // Raw ZPL
        break;
    }
    return qz.print(this.state.config, data);
  }
  render() {
    const { classes } = this.props
    return (
      <>
        <FormControl className={classes.formControl} component="fieldset">
          {/* <div> */}
          <InputLabel id="demo-dialog-select-label">Select Printer</InputLabel>
          <Select
            labelId="demo-dialog-select-label"
            id="demo-dialog-select"
            // value={printer}
            onChange={this.handleSelect}
            input={<Input />}
          >
            {this.state.printers.map((device, indx) => <MenuItem value={device} key={indx}>{device}</MenuItem>)}
          </Select>
          {/* </div> */}
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          {/* <div> */}
          <FormLabel component="legend">Select printing type</FormLabel>
          <RadioGroup aria-label="gender" row name="gender1" value={this.state.type} onChange={this.handleTypeChange}>
            <FormControlLabel value="PDF" control={<Radio />} label="PDF" />
            <FormControlLabel value="RAW" control={<Radio />} label="RAW (ZPL)" />
          </RadioGroup>
          {/* </div> */}
        </FormControl>
        <div className={classes.root}>
          <Button color="primary" variant="outlined" onClick={findPrinters}>List Devices</Button>
          {/* <Button color="primary" variant="outlined" disabled>Check Status</Button>
          <Button color="primary" variant="outlined" disabled>Show Configs</Button> */}
          <Button color="primary" variant="contained" onClick={this.handlePrint} disabled={!this.state.selectedPrinter || !this.state.type}>Qz Print</Button>
          <iframe width="100%" id="QzPrinter"></iframe>
        </div>
      </>
    )
  }
}

export default withStyles(styles)(Qz)