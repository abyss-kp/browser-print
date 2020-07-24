import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const styles = (theme) => ({
  root: {
    display: 'flex',
    height: '80vh',
    flexDirection: 'column',
    alignItems: 'center',
  },
  second: {
    textAlign: 'center',
  },
  boBP: {
    marginLeft: '5%',
    width: '190px'
  }
});
class JsPrint extends Component {
  handlePrint = () => {
    let networkCallData = `
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
    var doc = document.getElementById('printf').contentWindow.document;
    doc.open();
    doc.write(networkCallData);
    doc.close()
    window.frames["printf"].focus()
    window.frames["printf"].print()
  }
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root} >
        <iframe id="printf" name="printf" style={{ display: 'none' }} ></iframe>
        <div className={classes.second}>
          <p>Below method does not use any library/application.<br /> It's pure JS but not the best way<br />Manually select the ZPL printer in next screen</p>
          <Button variant="contained" color="secondary" className={classes.boBP} onClick={this.handlePrint}>No BrowserPrint</Button>
        </div>
      </div >
    )
  }
}

export default withStyles(styles)(JsPrint)