import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";

function Footer() {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minHeight: "40vh",
      }}
    >
      <h1 style={{ color: "#ffffff", textAlign: "center" }}></h1>
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <p style={{ color: "#ffffff", textAlign: "center" }}>
              A Junior Development Team Project Collaboration Effort
            </p>
          </Column>
          <Column>
            <Heading>Quick Links</Heading>
            <ul>
              <li>
                <FooterLink href="/">Home</FooterLink>
              </li>
              <li>
                <FooterLink href="/findapet">Find a Pet</FooterLink>
              </li>
              <li>
                <FooterLink href="/postapet">Post a Pet</FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">Contact Us</FooterLink>
              </li>
            </ul>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <ul>
              <li style={{ color: "#ffffff", textAlign: "center" }}>
                <i className="fa fa-envelope"></i> info@pethub.com
              </li>
              <li style={{ color: "#ffffff", textAlign: "center" }}>
                <i className="fa fa-phone"></i> (123) 456-7890
              </li>
              <li style={{ color: "#ffffff", textAlign: "center" }}>
                <i className="fa fa-map-marker"></i> 123 Main St, Anytown USA
              </li>
            </ul>
          </Column>
        </Row>
        <hr />
        <Row>
          <p style={{ textAlign: "center" }}>
            <img
              src="https://cdn-us.icons8.com/BSDWpG-URUi1u809sSrJ0g/-Sv0Dr6OWU-lYx_uKg34lQ/PetHubLogo.png"
              alt="PetHub Logo"
              height="50"
            />
          </p>
          <p style={{ textAlign: "center", color: "#fff" }}>
            © {new Date().getFullYear()} PetHub. All rights reserved.
          </p>
        </Row>
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
