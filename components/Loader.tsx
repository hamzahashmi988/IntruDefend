import React from "react";
import { ActivityIndicator, ViewStyle } from "react-native";

type LoaderProps = {
  size?: number;
  color?: string;
  style?: ViewStyle;
};

const Loader: React.FC<LoaderProps> = (props) => {
  const { size = 15, style, color } = props;
  return <ActivityIndicator size={size} color={color} style={style} />;
};

export { Loader };
