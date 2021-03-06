import React from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import BrowserPrintComponent from './BrowserPrint/printerComponent'
import JsPrint from './OnlyJS/JsPrint'
import Qz from './QZ/Qz'
const useStyles = makeStyles((theme) => ({
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
    textAlign: 'center',
    "& h1": {
      color: 'green !important',
    }
  },
  tabs: {
    display: 'flex',
    justifyContent: 'space-around',
    border: '1px dashed grey',
    borderRadius: '8px',
    backgroundColor: 'black',
   
    '& a': {
      textDecoration: 'none',
      fontWeight: 'bolder',
      color: 'white',
      cursor: 'pointer',
      fontSize: 'larger'
    },
    // '& a:active,a:focus': {
    //   color: 'black',
    //   backgroundColor: '#f2f2f2',
    //   width: '15%'
    // }
  },
  active:{
    color: 'black !important',
    backgroundColor: '#f2f2f2',
    width: '15%'
  }
}));
export default function Tabs(props) {
  const parentPath = props.match.path;
  const classes = useStyles();
  const tabsData = [
    {
      label: "Browser Print",
      path: parentPath,
      component: <BrowserPrintComponent />,
      defaultTab: true
    },
    {
      label: "QZ",
      path: parentPath + "Qz",
      component: <Qz />,
    },
    {
      label: "Pure JS",
      path: parentPath + "JS",
      component: <JsPrint />,
    }
  ]
  return (
    <div className={classes.container}>
      <h1>POC App</h1>
      <div className={classes.tabs}>
        {tabsData.map((data, i) => {
          return (
            <NavLink
              key={i}
              to={data.path}
              activeClassName={classes.active}
              isActive={(match, location) =>
                data.defaultTab
                  ? [parentPath, data.path].includes(location.pathname)
                  : [data.path].includes(location.pathname)
              }
            >
              {data.label}
            </NavLink>
          );
        })}

      </div>

      <Switch>
        {tabsData.map((data, i) => {
          return (
            <Route
              key={i}
              component={() => data.component}
              exact
              path={
                data.defaultTab
                  ? [parentPath, data.path]
                  : [data.path]
              }
            />
          );
        })}
      </Switch>
    </div>
  )
}