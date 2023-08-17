"use client";

import { ChildrenType } from "@/types/index.types";
import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import Navbar from "../navbar";
import Sidebar from "../sidebar";
import { useAppSelector } from "@/hooks/hooks";

const Layout = ({ children }: ChildrenType) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const profile = useAppSelector((state) => state.global.profile);

  return (
    <Box width="100%" height="100%">
      <Box>
        <Sidebar
          isNonMobile={!isMobile}
          user={profile}
          drawerWidth={isMobile ? "100%" : "400px"}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Navbar
          user={profile}
          setIsSidebarOpen={setIsSidebarOpen}
          isMobile={isMobile}
        />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
