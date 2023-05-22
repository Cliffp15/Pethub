import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Grid, Link, Typography } from "@material-ui/core";
import logo from "../photos/LogoWhite.png";
import Aos from "aos";
import "aos/dist/aos.css";
import { Block } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#212121",
    color: "#fff",
    padding: theme.spacing(0.25, 0),
  },
  logo: {
    height: 50,
  },
  heading: {
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    textAlign: "baseline",
  },
  link: {
    color: "#fff",
    marginRight: "1rem",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  horizontalColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
  },
}));

function Footer() {
  const classes = useStyles();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <Box className={classes.root} align-item="stretch">
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          style={{ display: "flex", alignItems: "baseline" }}
        >
          <Grid
            item
            xs={12}
            sm={4}
            className={classes.column}
            data-aos="fade-up"
            alignItems="baseline"
          >
            <Typography variant="h6" className={classes.heading}>
              Quick Links
            </Typography>
            <Box className={classes.horizontalColumn}>
              <Link href="/" variant="body1" className={classes.link}>
                Home
              </Link>
              <Link href="/findapet" variant="body1" className={classes.link}>
                Find a Pet
              </Link>
              <Link
                href="/findshelter"
                variant="body1"
                className={classes.link}
              >
                Find a Shelter
              </Link>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={4}
            className={classes.column}
            data-aos="fade-up"
            alignItems="baseline"
          >
            <Typography variant="h6" className={classes.heading}>
              About Us
            </Typography>
            <Typography variant="body1">
              A Junior Development Team Project Collaboration Effort
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            className={classes.column}
            data-aos="fade-up"
            alignItems="baseline"
          >
            <Typography variant="h6" className={classes.heading}>
              Contact Us
            </Typography>
            <Typography variant="body1">
              <i className="fa fa-envelope"></i> info@pethub.com
            </Typography>
            <Typography variant="body1">
              <i className="fa fa-phone"></i> (123) 456-7890
            </Typography>
            <Typography variant="body1">
              <i className="fa fa-map-marker"></i> 123 Main St, Anytown USA
            </Typography>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Grid container alignItems="center" justify="center" spacing={2}>
            <Grid item>
              <img src={logo} alt="PetHub Logo" height="50" />
            </Grid>
            <Grid item>
              <Typography variant="body2" align="center" color="#ffff">
                © {new Date().getFullYear()} PetHub. All rights reserved.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
// import React from "react";
// import { Box, Typography, Container, CssBaseline } from "@mui/material";
// import Link from "@mui/material/Link";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="/">
//         PetHub
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }
// export default function StickyFooter() {
//   return (
//     <>
//       <CssBaseline />
//       <Box
//         sx={{
//           position: "relative",
//           display: "flex",
//           flexDirection: "column",
//           minHeight: "40vh",
//         }}
//       >
//         <Box
//           sx={{
//             flexGrow: 1,
//           }}
//         >
//           {/* Your main content goes here */}
//         </Box>
//         <Box
//           component="footer"
//           sx={{
//             width: "100%",
//             py: 3,
//             px: 2,
//             backgroundColor: (theme) =>
//               theme.palette.mode === "light"
//                 ? theme.palette.grey[200]
//                 : theme.palette.grey[800],
//           }}
//         >
//           <Container maxWidth="sm">
//             <Typography variant="body1">
//               My sticky footer can be found here.
//             </Typography>
//             <Copyright />
//           </Container>
//         </Box>
//       </Box>
//     </>
//   );
//}
