import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import CryptoJS from 'react-native-crypto-js';
import JailMonkey from 'jail-monkey';
import axios from 'axios';

import {SECRET_KEY} from '@env';

import hacker from '../../assets/hacker.png';



function App() {
  const [password, setPassword] = useState('');
  const [passwordEncrypted, storedPasswordEncrypted] = useState('');

  // if (JailMonkey.isJailBroken()) {
  //   BackHandler.exitApp();
  // }


  function encriptPassword() {
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      SECRET_KEY,
    ).toString();

    storedPasswordEncrypted(encryptedPassword);

    console.log(encryptedPassword, 'encryptedPassword');
  }

  function descriptPassword() {
    const decryptedPassword = CryptoJS.AES.decrypt(
      passwordEncrypted,
      SECRET_KEY,
    ).toString(CryptoJS.enc.Utf8);

    console.log(decryptedPassword, 'decryptedPassword');
  }

  async function loadUser() {
    const response = await axios.get('https://api.github.com/users/mensinho');
    console.log(response.data);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={hacker} style={styles.logo} />
      <TextInput
        placeholder="Digite uma senha"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={() => encriptPassword()}>
        <Text style={styles.buttonTitle}>Criptografar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => descriptPassword()}>
        <Text style={styles.buttonTitle}>Descriptografar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Senha descriptografada</Text>
      <Text style={styles.text}>{password}</Text>

      <Text style={styles.title}>Senha encriptada</Text>
      <Text>{passwordEncrypted}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#303134',
    color: '#fff',
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'center',
    marginBottom: 30,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    width: '90%',
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#FFF',
    color: '#fff',
  },
  button: {
    marginTop: 20,
    borderRadius: 5,
    height: 45,
    width: '90%',
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 18,
    color: '#fff',
  },
  title: {
    marginVertical: 10,
    color: '#fff',
  },
});

export default App;
