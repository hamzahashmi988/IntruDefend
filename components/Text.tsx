import React from "react";
import { Text as RNText, StyleSheet, TextStyle, TextProps } from "react-native";

export type TextComponentProps = {
  regular?: boolean;
  medium?: boolean;
  bold?: boolean;
  boldItalic?: boolean;
  extraBold?: boolean;
  extraLight?: boolean;
  extraLightItalic?: boolean;
  extraBoldItalic?: boolean;
  italic?: boolean;
  light?: boolean;
  lightItalic?: boolean;
  semiBoldItalic?: boolean;
  semiBold?: boolean;
  thin?: boolean;
  thinItalic?: boolean;
  urbanistSemiBold?: boolean;
  centered?: boolean;
  end?: boolean;
  right?: boolean;
  inverse?: boolean;
  underlined?: boolean;
  textProps?: TextProps;
  color?: string;
  size?: number;
  leftSpacing?: number;
  rightSpacing?: number;
  topSpacing?: number;
  bottomSpacing?: number;
  letterSpacing?: number;
  style?: TextStyle;
  width?: number | undefined;
  children?:
    | string
    | string[]
    | ((t: (value: string, options?: unknown) => string) => string);
  opacity?: number;
  capitalize?: boolean;
  strikeThrough?: boolean;
  weight?: number;
};

const Text: React.FC<TextComponentProps> = (props) => {
  const {
    centered,
    end,
    right,
    underlined,
    textProps,
    color,
    opacity,
    size,
    capitalize,
    leftSpacing,
    rightSpacing,
    topSpacing,
    bottomSpacing,
    letterSpacing,
    strikeThrough,
    children,
    width = undefined,
    style = {},
    weight,
  } = props;

  const renderChildren = () => {
    if (Array.isArray(children)) {
      return children.map((item) => {
        return typeof item === "function" ? item(t) : item;
      });
    } else return typeof children === "function" ? children(t) : children;
  };

  return (
    <RNText
      style={[
        centered && styles.centered,
        end && styles.alignEnd,
        right && styles.right,
        underlined && styles.underlined,
        strikeThrough && styles.strikeThrough,
        !!color && { color },
        !!opacity && { opacity },
        !!size && { fontSize: size },
        !!weight && { fontWeight: weight },
        !!capitalize && styles.capitalize,
        !!leftSpacing && { marginLeft: leftSpacing },
        !!rightSpacing && { marginRight: rightSpacing },
        !!topSpacing && { marginTop: topSpacing },
        !!bottomSpacing && { marginBottom: bottomSpacing },
        !!letterSpacing && { letterSpacing: letterSpacing },
        !!width && { width: width },
        style,
      ]}
      {...textProps}
    >
      {renderChildren()}
    </RNText>
  );
};

const styles = StyleSheet.create<any>({
  default: (isDarkTheme: boolean) => ({
    fontSize: 16,
  }),
  centered: {
    textAlign: "center",
  },
  alignEnd: {
    alignSelf: "flex-end",
  },
  right: {
    textAlign: "right",
  },
  underlined: {
    textDecorationLine: "underline",
  },
  capitalize: {
    textTransform: "capitalize",
  },
  strikeThrough: {
    textDecorationLine: "line-through",
  },
});

export { Text };
