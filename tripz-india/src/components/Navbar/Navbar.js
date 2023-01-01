import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import brand from "../../media/brand.png";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

let isLoggedIn = window.localStorage.getItem("loggedIn");

const Navbar = (props) => {
  const pages = ["Find Guides", "Create Guide Profile", "Delete Guide Profile"];
  const fullName =
    props.userDetails === undefined
      ? ""
      : props.userDetails.fname + " " + props.userDetails.lname;
  const Email = props.userDetails === undefined ? "" : props.userDetails.email;
  const settings = [`${fullName}`, `${Email}`, "Logout"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (props) => {
    if (props === pages[0]) {
      navigate("/guides");
    } else if (props === pages[1]) {
      navigate("/createProfile");
    } else if (props === pages[2]) {
      navigate("/deleteProfile");
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (props) => {
    console.log(props);
    if (props === "Logout") {
      window.localStorage.clear();
      window.location.href = "./";
    }
    setAnchorElUser(null);
  };

  const LoggedOut = () => (
    <>
      <Link to="/login" style={{ paddingRight: "3px" }}>
        <button className="btn btn-dark btn-sm">Login</button>
      </Link>
      <Link to="/signup">
        <button className="btn btn-dark btn-sm">Sign Up</button>
      </Link>
    </>
  );
  return (
    <AppBar position="static" color="inherit">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography href="/" component="a">
            <img className="brandLogo" src={brand} alt="Tripz India" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ mx: 0.5, my: 2, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={fullName} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <LoggedOut />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
