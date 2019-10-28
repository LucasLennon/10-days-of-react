import React, { 
    // Fragment, 
    useState, 
    // useEffect 
} from 'react';

// import {
//   Link
// } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

import { 
  Drawer,
  Link,
  List,
  ListItem,
  // ListItemIcon,
  ListItemText
} from "@material-ui/core"

const DrawerPaperStyle = makeStyles(theme =>
  ({
    root: {
      backgroundColor: theme.palette.secondary.main,
    }
  })
);


function BaseSidebar(props) {
  const drawerPaperClasses = DrawerPaperStyle();
  const [items] = useState([
    {
      name: "News",
      path: "/"
    },
    {
      name: "Login",
      path: "/login"
    },
    // {
    //   name: "Register",
    //   path: "/register"
    // }
  ])
  return (
    <Drawer 
      PaperProps={{ classes: drawerPaperClasses }}  
      open={props.open} 
      onClose={props.onClose}>
      <List>
        {
          items.map((item) => {
            return (
              <ListItem button key={item.name}>
                <Link href={item.path}>
                  <ListItemText primary={item.name} />
                </Link>
              </ListItem>
            )
          })
        }
      </List>
    </Drawer>
  )
}

export default BaseSidebar;
