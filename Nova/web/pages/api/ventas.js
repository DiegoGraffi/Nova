import dataVentas from "../../data/dataVentas";

export default function handler(req, res) {
  const { fechaInicio, fechaFin } = req.query;

  if (fechaInicio && fechaFin) {
    const fechaInicioObj = new Date(fechaInicio);
    const fechaFinObj = new Date(fechaFin);

    const ventasFiltradas = dataVentas.filter((venta) => {
      const fechaVenta = new Date(venta.FechaHoraVenta);
      return fechaVenta >= fechaInicioObj && fechaVenta <= fechaFinObj;
    });

    return res.status(200).json(ventasFiltradas);
  }

  res.status(200).json(dataVentas);
}
