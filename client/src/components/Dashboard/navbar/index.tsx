"use client";

import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode, setProfile } from "@/state";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
} from "@mui/material";
import FlexBetween from "@/components/core/FlexBetween";
import useTheme from "@/hooks/useThemeWithCustomTS";
import { authAxios } from "@/utils/axios";

type IProps = {
  user: any;
  isMobile: boolean;
  setIsSidebarOpen: any;
};

const Navbar = ({ user, setIsSidebarOpen, isMobile }: IProps) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const [anchorEl, setAnchorEl] = useState<Object | null>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => setAnchorEl(event.target);

  const handleClose = () => setAnchorEl(null);

  React.useEffect(() => {
    authAxios("/auth/profile").then((resp) =>
      dispatch(setProfile(resp.data.data))
    );
  }, [dispatch]);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton
            onClick={() => setIsSidebarOpen((prev: boolean) => !prev)}
          >
            <MenuIcon />
          </IconButton>
          {!isMobile && (
            <FlexBetween
              backgroundColor={theme.palette.background.alt}
              borderRadius="9px"
              gap="3rem"
              p="0.1rem 1.5rem"
            >
              <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          {!isMobile && (
            <>
              {" "}
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlined sx={{ fontSize: "25px" }} />
                ) : (
                  <LightModeOutlined sx={{ fontSize: "25px" }} />
                )}
              </IconButton>
              <IconButton>
                <SettingsOutlined sx={{ fontSize: "25px" }} />
              </IconButton>
            </>
          )}

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src="/assets/image.jpg"
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user?.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl as any}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
