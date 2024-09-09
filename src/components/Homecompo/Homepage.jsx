import {
      createTheme,
      ThemeProvider,
      CssBaseline,
      Link,
      IconButton,
} from "@mui/material";
import { Facebook, X, LinkedIn, Instagram } from "@mui/icons-material";
import {

      Container,
      Box,
      Typography,
      Button,
      Grid,
      Divider,
      Avatar,
      Paper,
      List,
      ListItem,
      ListItemText,
      ListItemAvatar,
      CircularProgress,
      Accordion,
      AccordionSummary,
      AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
      LineChart,
      Line,
      XAxis,
      YAxis,
      CartesianGrid,
      Tooltip,
      Legend,
} from "recharts";
import FeatureCard from "./FeatureCard";



// Animation for Typography
const AnimatedTypography = styled(motion(Typography))({
      fontSize: "4rem",
      fontWeight: "bold",
      color: "#ffffff",
      textAlign: "center",
});

// Styled Button
const StyledButton = styled(Button)(({ theme, variant }) => ({
      borderRadius: "8px",
      padding: "12px 32px",
      textTransform: "none",
      fontWeight: "600",
      fontSize: "1rem",
      transition: "background-color 0.3s, color 0.3s, transform 0.3s",
      ...(variant === "contained" && {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.getContrastText(theme.palette.primary.main),
            "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                  transform: "scale(1.05)",
            },
      }),
      ...(variant === "outlined" && {
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            borderWidth: "2px",
            borderStyle: "solid",
            "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.getContrastText(
                        theme.palette.primary.main
                  ),
                  borderColor: theme.palette.primary.main,
                  transform: "scale(1.05)",
            },
      }),
}));

// Create a custom theme
const theme = createTheme({
      palette: {
            mode: "dark",
            primary: {
                  main: "#ffffff",
                  dark: "#eeeeee",
            },
            background: {
                  default: "#000000",
                  paper: "#111111",
            },
            text: {
                  primary: "#ffffff",
                  secondary: "#cccccc",
            },
      },
      typography: {
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            h1: {
                  fontSize: "4rem",
                  fontWeight: 700,
            },
            h6: {
                  fontSize: "1.25rem",
                  fontWeight: 400,
            },
      },
});

// Sample data for charts
const data = [
      { name: "Jan", shipments: 4000, returns: 400 },
      { name: "Feb", shipments: 3000, returns: 398 },
      { name: "Mar", shipments: 5000, returns: 800 },
      { name: "Apr", shipments: 3980, returns: 908 },
      { name: "May", shipments: 3890, returns: 850 },
      { name: "Jun", shipments: 2390, returns: 380 },
      { name: "Jul", shipments: 3490, returns: 430 },
];

