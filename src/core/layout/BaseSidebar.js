import React, { 
    // Fragment, 
    useState, 
    // useEffect 
} from 'react';

import {
  Link
} from "react-router-dom";

import { 
  Drawer,
  List,
  ListItem,
  // ListItemIcon,
  ListItemText
} from "@material-ui/core"


function BaseSidebar(props) {
  const [items] = useState([
    {
      name: "Login",
      path: "/"
    },
    {
      name: "Register",
      path: "/register"
    }
  ])
  return (
    <Drawer open={props.open} onClose={props.onClose}>
      <List>
        {
          items.map((item) => {
            return (
              <ListItem button key={item.name}>
                <Link to={item.path}>
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
