import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import AccountIcon from '@material-ui/icons/AccountCircle';
import AccountBox from '@material-ui/icons/AccountBox';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import GroupAdd from '@material-ui/icons/GroupAdd';
import PlugIcon from '@material-ui/icons/SettingsInputComponent';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CircleIcon from '@material-ui/icons/FiberManualRecord';
import { Link } from 'react-router-dom';
import './SideNav.css';

const Nav = () => {
  const [solutionsOpen, setSolutionsOpen] = useState(true);
  const admin = sessionStorage.getItem('adm');
  console.log(admin);

  const handleSolutionsClick = () => {
    setSolutionsOpen(!solutionsOpen);
  };

  return (
    <div className="sideNav-wrapper">
      <div className="root">
        <List component="nav">
          {admin === 'true' && (
            <Link to="/account" className="link">
              <ListItem button>
                <ListItemIcon>
                  <AccountIcon />
                </ListItemIcon>
                <ListItemText inset primary="Account" />
              </ListItem>
            </Link>
          )}
          <Link to="/authentications" className="link">
            <ListItem button>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText inset primary="Authentications" />
            </ListItem>
          </Link>
          {admin === 'true' && (
            <Link to="/admin/users" className="link">
              <ListItem button>
                <ListItemIcon>
                  <PeopleOutline />
                </ListItemIcon>
                <ListItemText inset primary="All users" />
              </ListItem>
            </Link>
          )}
          {admin === 'true' && (
            <Link to="/admin/register" className="link">
              <ListItem button>
                <ListItemIcon>
                  <GroupAdd />
                </ListItemIcon>
                <ListItemText inset primary="Register New Users" />
              </ListItem>
            </Link>
          )}

          <ListItem button onClick={handleSolutionsClick}>
            <ListItemIcon>
              <PlugIcon />
            </ListItemIcon>
            <ListItemText inset primary="Solutions" />
            {solutionsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={solutionsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link className="link" to="/solutions/mine">
                <ListItem button className="nested">
                  <ListItemIcon>
                    <CircleIcon style={{ borderRadius: 20 }} />
                  </ListItemIcon>
                  <ListItemText inset primary="My Instances" style={{ whiteSpace: 'nowrap' }} />
                </ListItem>
              </Link>

              <Link className="link" to="/solutions/discover">
                <ListItem button className="nested">
                  <ListItemIcon>
                    <CircleIcon style={{ borderRadius: 20 }} />
                  </ListItemIcon>
                  <ListItemText inset primary="Discover" />
                </ListItem>
              </Link>
            </List>
          </Collapse>
        </List>
      </div>
    </div>
  );
};

export default Nav;
