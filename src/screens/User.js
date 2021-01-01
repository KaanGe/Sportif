import React, { useState, useEffect } from "react";
import firebase from 'firebase';
import { Text, StyleSheet, View, Button, TextInput, Alert, Switch } from "react-native";
import Spinner from "../components/Spinner"
import { getLocalItem, setLocalItem } from "../utils/local_storage";
import { setNotification, cancelNotification } from "../utils/push_notification";


export default function User() {

    const currentUser = firebase.auth().currentUser;
    if(!currentUser)
    {
      return <Text>Giris yapilmadi</Text>
    }

    const [user, setUser] = useState({  name: '', balance:0, })
    const [isLoading, setIsLoading] = useState(true)
    const [hour, setHour] = useState('')
    const [minute, setMinute] = useState('')
    const [isEnabled, setIsEnabled] = useState(false);

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


    }, [])

    toggleSwitch=()=>{
        setIsEnabled(previous => !previous);
        if(!isEnabled)
        {
            cancelNotification();
        }
    }

    setReminder=()=>{
        if(hour != '' && minute != '')
        {
            setLocalItem('reminder',{hour:hour, minute:minute});
            setNotification(hour,minute);
        }
    }

    if(isLoading){
        return <Spinner />;
    }
    return (

        <View>
            <Text style={styles.textStyle}>Merhaba {user.name}</Text>
            <Text style={styles.textStyle}>Kalan Giriş Hakkınız {'\n\n'}{user.balance}</Text>

            <Switch 
                value={isEnabled}
                onValueChange={toggleSwitch}
                />
            {isEnabled && <View> 
                <TextInput placeholder="Saat" onChangeText={text=>setHour(text)} 
                    value={getLocalItem('reminder').hour ? getLocalItem('reminder').hour : 18}/>

                <TextInput placeholder="Dakika" onChangeText={text=>setMinute(text)} 
                    value={getLocalItem('reminder').minute ? getLocalItem('reminder').minute : 59}/>

                <Button onPress={setReminder}  title="ayarla"/>
                <Button onPress={()=>{
                    getLocalItem('reminder').then(res=>{
                        Alert.alert(res.minute)
                    })}
                    }  title="oku"/> 
            </View>}
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