import React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { pink } from "@mui/material/colors";

const Contact = () => {
  const handleClic = (source) => {
    if (source === "linkedin") {
      window.open("https://www.linkedin.com/in/mmatsanchez", "_blank");
    }
    window.open("https://github.com/matsanchez", "_blank");
  };

  return (
    <Box sx={{ maxWidth: 450 }} className="mt-3 bg-dark rounded-4 p-3 shadow text-center container">
      <Box sx={{ maxWidth: 450 }} className="d-flex flex-column align-items-center bg-light rounded-4 p-3 m-2">
        <ContactSupportIcon sx={{ width: 100, height: 100, color: pink[600] }} />
        <Typography variant="h5">Contacto</Typography>
        <Typography variant="h7">WhatsApp: +54 11-5805-2877</Typography>
        <Typography variant="h7">Email: smatu22@gmail.com</Typography>
      </Box>
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
  );
};

export default Contact;
