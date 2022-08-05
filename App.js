import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import { StatusBar } from 'expo-status-bar'
import Home from './Home';

export default function App() {
  return (
    <View style={{
      backgroundColor: '#fff',
      flex: 1
    }}>
      <Home/>
      <StatusBar style='auto' backgroundColor='#fff'/>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
