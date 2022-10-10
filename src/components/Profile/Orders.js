import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import OrderList from "./OrderList";
import { getOrder } from "../../firebase/LogicApp";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Box, TextField, InputAdornment, Button, Typography, LinearProgress } from "@mui/material";
import { pink } from "@mui/material/colors";

const validationSchema = yup.object({
  codeOrder: yup.string("Ingrese el codigo de orden").required("Ingrese un codigo, es requerido"),
});

const Orders = () => {
  const [showOrder, setShowOrder] = useState({});
  const [msgError, setMsgError] = useState(false);
  const [boolean, setBoolean] = useState(false);
  const [loading, setLoading] = useState(false);

  const getOrderId = async (order) => {
    setLoading(true);
    try {
      const idOrderRef = await getOrder(order);
      if (idOrderRef === null) {
        setMsgError(true);
        setLoading(false);
      } else {
        setShowOrder(idOrderRef);
        setBoolean(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetError = () => {
    setMsgError("");
  };

  const formik = useFormik({
    initialValues: {
      codeOrder: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => getOrderId(values.codeOrder),
  });

  return (
    <>
      <Box sx={{ maxWidth: 800 }} className="mt-3 bg-dark rounded-4 p-3 shadow text-center container">
        {boolean ? (
          <OrderList order={showOrder} />
        ) : (
          <Box className="bg-light rounded-4 p-3 m-2 text-center">
            <LocalShippingIcon sx={{ width: 100, height: 100, color: pink[600] }} />
            <Typography variant="h6" className="mb-3">
              Seguimiento de envio{" "}
            </Typography>
            <form onSubmit={formik.handleSubmit} onMouseDown={handleResetError}>
              <TextField
                fullWidth
                id="codeOrder"
                name="codeOrder"
                label="Ingrese o pegue el codigo de su pedido"
                value={formik.values.codeOrder}
                onChange={formik.handleChange}
                error={formik.touched.codeOrder && Boolean(formik.errors.codeOrder)}
                helperText={formik.touched.codeOrder && formik.errors.codeOrder}
                InputProps={{
                  endAdornment: <InputAdornment position="start" />,
                }}
              />
              {msgError && (
                <Typography variant="caption" className="text-danger">
                  No existe el codigo que estas buscando
                </Typography>
              )}
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
                  Buscar
                </Button>
              )}
            </form>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Orders;
