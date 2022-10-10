import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const About = () => {
  return (
    <Box sx={{ maxWidth: 500 }} className="mt-3 bg-dark rounded-4 p-3 shadow text-center container">
      <Typography variant="h5" className="text-center uppercase text-white mb-2">
        Sobre Nosotros{" "}
      </Typography>
      <Box sx={{ maxWidth: 500 }} className="bg-light rounded-4 p-3 m-2">
        <Card sx={{ maxWidth: 500 }}>
          <CardMedia
            component="img"
            alt="About"
            height="300"
            image="https://firebasestorage.googleapis.com/v0/b/mscarpinteria-7b1a4.appspot.com/o/assets%2Fcard_imagen.jpg?alt=media&token=8e624ce4-4dcf-4048-a06e-21179e7737bb"
          />
        </Card>
        <Box>
          <CardContent className="p-1 mb-1">
            <Typography align="justify" variant="body1">
              Somos una pyme en pleno resurgimiento, contamos con un equipo de profesionales en el area lo que hace que
              nuestros productos sean de primera calidad.
            </Typography>
            <Typography align="justify" variant="body1">
              Los mismos destacan por su originalidad en el diseño y por sobre todo la estetica del acabado final.
            </Typography>
          </CardContent>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
