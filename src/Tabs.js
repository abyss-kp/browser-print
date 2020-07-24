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
    textAlign: 'center'
  },
  tabs: {
    display: 'flex',
    justifyContent: 'space-around',
    border: '1px dashed grey',
    borderRadius: '8px',
    backgroundColor: '#f2f2f2',
    '& a': {
      textDecoration: 'none',
      fontWeight: 'bolder',
      color: 'green'
    }
  }
}));
export default function Tabs(props) {
  const parentPath = props.match.path;
  const classes = useStyles();
  const tabsData = [
    {
      label: "Browser Print",
      path: parentPath,
      content: <BrowserPrintComponent />,
      defaultTab: true
    },
    {
      label: "QZ",
      path: parentPath + "Qz",
      content: <Qz/>,
    },
    {
      label: "Pure JS",
      path: parentPath + "JS",
      content: <JsPrint />,
    }
  ]
  return (
    <div className={classes.container}>
      <h1>Printer App POC</h1>
      <div className={classes.tabs}>
        {tabsData.map((data, i) => {
          console.log(parentPath, data.path, props.location.pathname)
          return (
            <NavLink
              key={i}
              to={data.path}
              activeClassName="active"
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
              component={() => data.content}
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