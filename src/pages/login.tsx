import { useLogin } from "@refinedev/core";
import { useEffect, useRef } from "react";

import { Box, Container, Typography } from "@mui/material";
import { ThemedTitleV2 } from "@refinedev/mui";

import { CredentialResponse } from "../interfaces/google";

import { yariga } from "../components/index";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GOOGLE_CLIENT_ID =
    "1041339102270-e1fpe2b6v6u1didfndh7jkjmpcashs4f.apps.googleusercontent.com";

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Box component="div" sx={{ backgroundColor: "#FCFCFC" }}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <img src={yariga} alt="yariga logo" />
          </div>
          <Box mt={4}>
            <GoogleButton />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
