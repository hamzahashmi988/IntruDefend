import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator, Modal, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { onChildAdded, ref, get, child } from "firebase/database";
import { database } from '../../../../firebase';

interface Alert {
  id?: string;
  type: string;
  title: string;
  body: string;
  timestamp: number;
  location?: string;
  status?: string;
  email: string;
}

interface JwtPayload {
  email: string;
}

function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newAlert, setNewAlert] = useState<Alert | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const fetchAlerts = async (email: string) => {
    console.log("🔄 fetchAlerts() called for:", email);
    try {
      const dbRef = ref(database);
      console.log("📡 Firebase ref created:", dbRef);
  
      const snapshot = await get(child(dbRef, 'alerts'));
      console.log("📦 Firebase snapshot received:", snapshot.exists());
  
      const alertsData = snapshot.val();
      console.log("📑 Raw alerts data:", alertsData);
  
      if (!alertsData) {
        console.log("⚠️ No alerts found in Firebase");
      }
  
      const alertsArray: Alert[] = alertsData
        ? Object.values(alertsData).filter((alert: any) => alert.email === email)
        : [];
  
      console.log(`✅ ${alertsArray.length} alert(s) matched the user email`);
      setAlerts(alertsArray.reverse());
    } catch (error) {
      console.error("❌ Error fetching Firebase alerts:", error);
    } finally {
      console.log("✅ Finished fetching alerts, setting loading to false");
      setLoading(false);
    }
  };
  

  const onRefresh = async () => {
    setRefreshing(true);
    console.log("🔁 Pull-to-refresh triggered");
    if (userEmail) await fetchAlerts(userEmail);
    setRefreshing(false);
  };

  const setupRealtimeListener = (email: string) => {
    console.log("📡 Setting up realtime listener...");
    const alertsRef = ref(database, 'alerts');
    onChildAdded(alertsRef, (snapshot) => {
      const alert: Alert = snapshot.val();
      console.log("📥 New alert added:", alert);
      if (alert.user_id === email) {
        console.log("📨 Alert matches user email, showing modal...");
        setNewAlert(alert);
        setModalVisible(true);
        setAlerts(prev => [alert, ...prev]);
      }
    });
  };

  useEffect(() => {
    const init = async () => {
      console.log("🚀 Component mounted, initializing...");
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        console.log("🔐 JWT Token found",token);
        try {
          const decoded = jwtDecode<JwtPayload>(token);
          console.log("📧 Email decoded from JWT:", decoded.sub);
          setUserEmail(decoded.sub);
          await fetchAlerts(decoded.sub);
          setupRealtimeListener(decoded.sub);
        } catch (err) {
          console.error("❌ Error decoding JWT token:", err);
        }
      } else {
        console.warn("⚠️ No token found in AsyncStorage");
        setLoading(false);
      }
    };
    init();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.header}>Alerts</Text>

        {loading ? (
          <View style={styles.centerContent}>
            <ActivityIndicator size="large" color="#007BFF" style={{ marginBottom: 16 }} />
            <Text style={styles.emptyText}>Loading alerts...</Text>
          </View>
        ) : alerts.length === 0 ? (
          <View style={styles.centerContent}>
            <MaterialIcons name="notifications-none" size={64} color="#E0E0E0" />
            <Text style={styles.emptyText}>No alerts to display</Text>
          </View>
        ) : alerts.map((alert, index) => {
          let borderColor = '#007BFF';
          let iconName: React.ComponentProps<typeof MaterialIcons>["name"] = 'notifications';
          let iconColor = '#007BFF';
          if (alert.type === 'unauthorized_access') {
            borderColor = '#FF4444';
            iconName = 'error-outline';
            iconColor = '#FF4444';
          } else if (alert.type === 'external_notification') {
            borderColor = '#FFA500';
            iconName = 'warning';
            iconColor = '#FFA500';
          }
          return (
            <View key={index} style={[styles.card, { borderLeftColor: borderColor }]}>
              <View style={styles.cardHeader}>
                <MaterialIcons name={iconName} size={28} color={iconColor} style={{ marginRight: 10 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{alert.title}</Text>
                  <Text style={styles.cardMeta}>{new Date(alert.timestamp).toLocaleString()}</Text>
                </View>
                {alert.status && (
                  <View style={[styles.statusBadge, { backgroundColor: alert.status === 'sent' ? '#E0F7FA' : '#FDECEA' }]}>
                    <Text style={[styles.statusText, { color: alert.status === 'sent' ? '#007BFF' : '#FF4444' }]}>{alert.status}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.cardText}>{alert.body}</Text>
              {alert.location && (
                <Text style={styles.cardLocation}>Location: {alert.location}</Text>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* Modal for new alert */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <MaterialIcons name="notification-important" size={36} color="#007BFF" style={{ marginBottom: 10 }} />
            <Text style={styles.modalTitle}>{newAlert?.title}</Text>
            <Text style={styles.modalBody}>{newAlert?.body}</Text>
            {newAlert?.location && <Text style={styles.modalLocation}>Location: {newAlert.location}</Text>}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8f9fa' },
  container: { flex: 1, padding: 15 },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 18, color: '#22223B', letterSpacing: 0.5 },
  card: {
    backgroundColor: 'white', borderRadius: 14, padding: 16, marginBottom: 18,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14, shadowRadius: 8, elevation: 4, borderLeftWidth: 5,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#22223B', marginBottom: 2 },
  cardMeta: { fontSize: 12, color: '#888', marginTop: 2 },
  cardText: { fontSize: 15, color: '#444', marginBottom: 6 },
  cardLocation: { fontSize: 13, color: '#007BFF', marginTop: 2, fontStyle: 'italic' },
  statusBadge: { borderRadius: 16, paddingHorizontal: 10, paddingVertical: 3, alignSelf: 'flex-start', marginLeft: 8 },
  statusText: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase' },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 50 },
  emptyText: { fontSize: 17, color: '#bbb', marginTop: 12, fontWeight: '500' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: 'white', borderRadius: 14, padding: 24, width: '85%', alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#22223B', marginBottom: 6 },
  modalBody: { fontSize: 15, color: '#444', marginBottom: 8, textAlign: 'center' },
  modalLocation: { fontSize: 13, color: '#007BFF', fontStyle: 'italic', marginBottom: 12 },
  modalButton: { backgroundColor: '#007BFF', borderRadius: 8, paddingHorizontal: 20, paddingVertical: 10 },
  modalButtonText: { color: 'white', fontWeight: '600' },
});

export default Alerts;
