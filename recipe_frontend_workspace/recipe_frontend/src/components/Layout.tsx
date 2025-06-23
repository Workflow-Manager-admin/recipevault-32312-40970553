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
        tabIndex={-1}
        aria-label="Main content area"
        style={{
          marginLeft: 0,
          minHeight: "calc(100vh - 56px)",
          background: "#FAFAFA",
          padding: "2.1rem 1rem 2.7rem 1rem",
          outline: "none"
        }}
      >
        {children}
      </main>
    </ThemeProvider>
  );
};
