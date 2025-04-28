import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  FlexStyle,
  ViewStyle,
} from "react-native";

import { Text } from "./Text";
import { Loader } from "./Loader";

type ButtonProps = {
  isLoading?: boolean;
  loading?: boolean;
  title?: string;
  label?: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  fontSize?: number;
  style?: FlexStyle | Array<FlexStyle> | ViewStyle | Array<ViewStyle>;
  containerStyles?: FlexStyle | Array<FlexStyle> | ViewStyle | Array<ViewStyle>;
  primary?: boolean;
};

const Button: React.FC<ButtonProps> = (props) => {
  const {
    isLoading = false,
    loading = false,
    title,
    label = "Submit",
    onPress = () => {},
    disabled = false,
    fontSize = 18,
    style = {},
    containerStyles = {},
    primary = true,
  } = props;

  const buttonText = title || label;

  return (
    <TouchableOpacity
      style={[styles.container(primary), containerStyles, style]}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isLoading || loading || disabled}
      className=""
    >
      {(isLoading || loading) ? (
        <Loader size={30} />
      ) : (
        <Text size={fontSize} semiBold color="white" letterSpacing={0.36}>
          {buttonText}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create<any>({
  container: (bool: boolean, AppTheme: Record<string, any>) => ({
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007BFF",
  }),
});

export default Button;
