import {
  Input,
  Card,
  Container,
  Text,
  Spacer,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";

const BuscarOrden = () => {
  const [nro_orden, setNro_Orden] = useState(null);
  const [orden, setOrden] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [dni, setDni] = useState(null);

  const buscarCliente = () => {
    axios
      .get(`http://localhost:3001/buscarcliente/${dni}`)
      .then((response) => {
        setCliente(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const buscarOrden = () => {
    axios
      .get(`http://localhost:3001/buscarorden/${nro_orden}`)
      .then((response) => {
        setOrden(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onBuscar = (e) => {
    e.preventDefault();

    buscarCliente();
    buscarOrden();
    setNro_Orden(e.target.reset());
    setDni(e.target.reset());
  };

  console.log(orden);
  console.log(cliente);

  return (
    <Container
      aria-label="netdes"
      css={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <form onSubmit={onBuscar}>
        <Card
          css={{
            width: "700px",
            background: "#F8F9FB",
            padding: "40px",
            borderRadius: "20px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: "150px",
          }}
          aria-label="netdes"
        >
          <Text
            h1
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
              fontSize: "40px",
            }}
          >
            Buscar tu orden
          </Text>
          <Spacer y={2} />
          <Input
            clearable
            bordered
            labelPlaceholder="Número de orden"
            fullWidth
            name="nro_orden"
            onChange={(e) => setNro_Orden(e.target.value)}
          />
          <Spacer y={2} />
          <Input
            clearable
            bordered
            labelPlaceholder="DNI"
            fullWidth
            name="dni"
            onChange={(e) => setDni(e.target.value)}
          />
          <Spacer y={2} />
          <Button type="submit">Buscar</Button>
        </Card>
      </form>

      {cliente && orden ? (
        <>
          <Card
            css={{
              width: "1000px",
              background: "#F8F9FB",
              padding: "40px",
              borderRadius: "20px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              top: "200px",
            }}
            aria-label="netdes"
          >
            <Text
              h1
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
                fontSize: "40px",
              }}
            >
              Datos de tu orden
            </Text>
            <Spacer y={2} />
            <p>Nombre: {cliente.name}</p>
            <p>DNI: {cliente.dni}</p>
            <p>Orden: {orden.nro_orden}</p>
            <p>Serie: {orden.nro_serie}</p>
            <p>Ingreso: {orden.fecha_entrada.slice(0, 10)}</p>
            <p>Tecnico: {orden.tecnico}</p>
            <p>Estado: {orden.estado}</p>
            <p>Saldo a abonar: ${orden.precio}</p>
          </Card>

        </>
      ) : null}
    </Container>
  );
};

export default BuscarOrden;
