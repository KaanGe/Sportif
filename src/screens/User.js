import React, { useState, useEffect } from "react";
import firebase from 'firebase';
import { Text, StyleSheet, View, Button, TouchableOpacity, Alert, Switch } from "react-native";
import Spinner from "../components/Spinner"
import { setLocal_reminderData, getLocal_reminderData } from "../utils/local_storage";
import { setNotification, cancelNotification } from "../utils/push_notification";
import NumericInput from "react-native-numeric-input";

export default function User() {

    const currentUser = firebase.auth().currentUser;
    if(!currentUser)
    {
      return <Text>Giris yapilmadi</Text>
    }

    const [user, setUser] = useState({  name: '', balance:0, })
    const [isLoading, setIsLoading] = useState(true)
    const [hour, setHour] = useState(18)
    const [minute, setMinute] = useState(59)
    const [isEnabled, setIsEnabled] = useState(false);
    const [isDisabledButton, setisDisabledButton] = useState(false);

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

        setHour(getLocal_reminderData().hour ? getLocal_reminderData().hour : 9);
        setHour(getLocal_reminderData().hour ? getLocal_reminderData().hour : 0);
    }, []);

    const toggleSwitch=()=>{
        setIsEnabled(!isEnabled);
        if(isEnabled)
        {           
            cancelNotification();
        }
    }

    const setReminder=()=>{
        setLocal_reminderData({hour:hour, minute:minute});
        setNotification(hour,minute);
        setisDisabledButton(true);
        Alert.alert(`Hatırlatıcı ${hour}:${minute} şeklinde ayarlandı`);
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
                <NumericInput value={hour}
                    onChange={text=>{setHour(text); 
                                    setisDisabledButton(false)}}
                    minValue={0}
                    maxValue={23}
                    valueType='integer'
                    type='up-down'/>
                <NumericInput value={minute}
                    onChange={text=>{setMinute(text)
                                    setisDisabledButton(false)}}
                    minValue={0}
                    maxValue={59}
                    valueType='integer'
                    type='up-down'
                    />

                <Button disabled={isDisabledButton} onPress={setReminder}  title="ayarla"/>

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