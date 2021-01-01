import * as React from 'react';
import { Text, View, StyleSheet, Image, Platform} from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const title="Spor Zamani!";
const body="Spora 1 saat kaldi";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export function setNotification(hour,minute) {
  //const [token, setToken] = React.useState(null);
    let token='';

    registerForPushNotificationsAsync().then(res=>{
        token=res;
    });

    Notifications.cancelAllScheduledNotificationsAsync();
    scheduleNotification(hour,minute);
}

export function cancelNotification()
{
  Notifications.cancelAllScheduledNotificationsAsync();
}


function scheduleNotification(hour, minute) {
  Notifications.scheduleNotificationAsync({
    content: {
      title:title,
      body:body,
    },
    trigger: {
      hour,
      minute,
      repeats: true,
    }
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [250, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

