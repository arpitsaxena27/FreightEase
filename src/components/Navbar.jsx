import { Toolbar, Typography, Button, AppBar } from "@mui/material";
import DropdownMenu from "./DropdownMenu";
import { useNavigate } from "react-router-dom";
function Navbar() {
      const navigate = useNavigate();
      function Login() {
            navigate(`/login`);
      }
      function register() {
        navigate(`/register`);
  }
      function back()
      {
        navigate(`/`);
      }
      function market()
      {
        navigate(`/freightmarket/fleetowner`);
      }
      function contracts()
      {
        navigate(`/contracts`);
      }
      return (
            <>
                  <AppBar
                        position="sticky"
                        sx={{
                              backgroundColor: "#111111",
                              boxShadow: "none",
                              borderBottom: "1px solid #111111",
                        }}
                  >
                        <Toolbar>
                              <nav className="flex gap-56 items-center">
                                    <div className="flex justify-center items-center">
                                          <img
                                                className="w-16 pr-3"
                                                src="src\assets\IMG_20240907_135945.png"
                                                alt=""
                                          />
                                          <Typography variant="h6" sx={{}}>
                                                <p className="custom-font font-bold text-2xl ">
                                                      FrieghtEase
                                                </p>
                                          </Typography>
                                    </div>
                                    <div className="flex gap-7">
                                          <Typography
                                                variant="h6"
                                                sx={{
                                                      backgroundColor:
                                                            "transparent",
                                                      color: "inherit",
                                                      borderRadius: "4px", // Optional: Rounded corners
                                                      p: 1, // Optional: Padding to make background visible
                                                      "&:hover": {
                                                            backgroundColor:
                                                                  "#fff", // White background on hover
                                                            color: "#000", // Black text on hover
                                                            cursor: "pointer", // Change cursor to pointer
                                                      },
                                                      transition:
                                                            "all 0.3s ease", // Smooth transition effect
                                                      display: "inline-block", // Ensures padding and background are visible
                                                }}
                                          >
                                                <p className="text-sm" onClick={back}>Home</p>
                                          </Typography>

                                          <Typography
                                                variant="h6"
                                                sx={{
                                                      backgroundColor:
                                                            "transparent",
                                                      color: "inherit",
                                                      borderRadius: "4px",
                                                      p: 1,
                                                      "&:hover": {
                                                            backgroundColor:
                                                                  "#fff",
                                                            color: "#000",
                                                            cursor: "pointer",
                                                      },
                                                      transition:
                                                            "all 0.3s ease",
                                                      display: "inline-block",
                                                }}
                                          >
                                                <DropdownMenu
                                                      name={"Dashboard"}
                                                      p1={
                                                            "Fleet Owner Dashboard"
                                                      }
                                                      p2={"Shipper Dashboard"}
                                                      p3={"Driver Dashboard"}
                                                />
                                          </Typography>

                                          <Typography
                                                variant="h6"
                                                sx={{
                                                      backgroundColor:
                                                            "transparent",
                                                      color: "inherit",
                                                      borderRadius: "4px",
                                                      p: 1,
                                                      "&:hover": {
                                                            backgroundColor:
                                                                  "#fff",
                                                            color: "#000",
                                                            cursor: "pointer",
                                                      },
                                                      transition:
                                                            "all 0.3s ease",
                                                      display: "inline-block",
                                                }}
                                          >
                                                <p className="text-sm" onClick={contracts}>
                                                      Contracts
                                                </p>
                                          </Typography>

                                          <Typography
                                                variant="h6"
                                                sx={{
                                                      backgroundColor:
                                                            "transparent",
                                                      color: "inherit",
                                                      borderRadius: "4px",
                                                      p: 1,
                                                      "&:hover": {
                                                            backgroundColor:
                                                                  "#fff",
                                                            color: "#000",
                                                            cursor: "pointer",
                                                      },
                                                      transition:
                                                            "all 0.3s ease",
                                                      display: "inline-block",
                                                }}
                                          >
                                                <p className="text-sm" onClick={market}>
                                                      Market
                                                </p>
                                          </Typography>

                                          <Typography
                                                variant="h6"
                                                sx={{
                                                      backgroundColor:
                                                            "transparent",
                                                      color: "inherit",
                                                      borderRadius: "4px",
                                                      p: 1,
                                                      transition:
                                                            "all 0.3s ease",
                                                      display: "inline-block",
                                                      "&:hover": {
                                                            backgroundColor:
                                                                  "#fff",
                                                            color: "#000",
                                                            cursor: "pointer",
                                                      },
                                                }}
                                          >
                                                <p className="text-sm">
                                                      Support
                                                </p>
                                          </Typography>
                                    </div>

                                    <div className="flex gap-3">
                                          <Button
                                                onClick={() => {
                                                      register();
                                                }}
                                                color="inherit"
                                                sx={{
                                                      padding: "6px 16px",
                                                      textTransform: "none",
                                                      fontWeight: "bold",
                                                      border: "1px solid #aaaaaa",
                                                      borderRadius: "4px",
                                                }}
                                          >
                                                Sign Up
                                          </Button>

                                          <Button
                                                onClick={() => {
                                                      Login();
                                                }}
                                                color="inherit"
                                                sx={{
                                                      padding: "6px 16px",
                                                      textTransform: "none",
                                                      fontWeight: "bold",
                                                      border: "1px solid #aaaaaa",
                                                      borderRadius: "4px",
                                                      background: "white",
                                                      color: "black",
                                                }}
                                          >
                                                Log In
                                          </Button>
                                    </div>
                              </nav>
                        </Toolbar>
                  </AppBar>
            </>
      );
}
export default Navbar;
