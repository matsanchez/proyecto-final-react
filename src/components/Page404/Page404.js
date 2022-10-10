import React from "react";
import ReportIcon from "@mui/icons-material/Report";
import { Button, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { red } from "@mui/material/colors";

const page404 = () => {
  return (
    <Container className="mt-3 bg-dark rounded-4 p-5 shadow text-center">
      <ReportIcon sx={{ color: red[500], fontSize: 200 }} />
      <Typography variant="h5" className="text-light mt-3">
        ERROR 404
      </Typography>
      <Typography variant="h5" className="text-light mt-3">
        La página que buscas no existe
      </Typography>
      <Link to="/">
        <Button variant="outlined" color="error" className="mt-5">
          Volver al Home
        </Button>
      </Link>
    </Container>
  );
};

export default page404;
