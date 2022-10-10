import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  Divider,
  Avatar,
} from "@mui/material/";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const NavBarMobile = ({ menuLinks }) => {
  const [state, setState] = useState("left");
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setState({ ...state, left: open });
    setOpen(!open);
  };

  const MenuLinks = (anchor) => (
    <Box sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }} role="presentation">
      <Divider className="mt-2">
        <Avatar
          src="https://firebasestorage.googleapis.com/v0/b/mscarpinteria-7b1a4.appspot.com/o/assets%2Flogo.png?alt=media&token=2ed73695-37b8-42e6-a9fc-a222bd6a3e69"
          sx={{ width: 56, height: 56, display: { xs: "flex", md: "flex" } }}
        />
      </Divider>
      <List>
        {menuLinks.map((menu, idx) => (
          <ListItem key={idx} disablePadding>
            {menu.sublinks === true ? (
              <Box sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }} role="presentation">
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <NavigateNextIcon />
                  </ListItemIcon>
                  <ListItemText primary={menu.link} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menu.subMenu.map((sub, idx) => (
                      <ListItemButton
                        key={idx}
                        sx={{ pl: 4 }}
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                      >
                        <ListItemIcon>
                          <NavigateNextIcon />
                        </ListItemIcon>
                        <Link to={sub.to}>
                          <ListItemText primary={sub.link} />
                        </Link>
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ) : (
              <ListItemButton onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                <ListItemIcon>
                  <NavigateNextIcon />
                </ListItemIcon>
                <Link to={menu.to}>
                  <ListItemText primary={menu.link} />
                </Link>
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <React.Fragment key="left">
        <IconButton
          onClick={toggleDrawer(true)}
          size="small"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={state["left"]} onClose={toggleDrawer(false)}>
          {MenuLinks("left")}
        </Drawer>
      </React.Fragment>
    </>
  );
};

export default NavBarMobile;
