import React from 'react';
// import './BrowserPrint-Zebra-1.0.216.min'
// import './BrowserPrint-3.0.216.min.js'
import Print from './Print';

class App extends React.Component{
  // componentDidMount() {
  //   const script = document.createElement("script");
  //   script.src = "./BrowserPrint-3.0.216.min.js"
  //   script.async = true;
  //   script.onload = () => this.scriptLoaded();
  //   document.body.appendChild(script);
  // }
  // scriptLoaded=()=>{
  //   console.log("********************")
  // }
  render() {
    return (
      <Print />
    );
  }
}

export default App;
