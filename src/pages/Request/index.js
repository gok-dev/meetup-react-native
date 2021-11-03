import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {API_URL, API_KEY} from '@env';

function RequestScreen() {
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    try {
      const response = await axios.get(API_URL, {
        headers: {'app-id': API_KEY},
      });

      setUsers(response.data.data);
    } catch (err) {
      alert('Não foi possível completar a request');
    }
  }

  function Itens({firstName, lastName, picture}) {
    return (
      <TouchableOpacity style={styles.userView}>
        <Image style={styles.image} source={{uri: picture}} />
        <Text style={styles.text}>{`${firstName} ${lastName}`}</Text>
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {users.map(user => (
        <Itens key={user.id} {...user} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303134',
    padding: 10,
    paddingTop: 70,
  },
  userView: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
    padding: 12,
    backgroundColor: '#212121',
    borderRadius: 6,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  text: {
    color: '#fff',
    marginTop: 10,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RequestScreen;
