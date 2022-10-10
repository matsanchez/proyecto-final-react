import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField, Box, InputAdornment, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { useAuth } from "../../context/AuthContext";
import { pink } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup.string("Ingrese su email").email("Ingrese un correo válido").required("Email requerido"),
  password: yup
    .string("Ingrese una contraseña")
    .min(8, "Debe contener 8 caracteres mínimo")
    .required("La contraseña es requerida"),
  passwordRepet: yup
    .string("Ingrese una contraseña")
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Reingreso de contraseña es requerido"),
});

const PanelRegister = () => {
  const { setRegister, user, setLogOut } = useAuth();
  const [error, setError] = useState();
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    user === true && navigate("/");
  }, [user, navigate]);

  const register = async (values, resetForm) => {
    setError("");
    try {
      await setRegister(values.email, values.password);
      resetForm();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("El correo ingresado ya se encuentra registrado");
      }
    }
    navigate("/allproducts");
  };

  const handleResetError = () => {
    setError("");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordRepet: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, resetForm) => register(values, resetForm),
  });

  if (user) {
    return (
      <Box sx={{ maxWidth: 450 }} className="mt-3 bg-dark rounded-4 p-3 shadow text-center container">
        <Box sx={{ maxWidth: 450 }} className="d-flex flex-column align-items-center bg-light rounded-4 p-3 m-2">
          <FeedbackIcon sx={{ width: 100, height: 100, color: pink[600] }} />
          <Typography variant="h5">Ya iniciaste sesion</Typography>
          <Typography variant="body1">¿Deseas cerrar sesion?</Typography>
          <Box className="d-flex">
            <Link to="/">
              <Button
                className="m-2"
                sx={{
                  bgcolor: pink[600],
                  "&:hover": { bgcolor: pink[800] },
                }}
                variant="contained"
                onClick={setLogOut}
              >
                Cerrar Sesion
              </Button>
            </Link>
            <Link to="/">
              <Button
                className="m-2"
                sx={{
                  bgcolor: pink[800],
                  "&:hover": { bgcolor: pink[600] },
                }}
                variant="contained"
              >
                volver al home{" "}
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box sx={{ maxWidth: 350 }} className="mt-3 bg-dark rounded-4 p-3 shadow text-center container">
        <Box sx={{ maxWidth: 350 }} className="bg-light rounded-4 p-3 m-2">
          <AccountCircleIcon sx={{ width: 100, height: 100, color: pink[600] }} />
          <Typography variant="h6" className="mb-3">
            Complete los datos
          </Typography>
          <form onSubmit={formik.handleSubmit} onMouseDown={handleResetError}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                endAdornment: <InputAdornment position="start" />,
              }}
            />
            {error && (
              <Typography variant="caption" className="text-danger">
                {error}
              </Typography>
            )}
            <TextField
              className="mt-2"
              fullWidth
              id="password"
              name="password"
              label="Contraseña"
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
            <TextField
              className="mt-2"
              fullWidth
              id="passwordRepet"
              name="passwordRepet"
              label="Repetir Contraseña"
              type={showPass ? "text" : "password"}
              value={formik.values.passwordRepet}
              onChange={formik.handleChange}
              error={formik.touched.passwordRepet && Boolean(formik.errors.passwordRepet)}
              helperText={formik.touched.passwordRepet && formik.errors.passwordRepet}
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
              Registrarme
            </Button>
          </form>
        </Box>
        <Box sx={{ maxWidth: 350 }} className="bg-light rounded-4 p-3 m-2">
          <Link to="/login">
            <Typography>¿Tienes cuenta? Login</Typography>
          </Link>
        </Box>
      </Box>
    );
  }
};

export default PanelRegister;
