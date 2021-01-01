import React, {Component} from "react";
import { View, Button, Text, StyleSheet , SafeAreaView, Alert, ActivityIndicator, FlatList } from "react-native";

import {getNews} from "../utils/news_api";
import Article from '../components/Article';
import { TouchableOpacity } from "react-native-gesture-handler";
//import { SafeAreaView } from 'react-native-safe-area-context';


class Home extends Component{
  constructor(props)
  {
    super(props);
    this.state = {
      isLoading:true,
      data:[]
    }
  }
  
  componentDidMount(){
    getNews().then(result=>{
      this.setState({
        isLoading:false,
        data:result
      })      
    }, err=>{
      Alert.alert("Haberler yuklenemedi");
    })
  }

  onPressArticle=(article)=>{
    const {navigation}=this.props;
    navigation.navigate('News',{})
  }

  render()
  {
    const navigation = this.props.navigation;

    return (
      <View style={styles.center}>
        {this.state.isLoading && <View>
          <ActivityIndicator animating={this.state.isLoading} />
        </View>}

        {!this.state.isLoading && <FlatList
          data={this.state.data}
          renderItem={({ item }) => <Article 
                                      article={item}           
                                      onPress={() => navigation.navigate('News', { item })} 
                                    />}
          keyExtractor={item => item.title}
          //refreshing={this.state.refreshing}
          //onRefresh={this.handleRefresh.bind(this)}
        />}
      </View>
    );
  }

};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Home;