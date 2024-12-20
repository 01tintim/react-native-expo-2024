import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Alert, BackHandler, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../hooks/Auth';
import { router } from 'expo-router';
import { useState } from 'react';


export default function App() {
  const { signIn, signOut } = useAuth();
  const [email, setEmail] = useState("super@email.com");
  const [password, setPassword] = useState ("A123456a!");
  const [passwordVisible, setPasswordVisible] = useState (false);

  const toooglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEntrarSuper = async () => {
    try {
      await signIn({ email, password })
    } catch (error) {
      Alert.alert("Erro", error.message)
      console.log(error)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplicativo pronto para usar</Text>
      <View style={styles.inputbox}>
        <Ionicons name="mail-open-outline" size={20} color="black" />
        <TextInput style={styles.emailinput} placeholder="e-mail" value={email} onChangeText={setEmail}/>
        </View>

        <View style={styles.inputbox}>
        <Ionicons name="lock-closed" size={20} color="black" />
        <TextInput style={styles.emailinput} placeholder="senha" value={password} onChangeText={setPassword} secureTextEntry={passwordVisible}/>
        <Ionicons name={passwordVisible ? "eye-off-outline" : "eye-outline"} size={20} color="black" onPress={toooglePasswordVisibility}/>
        </View>
      <Button style={styles.button} title="Entrar"
        onPress={handleEntrarSuper} />

      <Button title="Sobre" onPress={() => router.push("/about")} />
      <Button title="Sair do Aplicativo" onPress={() => BackHandler.exitApp()} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  title: {
    fontFamily: "italic",
    fontSize: 20,
  },
  inputbox: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 40,
    marginVertical: 10,
    alignItems: "center",
  },
  emailinput: {
    flex: 1,
    fontFamily: "regular",
    fontSize: 20,
  },
  button: {
    width: '100%',
  }
});
