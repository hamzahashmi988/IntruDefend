import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';

import { LocationService } from '../../../../services/api/location.service';

const INITIAL_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

type ApiLocationType = {
  lat: number;
  long: number;
  timestamp: string;
};

const LiveLocationScreen: React.FC = () => {
  const [location, setLocation] = useState<ApiLocationType | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const mapRef = useRef<MapView>(null);

  const fetchLocation = async () => {
  try {
    setLoading(true);
    const locationService = LocationService.getInstance();
    const response = await locationService.getLocation();

    if (response.status === 'error') {
      Alert.alert('Error', response.message || 'Failed to fetch location');
      return;
    }

    const loc = response  ;
    console.log("response", response)
    const data: ApiLocationType = {
      lat: loc.lat,
      long: loc.long,
      timestamp: loc.timestamp,
    };
    setLocation(data);
    if (mapRef.current && data.lat && data.long) {
      mapRef.current.animateToRegion({
        latitude: data.lat,
        longitude: data.long,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  } catch (error: any) {
    console.error('Error fetching location:', error);
    Alert.alert('Error', error?.message || 'Failed to fetch location');
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};

  useEffect(() => {
    fetchLocation();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchLocation();
  };

  const lat = location?.lat;
  const lon = location?.long;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <Button
          title={refreshing ? 'Refreshing...' : 'Refresh'}
          onPress={onRefresh}
          disabled={refreshing}
          style={styles.refreshButton}
        />
      </View>
      <View style={styles.container}>
        {loading || !lat || !lon ? (
          <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 40 }} />
        ) : (
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: lat,
              longitude: lon,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            region={{
              latitude: lat,
              longitude: lon,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{ latitude: lat, longitude: lon }}
              title="Live Location"
              description={`Lat: ${lat}, Long: ${lon}`}
              pinColor="#007BFF"
            />
          </MapView>
        )}
        {location?.timestamp && (
          <View style={styles.noteView}>
            <Text style={styles.noteText}>
              Location was updated on {new Date(location.timestamp).toLocaleString()}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 15,
    paddingBottom: 0,
  },
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 0,
  },
  map: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  refreshButton: {
    minWidth: 100,
  },
  noteView: {
    marginTop: 18,
    alignItems: 'center',
  },
  noteText: {
    fontSize: 15,
    color: '#555',
    fontStyle: 'italic',
  },
});

export default LiveLocationScreen;
