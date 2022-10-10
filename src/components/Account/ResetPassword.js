import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField, Box, Typography, InputAdornment } from "@mui/material";
import MailLockIcon from "@mui/icons-material/MailLock";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useAuth } from "../../context/AuthContext";
import { pink } from "@mui/material/colors";

const validationSchema = yup.object({
  email: yup.string("Ingrese su email").email("Ingrese un correo válido").required("Email requerido"),
});

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const [errorEmail, setErrorEmail] = useState();
  const [boolean, setBoolean] = useState(false);
  const [email, setEmail] = useState();

  const reset = async (values, resetForm) => {
    try {
      await resetPassword(values.email);
      resetForm();
      setEmail(values.email);
      setBoolean(true);
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/email-already-in-use") {
        setErrorEmail("Error, el correo ingresado ya se encuentra registrado");
      } else if (error.code === "auth/user-not-found") {
        setErrorEmail("Error, no existe una cuenta con ese Email");
      }
    }
  };

  const handleResetError = () => {
    setErrorEmail("");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => reset(values, resetForm),
  });

  return (
    <Box sx={{ maxWidth: 450 }} className="mt-3 bg-dark rounded-4 p-3 shadow text-center container">
      <Box sx={{ maxWidth: 450 }} className="bg-light rounded-4 p-3 m-2">
        {boolean ? (
          <>
            <VerifiedIcon color="success" sx={{ width: 100, height: 100 }} />
            <Typography variant="subtitle1" className="mb-3">
              Pronto recibira un correo a su casilla <strong>{email}</strong> con un link para reestablecer la
              contraseña, revise en correo deseado
            </Typography>
          </>
        ) : (
          <>
            <MailLockIcon sx={{ width: 100, height: 100, color: pink[600] }} />
            <Typography variant="h6" className="mb-3">
              Ingrese su email con el cual se registro
            </Typography>
            <form onSubmit={formik.handleSubmit} onMouseDown={handleResetError}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Ingrese su email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  endAdornment: <InputAdornment position="start" />,
                }}
              />
              {errorEmail && <Typography className="text-danger">{errorEmail}</Typography>}
              <Button
                className="mt-2"
                sx={{
                  bgcolor: pink[600],
                  "&:hover": { bgcolor: pink[800] },
                }}
                variant="contained"
                fullWidth
                type="submit"
              >
                Recuperar Contraseña
              </Button>
            </form>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ResetPassword;
