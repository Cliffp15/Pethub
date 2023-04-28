import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Grid, Link, Typography } from "@material-ui/core";
import Aos from "aos";
import "aos/dist/aos.css";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#212121",
    color: "#fff",
    padding: theme.spacing(6, 0),
  },
  logo: {
    height: 50,
  },
  heading: {
    fontWeight: 600,
    marginBottom: theme.spacing(2),
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function Footer() {
  const classes = useStyles();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} className={classes.column} data-aos="fade-up">
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
              <Link href="/postapet" variant="body1" className={classes.link}>
                Post a Pet
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} className={classes.column} data-aos="fade-up">
            <Typography variant="h6" className={classes.heading}>
              About Us
            </Typography>
            <Typography variant="body1">
              A Junior Development Team Project Collaboration Effort
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} className={classes.column} data-aos="fade-up">
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
          <Typography variant="body2" align="center" color="#ffff">
            © {new Date().getFullYear()} PetHub. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
