import { View, Text, TouchableOpacity,Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Header } from './PostScreen';
import axios from 'axios';
import api from '../services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({navigation,route}) {
  // console.log(route.params?.name)
  // const navigation = useNavigation();
  const [user] = useState(route.params)
  // console.log(user)
  // console.log(user.business_auth)
  const [token, settoken] = useState('')
  useState(async () => { settoken(await AsyncStorage.getItem('token')) })
  // console.log(token)

  // const logout = async () => {
  //   await axios.post(`${api.baseURL}/logout`, {}, {
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //     }
  //   }
  //   ).then(async res => {
  //     console.log(res.data)
  //     await AsyncStorage.removeItem('token')
  //     navigation.navigate('Loading')
  //   }).catch(e => {
  //     console.log(e)
  //   })
  // }
  return (
    <View style={{ flex: 1 }}>
      <Header user={user}/>
      <View style={{ flex: 8 }}></View>
    </View>
  )
}