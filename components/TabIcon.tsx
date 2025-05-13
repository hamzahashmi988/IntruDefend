import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TabIconProps {
  focused: boolean;
  title: string;
  children: ReactNode;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, title, children }) => {
  return (
    <View style={styles.container}>
      {children}
      <View style={{ height: 2 }} />
      <Text style={[styles.label, focused && styles.labelFocused]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 2,
    minWidth: 55,
    minHeight: 54,
  },
  label: {
    fontSize: 10,
    color: '#A0A0A0',
    marginTop: 6,
    textAlign: 'center',
    fontWeight: '600',
  },
  labelFocused: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TabIcon;
