import React, { useState } from "react";
import { Box, Typography, Menu, Tooltip, MenuItem, Badge } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "3px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const settings = [
  {
    menu: "Mis favoritos",
    to: "/favorites",
  },
  {
    menu: "Mis Pedidos",
    to: "/orders",
  },
  {
    menu: "Salir",
    to: "/logout",
  },
];
const settingsOffLine = [
  {
    menu: "Ingresar",
    to: "/login",
  },
  {
    menu: "Registrarme",
    to: "/register",
  },
];

const NavBarProfile = () => {
  const { user } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Mi cuenta">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            invisible={!user && true}
          >
            <AccountCircle sx={{ width: 40, height: 40, color: "white" }} />
          </StyledBadge>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {user
          ? settings.map((settingOn) => (
              <Link to={settingOn.to} key={settingOn.menu}>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{settingOn.menu}</Typography>
                </MenuItem>
              </Link>
            ))
          : settingsOffLine.map((settingOff) => (
              <Link to={settingOff.to} key={settingOff.menu}>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{settingOff.menu}</Typography>
                </MenuItem>
              </Link>
            ))}
      </Menu>
    </Box>
  );
};
export default NavBarProfile;
