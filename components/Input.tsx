import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ImageSourcePropType,
  FlexStyle,
  KeyboardType,
  I18nManager,
} from "react-native";

import { Text } from "../components/Text";
import { Icon } from "../components/Icon";

type InputProps = {
  value: string;
  icon?: ImageSourcePropType;
  iconColor?: string;
  placeholder: string;
  label?: string;
  error?: string;
  containerStyles?: FlexStyle | Array<FlexStyle>;
  inputStyles?: FlexStyle | Array<FlexStyle>;
  wrapperStyles?: FlexStyle | Array<FlexStyle>;
  onChange?: (text: string) => void;
  secureText?: boolean;
  onBlur?: () => void;
  keyboardType?: KeyboardType;
};

const Input: React.FC<InputProps> = (props) => {
  const {
    value = "",
    icon = null,
    iconColor,
    placeholder,
    label = "",
    error = "",
    containerStyles = {},
    inputStyles = {},
    wrapperStyles = {},
    onChange = () => { },
    secureText = false,
    onBlur = () => { },
    keyboardType = "default",
  } = props;

  const [showField, setShowField] = useState<boolean>(secureText);

  const renderLockIcon = () => {
    if (secureText) {
      return (
        <Icon
          width={15}
          height={14}
          onPress={() => setShowField(!showField)}
          source={
            showField
              ? require("../assets/eye-closed.png")
              : require("../assets/eye-open.png")
          }
        />
      );
    }
    return null;
  };

  return (
    <View style={[styles.wrapper, containerStyles]}>
      {!!label && (
        <Text
          regular
          size={14}
          bottomSpacing={10}
          letterSpacing={0.28}
          medium
          style={{ ...(I18nManager.isRTL && { textAlign: "left" }) }}
        >
          {(t) => t(label)}
        </Text>
      )}

      <View style={[styles.container(), wrapperStyles]}>
        {!!icon && (
          <Icon
            width={15}
            height={15}
            source={icon}
            {...(iconColor && { color: iconColor })}
            containerStyles={styles.ml15}
          />
        )}

        <TextInput
          style={[styles.input(), inputStyles]}
          placeholder={placeholder}
          onChangeText={onChange}
          value={value}
          placeholderTextColor="#007BFF"

          secureTextEntry={showField}
          onBlur={onBlur}
          keyboardType={keyboardType}
          textAlign={!I18nManager.isRTL ? undefined : "right"}
        />
        {renderLockIcon()}
      </View>
      {Boolean(error) && (
        <Text
          color={"red"}
          regular
          size={14}
          style={{ ...(I18nManager.isRTL && { textAlign: "left" }) }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create<any>({
  wrapper: {
    borderRadius: 8,
  },
  container: (color: string, isDarkTheme: boolean) => ({
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 23,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 6,
  }),
  input: (color: string) => ({
    fontSize: 16,
    flex: 1,
    height: 46,
    marginLeft: 15,
    color: color,
  }),
  icon: {
    width: 14,
    height: 14,
  },
  ml15: {
    marginLeft: 15,
  },
});

export { Input };
