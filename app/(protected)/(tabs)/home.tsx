import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state: any) => state.auth.user);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.name || "User"}!</Text>
      <Text style={styles.subtitle}>IntruDefend Dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
  },
});
