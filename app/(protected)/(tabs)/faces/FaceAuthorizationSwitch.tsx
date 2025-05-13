import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, ActivityIndicator } from 'react-native';
import { FaceService } from '../../../../services/api/face.service';

interface FaceAuthorizationSwitchProps {
  faceId: string;
  isAuthorized: boolean;
  onStatusChange: (newStatus: boolean) => void;
}

const FaceAuthorizationSwitch: React.FC<FaceAuthorizationSwitchProps> = ({ faceId, isAuthorized, onStatusChange }) => {
  const [switchValue, setSwitchValue] = useState(isAuthorized);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const faceService = FaceService.getInstance();
      await faceService.updateAuthorization(faceId, !switchValue);
      setSwitchValue(!switchValue);
      onStatusChange(!switchValue);
    } catch (error: any) {
      // Optionally show error feedback
      // You can use Alert.alert here if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.switchContainer}>
      <Text style={styles.label}>{switchValue ? 'Authorized' : 'Not Authorized'}</Text>
      {loading ? (
        <ActivityIndicator size="small" color="#888" />
      ) : (
        <Switch
          value={switchValue}
          onValueChange={handleToggle}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
    fontSize: 14,
    color: '#333',
  },
});

export default FaceAuthorizationSwitch;
