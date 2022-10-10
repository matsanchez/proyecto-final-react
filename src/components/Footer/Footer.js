import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { pink } from "@mui/material/colors";
import React from "react";
import "./Footer.css";

const Footer = () => {
  const handleClic = (source) => {
    if (source === "linkedin") {
      window.open("https://www.linkedin.com/in/mmatsanchez", "_blank");
    }
    window.open("https://github.com/matsanchez", "_blank");
  };
  return (
    <Box className="container-footer bg-dark">
      <Box className="logo-footer">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/mscarpinteria-7b1a4.appspot.com/o/assets%2Flogo.png?alt=media&token=2ed73695-37b8-42e6-a9fc-a222bd6a3e69"
          alt="logo"
          className="h-9"
        />
        <Typography>Proyecto Ecommerce React JS - Matias Sanchez</Typography>
        <Box>
          <IconButton onClick={() => handleClic("linkedin")}>
            <Tooltip title="Visitar mi Perfil">
              <LinkedInIcon sx={{ width: 35, height: 35, color: pink[600], marginRight: 2 }} />
            </Tooltip>
          </IconButton>
          <IconButton onClick={handleClic}>
            <Tooltip title="Ver mis Repos">
              <GitHubIcon sx={{ width: 35, height: 35, color: pink[600], marginLeft: 2 }} />
            </Tooltip>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
