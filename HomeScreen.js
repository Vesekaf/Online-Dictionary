import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';


export default class App extends React.Component {
  

  constructor(){

    super();
    this.state = {

      text: '', 
      isSearchPressed: false, 
      isLoading: false,
      word: 'Loading...', 
      lexicalCategory: '', 
      definition: ''

    }


  }


  getWord = (word) => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    return fetch(url)
    
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        console.log(response);
        var word = response[0].word;
        var definition = response[0].meanings[0].definitions[0].definition;
        var lexicalCategory = response[0].meanings[0].partOfSpeech
        var example = response[0].meanings[0].definitions[0].example
      
        this.setState({
          word: word.trim(),
          definition: definition.trim(),
          lexicalCategory:lexicalCategory,
          examples:example
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>

        <View style = {styles.headerStyle}>

          <Text style = {styles.headerTxtStyle}> English Dictionary </Text>

        </View>
       
        <TextInput
            style = {styles.inputBox}
            onChangeText = {text => {

                this.setState({

                    text: text, 

                })
            }}

            value = {this.state.text}
        />

        <TouchableOpacity
            style = {styles.goButton}
            onPress = {() =>{

              this.setState({ isSearchedPressed: true });
              this.getWord(this.state.text);

            }}

        ><Text style = {styles.buttonText}>Define</Text></TouchableOpacity>

            <View  style = {styles.detailsContainer}>

                <Text style = {styles.detailTitle}>
                   Word: {" "}
                </Text>

                <Text style = {{fontSize: 20}}>
                   {this.state.word}
                </Text>


            </View>

             
            <View  style = {styles.detailsContainer}>

                <Text style = {styles.detailTitle}>
                   Type: {" "}
                </Text>

                <Text style = {{fontSize: 20}}>
                   {this.state.lexicalCategory}
                </Text>


            </View>

            <View  style = {{ flexDirection: 'row', flexWrap: 'wrap'}}>

                <Text style = {styles.detailTitle}>
                   Definition: {" "}
                </Text>
                
                <Text style = {{fontSize: 20}}>
                   {" " + this.state.definition}
                </Text>


            </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: 'orange',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  imageIcon: {
    width: 150,
    height: 150,
    marginLeft: 95,
  }, 
  detailContainer: {

    flex: 1,
    backgroundColor: '#b8b8b8',
    alignItems: 'center', 

  }, 
  detailsTitle: {
      
    alignSelf: 'center', 
    textAlign: 'center', 
    fontSize: 50,

  }, 
  headerStyle: {

      backgroundColor: 'blue', 
      height: 100,

  }, 
  headerTxtStyle: {

    color: 'white', 
    fontSize: 50, 
    textAlign: 'center', 
    justifyContent: 'center', 
    marginTop: '1%', 


  }
});
