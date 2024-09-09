import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from "axios";

// Dark theme setup with a dark background
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212", // Ensures dark background for the entire app
      paper: "#1d1d1d",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

// Define custom truck marker icon
const truckIcon = new L.Icon({
  iconUrl: 'https://freepngimg.com/thumb/cargo_truck/3-2-cargo-truck-free-png-image.png',
  iconSize: [81, 51],
  iconAnchor: [12, 41],
});

const FleetManagerMarketplace = () => {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [route, setRoute] = useState([]);
  const [orders, setOrders] = useState([
    {
      id: 1,
      origin: "Delhi",
      destination: "Jaipur",
      weight: "5 tonnes",
      price: "Rs.78000",
      status: "Available",
      coordinates: [[28.7041, 77.1025], [26.9124, 75.7873]], // Delhi to Jaipur coordinates
    },
    {
      id: 2,
      origin: "Delhi",
      destination: "Dehradun",
      weight: "8 tonnes",
      price: "Rs.105620",
      status: "Available",
      coordinates: [
        [26.9124, 75.7873], // Jaipur
        [28.7041, 77.1025], // Delhi
        [30.3165, 78.0322], // Dehradun
      ], // Jaipur to Delhi to Dehradun coordinates
    },
  ]);

  // Fetch route from OSRM API with multiple waypoints
  const fetchRoute = async (coordinates) => {
    const waypoints = coordinates.map(coord => `${coord[1]},${coord[0]}`).join(';');
    const url = `https://router.project-osrm.org/route/v1/driving/${waypoints}?overview=full&geometries=geojson`;
    
    try {
      const response = await axios.get(url);
      const coordinates = response.data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]); // Flip coordinates
      return coordinates;
    } catch (error) {
      console.error("Error fetching route from OSRM:", error);
      return [];
    }
  };

  // Open the order dialog
  const handleClickOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  // Accept an order and fetch the route from OSRM
  const handleAcceptOrder = async () => {
    if (selectedOrder) {
      const fetchedRoute = await fetchRoute(selectedOrder.coordinates);
      setRoute(fetchedRoute);

      // Set the status of the selected order to "Pending"
      setOrders(orders.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: "Pending" } : order
      ));
    }
    setOpen(false);
  };

  // Fetch initial route when the component loads
  useEffect(() => {
    // Fetch the route between Jaipur, Delhi, and Dehradun (initial route for shipment 2)
    const initializeRoute = async () => {
      const initialRoute = await fetchRoute([
        [26.9124, 75.7873], // Jaipur
        [30.3165, 78.0322], // Dehradun
      ]);
      setRoute(initialRoute);
    };
    initializeRoute();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', padding: 3 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {/* Left Panel: Shipment Details */}
            <Grid item xs={12} md={4}>
              <Typography variant="h4" gutterBottom>
                <p className="text-white">Manage Available Shipments</p>
              </Typography>

              {orders.filter(order => order.status !== "Pending").map((order) => (
                <Card key={order.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <Typography variant="h6">Shipment ID: {order.id}</Typography>
                      <Typography variant="body1">
                        {order.origin} to {order.destination}
                      </Typography>
                      <Typography variant="body2">Weight: {order.weight}</Typography>
                      <Typography variant="body2">Price: {order.price}</Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleClickOpen(order)}
                        disabled={order.status === "Pending"}
                      >
                        {order.status === "Pending" ? "Pending" : "Accept Order"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Grid>

            {/* Right Panel: Map */}
            <Grid item xs={12} md={8}>
              <Box style={{ height: "500px", width: "100%" }}>
                <MapContainer center={route[0] || [26.9124, 75.7873]} zoom={7} style={{ height: "100%", width: "100%" }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {route.length > 0 && (
                    <>
                      <Marker position={route[0]} icon={truckIcon} />
                      <Marker position={route[route.length - 1]}><img src="src\assets\—Pngtree—location pin vector icon symbol_15329524.png" alt="" /></Marker>
                      <Polyline positions={route} color="blue" weight={5} />
                    </>
                  )}
                </MapContainer>
              </Box>
            </Grid>
          </Grid>

          {/* Order Details Modal */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Order Details</DialogTitle>
            <DialogContent>
              {selectedOrder && (
                <>
                  <Typography variant="body1">
                    <strong>Origin:</strong> {selectedOrder.origin}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Destination:</strong> {selectedOrder.destination}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Weight:</strong> {selectedOrder.weight}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Price:</strong> {selectedOrder.price}
                  </Typography>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleAcceptOrder} color="primary">
                Accept Order
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default FleetManagerMarketplace;
