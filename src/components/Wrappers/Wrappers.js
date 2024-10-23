import React from "react";
import { Badge as BadgeBase, Typography as TypographyBase, Button as ButtonBase } from "@mui/material";
import { styled } from "@mui/system";
import clsx from "clsx";

// Custom Badge using styled API
const Badge = styled(BadgeBase)(({ theme, colorBrightness, color }) => ({
  fontWeight: 600,
  height: 16,
  minWidth: 16,
  backgroundColor: getColor(color, theme, colorBrightness),
}));

// Custom Typography component using sx prop
function Typography({ children, weight, size, colorBrightness, color, family, ...props }) {
  return (
    <TypographyBase
      sx={{
        color: (theme) => getColor(color, theme, colorBrightness),
        fontWeight: getFontWeight(weight),
        fontSize: (theme) => getFontSize(size, props.variant, theme),
        fontFamily: family,
      }}
      {...props}
    >
      {children}
    </TypographyBase>
  );
}

// Custom Button component using styled API
const StyledButton = styled(ButtonBase)(({ theme, color, bgColor }) => ({
  color: getColor(color, theme),
  backgroundColor: getColor(bgColor, theme),
  "&:hover": {
    backgroundColor: getColor(bgColor, theme),
  },
  "&.MuiButton-contained": {
    boxShadow: theme.customShadows.widget,
    "&:hover": {
      boxShadow: theme.customShadows.widgetWide,
    },
  },
  "&.MuiButton-outlined": {
    borderColor: getColor(color, theme),
  },
}));

function Button({ children, color, bgColor, className, ...props }) {
  return (
    <StyledButton
      {...props}
      className={clsx({ select: props.select }, className)}
    >
      {children}
    </StyledButton>
  );
}

export { Badge, Typography, Button };

// Helper functions
function getColor(color, theme, brightness = "main") {
  return theme.palette[color]?.[brightness];
}

function getFontWeight(weight) {
  switch (weight) {
    case "light":
      return 300;
    case "medium":
      return 500;
    case "bold":
      return 600;
    default:
      return 400;
  }
}

function getFontSize(size, variant = "", theme) {
  const multiplier = {
    xs: 0.5,
    sm: 0.8,
    md: 1.2,
    l: 1.5,
    xl: 1.7,
    xxl: 2,
  }[size] || 1;

  const defaultSize =
    variant && theme.typography[variant]?.fontSize
      ? theme.typography[variant].fontSize
      : theme.typography.fontSize;

  return `calc(${defaultSize}px * ${multiplier})`;
}
