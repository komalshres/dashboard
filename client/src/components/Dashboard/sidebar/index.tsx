import React from "react";

import { useSelectedLayoutSegment } from "next/navigation";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
} from "@mui/icons-material";
import FlexBetween from "@/components/core/FlexBetween";
import { navItems } from "./navItems";
import useTheme from "@/hooks/useThemeWithCustomTS";

type IProps = {
  user: any;
  drawerWidth: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: any;
  isNonMobile: boolean;
};

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}: IProps) => {
  const [active, setActive] = React.useState("");
  const { theme } = useTheme();

  const segment = useSelectedLayoutSegment();

  console.log(segment);

  //   useEffect(() => {
  //     setActive(pathname.substring(1));
  //   }, [pathname]);

  return (
    <Box component="nav" sx={{ boxShadow: 3 }}>
      {
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
              boxShadow: 3,
            },
          }}
        >
          <Box width="100%" height="90%" sx={{ overflow: "auto" }}>
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    DASHBOARD
                  </Typography>
                </Box>

                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <ChevronLeft />
                </IconButton>
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      //   onClick={() => {
                      //     navigate(`/${lcText}`);
                      //     setActive(lcText);
                      //   }}
                      sx={{
                        backgroundColor:
                          segment === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          segment === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            segment === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box
            position="absolute"
            bottom="0"
            width="100%"
            paddingBottom="2rem"
            sx={{ backgroundColor: "#1c234d", zIndex: 5 }}
          >
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box display="flex">
                <Box
                  component="img"
                  alt="profile"
                  src="/assets/image.jpg"
                  height="40px"
                  width="40px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
                <Box marginLeft="1rem" textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.9rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {user?.name}
                  </Typography>
                  <Typography
                    fontSize="0.8rem"
                    sx={{ color: theme.palette.secondary[200] }}
                  >
                    {user?.occupation}
                  </Typography>
                </Box>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      }
    </Box>
  );
};

export default Sidebar;
