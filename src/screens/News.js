import React, {Component} from "react";
import { View, StyleSheet, Text , SafeAreaView } from "react-native";
//import { SafeAreaView } from 'react-native-safe-area-context';

class News extends Component {


  render(){
    const {
      title,
      description,
      publishedAt,
      source,
      urlToImage,
      url}=this.props.route.params.item;
    return (
      <SafeAreaView style={styles.center}>
        <Text>{title}</Text>
      </SafeAreaView>
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
export default News;