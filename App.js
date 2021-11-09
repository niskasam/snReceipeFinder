import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, Image, Pressable} from 'react-native';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [meals, setMeals] = useState([]);

  const getMeals = () => {fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
  .then(response => response.json())
  .then( responseJSON => {
    setMeals(responseJSON.meals)})
  .catch(error => { Alert.alert('Error', error); }); 
  }

  const listSeparator = () => {
    return (
      <View
      style={{
          height: 2,
          width: "95%",
          backgroundColor: "#9B969C",
      }}
      />
    );
  };

  return (
    <View style={styles.container}>

    <TextInput
    style={styles.input}
    placeholder='Search meals by ingredient'
    onChangeText={ text=> setKeyword(text) } />

     <Pressable
     style={styles.btnContainer}
     onPress={getMeals}>
     <Text
     style={styles.btn}>Find meal</Text>
     </Pressable>

     <View style={styles.listContainer}>
     <FlatList
     style={styles.list}
     ItemSeparatorComponent={listSeparator}
     keyExtractor={(item,  index) => index.toString()}
     data={meals}
     renderItem={({item}) =>
     <View>
       <Text style={styles.text}>{item.strMeal}</Text>
       <Text><Image
          style={styles.image}
          source={{uri:`${item.strMealThumb}/preview`}}
              // source = {{uri: 'https://www.themealdb.com//images/media/meals/llcbn01574260722.jpg/preview'}}
          /></Text>
     </View>
      }
     
     />
     </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:80,
    
    
  },
  image: {
    width: 100,
    height: 60,
  },
  input:{
    textAlign:'center',
    height: "8%",
  },

  btnContainer:{
    alignItems:'center',
    justifyContent:'center',
  },

  btn:{
    color: 'white',
    width: "80%",
    backgroundColor: 'green',
    textAlign:'center',
    height: 50,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
  },

  listContainer:{
    marginLeft: 10,
    flex: 2,
  },

  list:{
    marginTop: 30,
  },

  text:{
    fontSize: 16,
    fontWeight: 'bold',
  }

});

