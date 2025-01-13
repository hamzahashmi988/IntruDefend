import { Text, StyleSheet, View, TouchableOpacity,Image ,  } from "react-native";
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import bg from "../assets/bg-shape.png"



export default function Index() {
  const router = useRouter();

  return (
  <View style={styles.container}>
                  <Image source={bg} resizeMode='stretch' style={{ position: "absolute", width: 250, height: 160 }} />
      
      <Text style={styles.title}>INTRUDEFEND</Text>

      {/* logo will be here... */}

      <TouchableOpacity style={styles.button} onPress={() => router.push('/sign-in')}>
   
    
        <Text style={styles.buttonText}>Get Started </Text>
      </TouchableOpacity>

      
    </View>
  );
}
export const options = {
  headerShown: false,
};
const styles = StyleSheet.create({
  

  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f9fa',
    
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    padding: 10,
    marginTop:280
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