const Home = () => {
      
      return (
            <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Container maxWidth="lg" sx={{ mt: 8 }}>
                        {/* Hero Section */}
                        <Box
                              sx={{
                                    minHeight: "80vh",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    padding: 3,
                              }}
                        >
                              <AnimatedTypography
                                    variant="h1"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                          duration: 1,
                                          ease: "easeOut",
                                    }}
                                    sx={{ mb: 3 }}
                              >
                                    Elevate Your Freight Management
                              </AnimatedTypography>
                              <Typography
                                    variant="h6"
                                    sx={{ color: "text.secondary", mb: 6 }}
                              >
                                    Simplify your logistics with a sleek,
                                    efficient platform.
                              </Typography>
                              <Box
                                    sx={{
                                          display: "flex",
                                          gap: 2,
                                          justifyContent: "center",
                                          flexWrap: "wrap",
                                    }}
                              >
                                    <StyledButton variant="contained">
                                          Get Started
                                    </StyledButton>
                                    <StyledButton variant="outlined">
                                          Learn More
                                    </StyledButton>
                              </Box>
                        </Box>

                        <Divider sx={{ my: 6, backgroundColor: "#333333" }} />

                        {/* Content Section */}
                        <Box
                              sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", md: "row" },
                                    gap: 4,
                                    minHeight: "80vh",
                                    justifyContent: "center",
                              }}
                        >
                              {/* Monthly Shipments Chart */}
                              <Paper
                                    elevation={3}
                                    sx={{
                                          flex: 1,
                                          padding: 3,
                                          backgroundColor: "#222222",
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center",
                                    }}
                              >
                                    <Typography
                                          variant="h6"
                                          sx={{ mb: 2, color: "#ffffff" }}
                                    >
                                          Monthly Shipments & Returns
                                    </Typography>
                                    <LineChart
                                          width={500}
                                          height={300}
                                          data={data}
                                          margin={{
                                                top: 20,
                                                right: 20,
                                                bottom: 5,
                                                left: 0,
                                          }}
                                    >
                                          <CartesianGrid strokeDasharray="3 3" />
                                          <XAxis dataKey="name" />
                                          <YAxis />
                                          <Tooltip />
                                          <Legend />
                                          <Line
                                                type="monotone"
                                                dataKey="shipments"
                                                stroke="#8884d8"
                                                activeDot={{ r: 8 }}
                                          />
                                          <Line
                                                type="monotone"
                                                dataKey="returns"
                                                stroke="#82ca9d"
                                          />
                                    </LineChart>
                              </Paper>

                              {/* Recent Activities List */}
                              <Paper
                                    elevation={3}
                                    sx={{
                                          flex: 1,
                                          padding: 3,
                                          backgroundColor: "#222222",
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center",
                                    }}
                              >
                                    <Typography
                                          variant="h6"
                                          sx={{ mb: 2, color: "#ffffff" }}
                                    >
                                          Recent Activities
                                    </Typography>
                                    <List
                                          sx={{
                                                width: "100%",
                                                maxHeight: 300,
                                                overflow: "auto",
                                          }}
                                    >
                                          <ListItem>
                                                <ListItemAvatar>
                                                      <Avatar>
                                                            <CircularProgress
                                                                  size={24}
                                                            />
                                                      </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                      primary="New shipment added"
                                                      secondary="15 minutes ago"
                                                      sx={{ color: "#ffffff" }}
                                                />
                                          </ListItem>
                                          <ListItem>
                                                <ListItemAvatar>
                                                      <Avatar>
                                                            <CircularProgress
                                                                  size={24}
                                                            />
                                                      </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                      primary="Shipment delivered"
                                                      secondary="2 hours ago"
                                                      sx={{ color: "#ffffff" }}
                                                />
                                          </ListItem>
                                          <ListItem>
                                                <ListItemAvatar>
                                                      <Avatar>
                                                            <CircularProgress
                                                                  size={24}
                                                            />
                                                      </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                      primary="Return requested"
                                                      secondary="1 day ago"
                                                      sx={{ color: "#ffffff" }}
                                                />
                                          </ListItem>
                                    </List>
                              </Paper>
                        </Box>

                        <Container>
                              {/* Features Section */}
                              <motion.div
                                    className="relative w-full h-[100vh] flex flex-col items-center justify-center bg-transparent"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={{
                                          hidden: { opacity: 0, scale: 0.9 },
                                          visible: {
                                                opacity: 1,
                                                scale: 1,
                                                transition: {
                                                      duration: 1,
                                                      delay: 0.5,
                                                },
                                          },
                                    }}
                              >
                                    <div className="relative z-10 text-center py-16 text-white">
                                          <motion.h1
                                                className="text-5xl font-bold mb-4"
                                                initial={{
                                                      opacity: 0,
                                                      x: -100,
                                                }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 1 }}
                                          >
                                                Welcome to the FreightEase
                                          </motion.h1>
                                          <motion.p
                                                className="text-xl mb-8"
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 1 }}
                                          >
                                                Managing your fleet, routes, and
                                                loads with ease.
                                          </motion.p>
                                          <motion.button
                                                className="px-8 py-4 bg-blue-600 font-semibold rounded-lg shadow-lg hover:bg-blue-700"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.5 }}
                                          >
                                                Get Started
                                          </motion.button>
                                    </div>
                              </motion.div>
                              <Container
                                    sx={{
                                          display: "flex",
                                          minHeight: "90vh",
                                          justifyContent: "center",
                                    }}
                              >
                                    <motion.div
                                          className="grid mb-60 w-full grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl px-6 py-12"
                                          initial="hidden"
                                          whileInView="visible"
                                          viewport={{ once: true }}
                                          variants={{
                                                hidden: {
                                                      opacity: 0,
                                                      scale: 0.9,
                                                },
                                                visible: {
                                                      opacity: 1,
                                                      scale: 1,
                                                      transition: {
                                                            duration: 1,
                                                            delay: 0.3,
                                                      },
                                                },
                                          }}
                                    >
                                          <motion.div
                                                className="bg-[#333333] p-6 rounded-lg shadow-lg flex flex-col items-center"
                                                whileHover={{ scale: 1.05 }}
                                                transition={{
                                                      type: "spring",
                                                      stiffness: 300,
                                                }}
                                          >
                                                <h3 className="text-2xl font-bold text-white mb-10">
                                                      Real-Time Tracking
                                                </h3>
                                                <p className="text-gray-400">
                                                      Monitor your fleet in
                                                      real-time with GPS
                                                      tracking and get instant
                                                      updates on vehicle status.
                                                </p>
                                          </motion.div>
                                          <motion.div
                                                className="bg-white p-6 rounded-lg shadow-lg  flex flex-col items-center"
                                                whileHover={{ scale: 1.05 }}
                                                transition={{
                                                      type: "spring",
                                                      stiffness: 300,
                                                }}
                                          >
                                                <h3 className="text-2xl font-bold text-black mb-10">
                                                      Load Optimization
                                                </h3>
                                                <p className="text-gray-600">
                                                      Harness AI to fine-tune
                                                      load distribution,
                                                      minimize empty miles, and
                                                      achieve peak operational
                                                      efficiency.
                                                </p>
                                          </motion.div>
                                          <motion.div
                                                className="bg-[#333333] p-6 rounded-lg shadow-lg  flex flex-col items-center"
                                                whileHover={{ scale: 1.05 }}
                                                transition={{
                                                      type: "spring",
                                                      stiffness: 300,
                                                }}
                                          >
                                                <h3 className="text-2xl font-bold text-white mb-10">
                                                      Digital Contracts
                                                </h3>
                                                <p className="text-gray-400">
                                                      Secure your transactions
                                                      with online contracts and
                                                      automated billing
                                                      solutions.
                                                </p>
                                          </motion.div>
                                    </motion.div>
                              </Container>
                        </Container>
                        <Container maxWidth="lg" sx={{ py: 8 }}>
                              <Typography
                                    variant="h4"
                                    align="center"
                                    gutterBottom
                              >
                                    Stand Out with Our Freight Forwarding
                                    Solutions
                              </Typography>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                                    <FeatureCard
                                          title="Boosted Productivity"
                                          description="Embrace digital transformation to streamline your processes, enhance accuracy, and optimize your time and resources."
                                    />
                                    <FeatureCard
                                          title="Increased Profitability"
                                          description="Streamline operations to expand your customer base and improve returns, all while maintaining current costs and staffing levels."
                                    />
                                    <FeatureCard
                                          title="Freight Market"
                                          description="Monetize Spare Capacity: Allow third-party shippers to book unused truck space, optimizing resource utilization and generating additional revenue."
                                    />
                                    <FeatureCard
                                          title="Google Maps-Based Route Management"
                                          description="Smart Routing & Real-Time Traffic: Receive real-time traffic updates and optimized routes to minimize delays and boost operational efficiency."
                                    />
                                    <FeatureCard
                                          title="Community-Based Notification System"
                                          description="Enhanced Driver Collaboration: Share real-time updates on routes and delays, improving communication and coordination among drivers."
                                    />
                              </div>
                              <StyledButton
                                    variant="contained"
                                    sx={{ mt: 4, display: "block", mx: "auto" }}
                              >
                                    Get Started
                              </StyledButton>
                        </Container>

                        <div className="hidden lg:block">
                              <Container
                                    sx={{
                                          m: 4,
                                          display: "flex",
                                          height: "120vh",
                                          gap: "50px",
                                          alignItems: "center",
                                    }}
                              >
                                    <motion.h1
                                          className="text-3xl font-bold mb-4"
                                          initial={{
                                                opacity: 0,
                                                x: -100,
                                          }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ duration: 1 }}
                                    >
                                          How Our Solution Transforms Fleet
                                          Management
                                    </motion.h1>
                                    <Grid container spacing={3}>
                                          <Grid item xs={12} md={6}>
                                                <Paper
                                                      className="h-[80vh]"
                                                      elevation={3}
                                                      style={{
                                                            padding: "16px",
                                                            paddingRight:
                                                                  "80px",
                                                      }}
                                                >
                                                      <Typography
                                                            sx={{
                                                                  fontWeight:
                                                                        "bold",
                                                            }}
                                                            variant="h6"
                                                            gutterBottom
                                                      >
                                                            Current Industry
                                                            Practices
                                                      </Typography>

                                                      <Typography
                                                            variant="body1"
                                                            paragraph
                                                      >
                                                            <strong>
                                                                  Route
                                                                  Planning:
                                                            </strong>{" "}
                                                            Reliance on static
                                                            schedules and
                                                            historical data;
                                                            limited real-time
                                                            adjustments.
                                                      </Typography>
                                                      <Typography
                                                            variant="body1"
                                                            paragraph
                                                      >
                                                            <strong>
                                                                  Tracking &
                                                                  Communication:
                                                            </strong>{" "}
                                                            Basic GPS tracking
                                                            with manual
                                                            deviation reporting;
                                                            fragmented
                                                            communication
                                                            channels.
                                                      </Typography>
                                                      <Typography
                                                            variant="body1"
                                                            paragraph
                                                      >
                                                            <strong>
                                                                  Capacity
                                                                  Management:
                                                            </strong>{" "}
                                                            Fixed capacity
                                                            plans; missed
                                                            opportunities for
                                                            monetizing spare
                                                            capacity.
                                                      </Typography>
                                                      <Typography
                                                            variant="body1"
                                                            paragraph
                                                      >
                                                            <strong>
                                                                  Billing &
                                                                  Contracts:
                                                            </strong>{" "}
                                                            Manual paperwork;
                                                            high administrative
                                                            overhead; potential
                                                            for disputes.
                                                      </Typography>
                                                </Paper>
                                          </Grid>
                                          <Grid item xs={12} md={6}>
                                                <Paper
                                                      className="h-[80vh]"
                                                      elevation={3}
                                                      style={{
                                                            padding: "16px",
                                                            marginTop: "100px",
                                                            marginLeft:
                                                                  "-100px",
                                                            marginRight:
                                                                  "100px",
                                                            backgroundColor:
                                                                  "white",
                                                            color: "#333333",
                                                      }}
                                                >
                                                      <Typography
                                                            sx={{
                                                                  fontWeight:
                                                                        "bold",
                                                            }}
                                                            className="text-black"
                                                            variant="h6"
                                                            gutterBottom
                                                      >
                                                            Post-Solution
                                                            Enhancements
                                                      </Typography>
                                                      <Typography
                                                            variant="body1"
                                                            paragraph
                                                      >
                                                            <strong>
                                                                  Advanced
                                                                  Scheduling:
                                                            </strong>{" "}
                                                            Real-time scheduling
                                                            and dynamic route
                                                            planning; immediate
                                                            adjustments based on
                                                            live data.
                                                      </Typography>
                                                      <Typography
                                                            variant="body1"
                                                            paragraph
                                                      >
                                                            <strong>
                                                                  Enhanced
                                                                  Tracking:
                                                            </strong>{" "}
                                                            Real-time GPS
                                                            tracking with
                                                            detailed insights;
                                                            automated alerts for
                                                            deviations and
                                                            delays.
                                                      </Typography>
                                                      <Typography
                                                            variant="body1"
                                                            paragraph
                                                      >
                                                            <strong>
                                                                  Dynamic
                                                                  Capacity
                                                                  Management:
                                                            </strong>{" "}
                                                            Real-time
                                                            optimization and
                                                            monetization of
                                                            spare capacity;
                                                            integration with 3PL
                                                            partners.
                                                      </Typography>
                                                      <Typography
                                                            variant="body1"
                                                            paragraph
                                                      >
                                                            <strong>
                                                                  Automated
                                                                  Billing &
                                                                  Contracts:
                                                            </strong>{" "}
                                                            Online contracts and
                                                            automated billing;
                                                            reduced
                                                            administrative
                                                            workload and
                                                            improved
                                                            transparency.
                                                      </Typography>
                                                </Paper>
                                          </Grid>
                                    </Grid>
                              </Container>
                        </div>
                        <Container
                              sx={{
                                    height: "60vh",
                                    display: "block",
                              }}
                        >
                              <Typography
                                    sx={{
                                          mx: 1,
                                    }}
                                    variant="h4"
                                    component="h2"
                                    gutterBottom
                              >
                                    Frequently Asked Questions
                              </Typography>

                              {/* FAQ Item 1 */}
                              <Accordion>
                                    <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="faq1-content"
                                          id="faq1-header"
                                    >
                                          <Typography>
                                                What is your freight management
                                                system?
                                          </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                          <Typography>
                                                Our freight management system
                                                streamlines logistics operations
                                                for higher productivity, profit
                                                growth, customer satisfaction,
                                                and more.
                                          </Typography>
                                    </AccordionDetails>
                              </Accordion>

                              {/* FAQ Item 2 */}
                              <Accordion>
                                    <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="faq2-content"
                                          id="faq2-header"
                                    >
                                          <Typography>
                                                How does the automated service
                                                work?
                                          </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                          <Typography>
                                                Automated services reduce manual
                                                tasks, human error, and optimize
                                                your processes, resulting in
                                                better efficiency.
                                          </Typography>
                                    </AccordionDetails>
                              </Accordion>

                              {/* FAQ Item 3 */}
                              <Accordion>
                                    <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="faq3-content"
                                          id="faq3-header"
                                    >
                                          <Typography>
                                                How do I track my shipment?
                                          </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                          <Typography>
                                                You can track your shipment in
                                                real-time using our tracking
                                                feature, which provides updates
                                                on the shipments location and
                                                estimated delivery time.
                                          </Typography>
                                    </AccordionDetails>
                              </Accordion>
                              {/* FAQ Item 4 */}
                              <Accordion>
                                    <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="faq4-content"
                                          id="faq4-header"
                                    >
                                          <Typography>
                                                What payment methods do you
                                                accept?
                                          </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                          <Typography>
                                                We accept various payment
                                                methods including credit cards,
                                                bank transfers, and digital
                                                payment platforms like PayPal.
                                          </Typography>
                                    </AccordionDetails>
                              </Accordion>

                              {/* FAQ Item 5 */}
                              <Accordion>
                                    <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="faq5-content"
                                          id="faq5-header"
                                    >
                                          <Typography>
                                                Can I get customer support 24/7?
                                          </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                          <Typography>
                                                Yes, our customer support is
                                                available 24/7 to assist you
                                                with any inquiries or issues you
                                                may have.
                                          </Typography>
                                    </AccordionDetails>
                              </Accordion>
                        </Container>

                        <footer className="bg-black text-gray-400 py-12">
                              <Container maxWidth="lg">
                                    <Grid container spacing={4}>
                                          {/* Company Section */}
                                          <Grid item xs={12} md={4}>
                                                <div className="flex mb-5">
                                                      <img
                                                            className="w-16 pr-3"
                                                            src="src\assets\IMG_20240907_135945.png"
                                                            alt=""
                                                      />
                                                      <Typography
                                                            variant="h6"
                                                            sx={{ flexGrow: 1 }}
                                                      >
                                                            <p className="custom-font font-bold text-2xl ">
                                                                  FrieghtEase
                                                            </p>
                                                      </Typography>
                                                </div>
                                                <Typography
                                                      variant="body2"
                                                      className="text-gray-400"
                                                >
                                                      Streamlining logistics
                                                      operations to help you
                                                      achieve higher
                                                      productivity, profit
                                                      growth, and customer
                                                      satisfaction.
                                                </Typography>
                                          </Grid>

                                          {/* Product Links */}
                                          <Grid item xs={6} md={2}>
                                                <Typography
                                                      variant="subtitle1"
                                                      color="white"
                                                      gutterBottom
                                                >
                                                      Product
                                                </Typography>
                                                <Box>
                                                      <Link
                                                            href="/features"
                                                            color="inherit"
                                                            underline="none"
                                                      >
                                                            Features
                                                      </Link>
                                                </Box>
                                                <Box>
                                                      <Link
                                                            href="/pricing"
                                                            color="inherit"
                                                            underline="none"
                                                      >
                                                            Pricing
                                                      </Link>
                                                </Box>
                                                <Box>
                                                      <Link
                                                            href="/documentation"
                                                            color="inherit"
                                                            underline="none"
                                                      >
                                                            Documentation
                                                      </Link>
                                                </Box>
                                                <Box>
                                                      <Link
                                                            href="/status"
                                                            color="inherit"
                                                            underline="none"
                                                      >
                                                            System Status
                                                      </Link>
                                                </Box>
                                          </Grid>

                                          {/* Company Links */}
                                          <Grid item xs={6} md={2}>
                                                <Typography
                                                      variant="subtitle1"
                                                      color="white"
                                                      gutterBottom
                                                >
                                                      Company
                                                </Typography>
                                                <Box>
                                                      <Link
                                                            href="/about"
                                                            color="inherit"
                                                            underline="none"
                                                      >
                                                            About Us
                                                      </Link>
                                                </Box>
                                                <Box>
                                                      <Link
                                                            href="/careers"
                                                            color="inherit"
                                                            underline="none"
                                                      >
                                                            Careers
                                                      </Link>
                                                </Box>
                                                <Box>
                                                      <Link
                                                            href="/blog"
                                                            color="inherit"
                                                            underline="none"
                                                      >
                                                            Blog
                                                      </Link>
                                                </Box>
                                                <Box>
                                                      <Link
                                                            href="/contact"
                                                            color="inherit"
                                                            underline="none"
                                                      >
                                                            Contact Us
                                                      </Link>
                                                </Box>
                                          </Grid>

                                          {/* Resources Links */}
                                          <Grid item xs={6} md={2}>
                                                <Typography
                                                      variant="subtitle1"
                                                      color="white"
                                                      gutterBottom
                                                >
                                                      Resources
                                                </Typography>
                                                <Box>
                                                      <Link
                                                            href="/help"
                                                            color="inherit"
                                                            underline="none"
                                                      >
                                                            Help Center
                                                      </Link>
                                                </Box>
                                                <Box>
                                                      <Link
                                                            href="/faq"
                                                            color="inherit"
                                                            underline="none"
                                                      >
                                                            FAQ
                                                      </Link>
                                                </Box>
                                                <Box>
                                                      <Link
                                                            href="/community"
                                                            color="inherit"
                                                            underline="none"
                                                      >
                                                            Community
                                                      </Link>
                                                </Box>
                                                <Box>
                                                      <Link
                                                            href="/privacy"
                                                            color="inherit"
                                                            underline="none"
                                                      >
                                                            Privacy Policy
                                                      </Link>
                                                </Box>
                                          </Grid>

                                          {/* Social Media Links */}
                                          <Grid item xs={12} md={2}>
                                                <Typography
                                                      variant="subtitle1"
                                                      color="white"
                                                      gutterBottom
                                                >
                                                      Follow Us
                                                </Typography>
                                                <Box
                                                      display="flex"
                                                      className="flex-wrap"
                                                >
                                                      <IconButton
                                                            href="https://twitter.com"
                                                            color="inherit"
                                                      >
                                                            <X />
                                                      </IconButton>
                                                      <IconButton
                                                            href="https://linkedin.com"
                                                            color="inherit"
                                                      >
                                                            <LinkedIn />
                                                      </IconButton>
                                                      <IconButton
                                                            href="https://facebook.com"
                                                            color="inherit"
                                                      >
                                                            <Facebook />
                                                      </IconButton>
                                                      <IconButton
                                                            href="https://instagram.com"
                                                            color="inherit"
                                                      >
                                                            <Instagram />
                                                      </IconButton>
                                                </Box>
                                          </Grid>
                                    </Grid>

                                    {/* Footer Bottom Text */}
                                    <Box mt={8} textAlign="center">
                                          <Typography
                                                variant="body2"
                                                color="gray.400"
                                          >
                                                &copy;{" "}
                                                {new Date().getFullYear()}{" "}
                                                FreightEase. All rights
                                                reserved.
                                          </Typography>
                                    </Box>
                              </Container>
                        </footer>
                  </Container>
            </ThemeProvider>
      );
};

export default Home;
