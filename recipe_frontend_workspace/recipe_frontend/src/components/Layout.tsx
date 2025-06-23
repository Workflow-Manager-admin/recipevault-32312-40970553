import React, { useState } from "react";
import { ThemeProvider } from "../theme";
import { Drawer } from "./Drawer";
import { NavBar } from "./NavBar";

// PUBLIC_INTERFACE
export const AppLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Page content will always be offset for the drawer width on desktop.
  // Responsive implementation for minimal MVP.
  return (
    <ThemeProvider>
      <NavBar onDrawerToggle={() => setDrawerOpen(open => !open)} />
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={() => {
          // In MVP: no category filter implemented.
        }}
      />
      <main
        style={{
          marginLeft: 0,
          minHeight: "calc(100vh - 56px)",
          background: "#FAFAFA",
          padding: "24px 16px 40px 16px",
        }}
      >
        {children}
      </main>
    </ThemeProvider>
  );
};
