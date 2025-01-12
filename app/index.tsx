import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{

      }}
    >
      <Text style={styles.title}>INTRUDEFEND</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/sign-in')}>
   
    
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      
    </View>
  );
}
export const options = {
  headerShown: false,
};
const styles = StyleSheet.create({
  
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    padding: 10,
    marginTop:120
  },

  button: {
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 200,
    textAlign: 'center',
    marginHorizontal: 60,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  

});
