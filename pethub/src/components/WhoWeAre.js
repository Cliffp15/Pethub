import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "../components/Button";
import Typography from "../components/Typography";
import PetsIcon from "@mui/icons-material/Pets";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Wave from "react-wavify";

import CustomButton from "../components/Button";
import { createMuiTheme, createTheme } from "@mui/material";
import { color } from "@material-ui/system";
import { borderRadius } from "@mui/system";

const theme = createTheme({
  palette: {
    primary: {
      main: '#4169e1f4',
      darker: '#455e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});
const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

function WhoWeAre() {
  return (
    <Box
      component="section"
      sx={{ display: "flex", bgcolor: "#87ceeb", overflow: "hidden" }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          Who We Are
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <PetsIcon sx={{ fontSize: 55, my: 4 }} />
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ mb: 14, color: "white" }}
                >
                  We list pets in your local area to be adopted.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <SearchIcon sx={{ fontSize: 55, my: 4 }} />
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ mb: 14, color: "white" }}
                >
                  Find your new best friend.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <FavoriteIcon sx={{ fontSize: 55, my: 4 }} />
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ mb: 14, color: "white" }}
                >
                  Adopt your new best friend.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
        style={{
          borderRadius: 10
            }}
          color="primary"
          size="large"
          variant="contained"
          component="a"
          href="/findapet"
          sx={{ mt: 8 }}
        >
          Get started
        </Button>
      </Container>
    </Box>
  );
}

export default WhoWeAre;
