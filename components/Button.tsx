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
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  fontSize?: number;
  containerStyles?: FlexStyle | Array<FlexStyle> | ViewStyle | Array<ViewStyle>;
  primary?: boolean;
};

const Button: React.FC<ButtonProps> = (props) => {
  const {
    isLoading = false,
    title = "Submit",
    onPress = () => {},
    disabled = false,
    fontSize = 18,
    containerStyles = {},
    primary = true,
  } = props;

  return (
    <TouchableOpacity
      style={[styles.container(primary), containerStyles]}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <Loader size={30} />
      ) : (
        <Text size={fontSize} semiBold color="white" letterSpacing={0.36}>
          {title}
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
