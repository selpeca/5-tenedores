import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from './src/navigation/AppNavigation';
import { initFirebase } from './src/utils/firebase';
import Toast from 'react-native-toast-message'

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
      <Toast/>
    </>
  );
}