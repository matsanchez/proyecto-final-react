import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField, Box, Typography, InputAdornment, LinearProgress, IconButton } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { pink } from "@mui/material/colors";

const validationSchema = yup.object({
  email: yup.string("Ingrese su email").email("Ingrese un correo válido").required("Email requerido"),
  password: yup
    .string("Ingrese una contraseña")
    .min(8, "La contraseña debe contener 8 caracteres mínimo")
    .required("La contraseña es requerida"),
});

const PanelLogin = () => {
  const { setLogin } = useAuth();
  const [errorEmail, setErrorEmail] = useState();
  const [errorPass, setErrorPass] = useState();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const login = async (values, resetForm) => {
    setLoading(true);
    try {
      await setLogin(values.email, values.password);
      resetForm();
      navigate(state?.location?.pathname ?? "/allproducts");
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        setErrorEmail("Error, el correo ingresado ya se encuentra registrado");
      } else if (error.code === "auth/user-not-found") {
        setErrorEmail("No existe una cuenta con ese Email");
      } else if (error.code === "auth/wrong-password") {
        setErrorPass("Contraseña Incorrecta");
      }
    }
  };

  const handleResetError = () => {
    setErrorEmail("");
    setErrorPass("");
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => login(values, resetForm),
  });

  return (
    <Box sx={{ maxWidth: 350 }} className="mt-3 bg-dark rounded-4 p-3 shadow text-center container">
      <Box sx={{ maxWidth: 350 }} className="bg-light rounded-4 p-3 m-2">
        <LockIcon sx={{ width: 100, height: 100, color: pink[600] }} />
        <Typography variant="h6" className="mb-3">
          Ingresar a tu cuenta
        </Typography>
        <form onSubmit={formik.handleSubmit} onMouseDown={handleResetError}>
          <TextField
            fullWidth
            id="email"
            name="email"
            autoComplete="new-email"
            label="Ingrese su email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              endAdornment: <InputAdornment position="start" />,
            }}
          />
          {errorEmail && (
            <Typography variant="caption" className="text-danger">
              {errorEmail}
            </Typography>
          )}
          <TextField
            className="mt-2"
            fullWidth
            id="password"
            autoComplete="new-password"
            name="password"
            label="Ingrese la contraseña"
            type={showPass ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(!showPass)}>
                    {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errorPass && (
            <Typography variant="caption" className="text-danger">
              {errorPass}
            </Typography>
          )}
          <div className="text-right mt-1">
            <Link to="/resetpassword">
              <Typography variant="subtitle2">Olvide mi contraseña</Typography>
            </Link>
          </div>
          {loading ? (
            <LinearProgress
              color="secondary"
              sx={{
                bgcolor: pink[600],
              }}
              className="mt-2"
            />
          ) : (
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
              Ingresar
            </Button>
          )}
        </form>
      </Box>
      <Box className="bg-light rounded-4 p-3 m-2">
        <Link to="/register">
          <Typography>¿Eres nuevo? Registrate</Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default PanelLogin;
