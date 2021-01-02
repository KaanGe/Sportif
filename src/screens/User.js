import React, { useState, useEffect } from "react";
import firebase from 'firebase';
import { Text, StyleSheet, View, Button, TouchableOpacity, } from "react-native";
import Spinner from "../components/Spinner"
import Reminder from "../components/Reminder";

export default function User() {

    const currentUser = firebase.auth().currentUser;
    if(!currentUser)
    {
      return <Text>Giris yapilmadi</Text>
    }

    const [user, setUser] = useState({  name: '', balance:0, })
    const [isLoading, setIsLoading] = useState(true)

    const userTable = firebase.firestore().collection('users').doc(currentUser.uid)

    useEffect(() => {
        userTable.get().then(function (doc) {
            if (doc.exists) {
                setUser(doc.data());
                setIsLoading(false);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

    }, []);


    if(isLoading){
        return <Spinner />;
    }
    return (

        <View>
            <Text style={styles.textStyle}>Merhaba {user.name}</Text>
            <Text style={styles.textStyle}>Kalan Giriş Hakkınız {'\n\n'}{user.balance}</Text>
            <Reminder/>
        </View>

    )
};

const styles = StyleSheet.create({
    textStyle: {
        alignSelf: 'center',
        textAlign:'center',
        color: '#007aff',
        fontSize: 34,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
      },
});