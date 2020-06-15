import React, { useState } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

export default function App() {

  const [response, setResponse] = useState('');

  const colocarComida = async (event) => {
    event.preventDefault();
    setResponse('');
    try {
      const res = await fetch('http://192.168.100.12:3000/', { mode: 'no-cors' });
      setResponse('Animal alimentado :)');
    } catch (ex) {
      console.log(ex)
      setResponse('Erro (:');
    }
  }

  return (
    <View style={styles.container}>
      <View style={{width: "50%"}}>
        <Button
          title="ALIMENTAR"
          onPress={colocarComida}
        />
        <Text style={{textAlign: 'center'}}>
          {response ? response : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
