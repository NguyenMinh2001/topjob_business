import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator, FlatList, TextInput, Dimensions, StatusBar, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from '@expo/vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import * as Linking from 'expo-linking';
import api from '../services/ApiService'
import { Header,Status } from './PostScreen';
const io = require('socket.io-client')
// const token = AsyncStorage.getItem('token');
const Application = ({ item }) => {
  const navigation = useNavigation(); 
  return (
    <TouchableOpacity 
    delayPressIn = {500}
    style={{
      height: 250,
      width: 340,
      marginHorizontal: 5,
      marginBottom: 15,
      backgroundColor: '#fff',
      shadowOpacity: 0.9,
      elevation: 3,
      shadowColor: '#000',
      shadowRadius: 3,
      shadowOffset: { width: 0, height: 2 },
      borderRadius: 10
    }}>
      <View style={{flex: 1,margin: 10,borderBottomWidth: 0.8, borderColor: 'lightgray'}}>
      <View style={{flex: 1,flexDirection:'row'}}>
        <Image style={{height:40,width:40,marginRight:10,borderRadius:5}} source={{ uri: api.baseURL + '/image/' + item.user.avatar }}></Image>
        <View>
        <Text style={{fontWeight:'bold',fontSize:12}} numberOfLines={2}>{item.full_name}</Text>
        <Text style={{fontSize:12, justifyContent: 'center'}} numberOfLines={2}><Icon name='email' color={'gray'}/> {item.email}</Text>
        </View>
      </View>
      </View>
      <View style={{flex: 2 ,marginHorizontal: 10}}>
      <Text numberOfLines={1} style={{color:'gray',fontSize:12}}>Công việc: <Text  style={{color:'black',fontSize:12}}>{item.job.title}</Text></Text>
      <Text style={{color:'gray',fontSize:12}}>Ngày ứng tuyển: <Text style={{color:'black',fontSize:12}}>{new Date(item.created_at).toDateString()}</Text></Text>
      <Text style={{color:'gray',fontSize:12}}>Nguồn: <Text style={{color:'black',fontSize:12}}>{'ứng viên'}</Text></Text>
      <Text style={{color:'gray',fontSize:12}}>Vị trí ứng tuyển: <Text style={{color:'black',fontSize:12}}>{item.job.position}</Text></Text>
      <View style={{alignItems: 'center',marginTop: 5}}>
        <TouchableOpacity onPress={()=>{
          if(Linking.canOpenURL(item.resume)){
            Linking.openURL(item.resume);
          }
        }} style={{backgroundColor: 'royalblue', height: 40,width: 120,borderRadius: 10,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color: 'white'}}>Xem CV</Text>
        </TouchableOpacity>
      </View>
      
      </View>
      {/* <View style={{ flex: 1, flexDirection: 'row', padding: 10, }}>
        <View style={{ flex: 3, }}>
          <Text style={{ fontWeight: 'bold', fontSize:12 ,minHeight:20 }}></Text>
          <Text>#{item.id} </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 10 }}>{item.status}</Text>
        </View>
      </View>
      <View style={{ flex: 2, padding: 10 }}>
        <Text style={{ fontSize: 12, color: 'gray' }}>Loại hình công việc</Text>
        <Text style={{ fontSize: 13 }}></Text>
      </View> */}
    </TouchableOpacity>
  )
}
const WorkerScreen = ({route}) => {
  const navigation = useNavigation();
  const [WINDOW_HEIGHT] = useState(Dimensions.get('screen').height - StatusBar.currentHeight);
  const [user] = useState(route.params)
  const [focus, setFocus] = useState(1);
  const [info, setInfo] = useState(0);
  const [token, setToken] = useState('');
  const [applications, setApplication] = useState([]);
  const [temp_applications, setTempApplication] = useState([]);
  const [, set] = useState([]);
  const [loading, setLoading] = useState(true)
  useState(async () => { setToken(await AsyncStorage.getItem('token')) })
  const search_jobs = (value) => {
    const temp = [];
    for (let i = 0; i < applications.length; i++) {
      // con
      if (applications[i].full_name.indexOf(value) >= 0 || applications[i].job.title.indexOf(value) >= 0 ) {
        temp.push(applications[i]);
      }
    }
    setTempApplication(temp);
  }
  useEffect(() => {
    if (token != '') {
      axios.get(`${api.baseURL}/Business_info/${user.id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        }
      }).then(res => {
        setInfo(res.data)
      }).catch(e => {
        console.log(e)
      })

      axios.get(`${api.baseURL}/applications/jobs`, {
        headers: {
          authorization: `Bearer ${token}`,
        }
      }).then(res => {
        setApplication(res.data)
        setTempApplication(res.data)
        setLoading(false)
      }).catch(e => {
        console.log(e)
      })
    }
  }, [token]);
  // console.log(jobs)
  if (user.business_auth) {
    return (
      <View style={{ height: WINDOW_HEIGHT, backgroundColor: '#fff', }}>
        <Header user={user}></Header>

        <View style={{ flex: 8 }}>
          <View style={{ flex: 1, }}>
            {/* <View style={{ marginLeft: 20, flex: 1 }}>
              <FlatList
                horizontal
                // style={{}}
                showsHorizontalScrollIndicator={false}
                data={Statuses}
                renderItem={({ item }) => <Status title={item.title} id={item.id} focus={focus} ChoseStatus={ChoseStatus} />}
                keyExtractor={item => item.id}
              />
            </View> */}
            <View style={{ flex: 2, justifyContent: 'flex-start' }}>
              <Text style={{ marginLeft: 20, fontSize: 12 }}>Tìm kiếm:</Text>
              <View style={{
                backgroundColor: '#fff', height: 50, marginHorizontal: 20, flexDirection: 'row', alignItems: 'center', borderRadius: 20, shadowOpacity: 0.9,
                elevation: 3,
                shadowColor: '#000',
                shadowRadius: 3,
                shadowOffset: { width: 0, height: 2 },
              }}>
                <Icon style={{ marginLeft: 10 }} name='search' size={25} />
                <TextInput onChangeText={value => { search_jobs(value) }} placeholder='Theo tên ứng viên, tiêu đề công việc' style={{ flex: 1 }} />
              </View>
            </View>
          </View>
          <View style={{ flex: 7 }}>
            <View style={{ justifyContent: 'flex-start', paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 12 }}>{temp_applications.length} người ứng tuyển</Text>
            </View>
            <View style={{ flex: 11, backgroundColor: '#fff', alignItems: 'center' }}>
              {loading ? (<View>
                <View style={{
                  height: 150,
                  width: 340,
                  marginHorizontal: 5,
                  marginBottom: 15,
                  backgroundColor: '#fff',
                  shadowOpacity: 0.9,
                  elevation: 3,
                  shadowColor: '#000',
                  shadowRadius: 3,
                  shadowOffset: { width: 0, height: 2 },
                  borderRadius: 10
                }}>
                  <View style={{ flex: 1, flexDirection: 'row', padding: 10, }}>
                    <View style={{ flex: 3, }}>
                      <Text style={{ backgroundColor: 'lightgray', borderRadius: 10, marginBottom: 10, width: 250 }}></Text>
                      <Text style={{ backgroundColor: 'lightgray', borderRadius: 10, marginBottom: 10, width: 150 }}></Text>
                      <Text style={{ backgroundColor: 'lightgray', borderRadius: 10, width: 200 }}></Text>
                    </View>
                  </View>
                </View>
                <View style={{
                  height: 150,
                  width: 340,
                  marginHorizontal: 5,
                  marginBottom: 15,
                  backgroundColor: '#fff',
                  shadowOpacity: 0.9,
                  elevation: 3,
                  shadowColor: '#000',
                  shadowRadius: 3,
                  shadowOffset: { width: 0, height: 2 },
                  borderRadius: 10
                }}>
                  <View style={{ flex: 1, flexDirection: 'row', padding: 10, }}>
                    <View style={{ flex: 3, }}>
                      <Text style={{ backgroundColor: 'lightgray', borderRadius: 10, marginBottom: 10, width: 250 }}></Text>
                      <Text style={{ backgroundColor: 'lightgray', borderRadius: 10, marginBottom: 10, width: 150 }}></Text>
                      <Text style={{ backgroundColor: 'lightgray', borderRadius: 10, width: 200 }}></Text>
                    </View>
                  </View>
                </View>
                <View style={{
                  height: 150,
                  width: 340,
                  marginHorizontal: 5,
                  marginBottom: 15,
                  backgroundColor: '#fff',
                  shadowOpacity: 0.9,
                  elevation: 3,
                  shadowColor: '#000',
                  shadowRadius: 3,
                  shadowOffset: { width: 0, height: 2 },
                  borderRadius: 10
                }}>
                  <View style={{ flex: 1, flexDirection: 'row', padding: 10, }}>
                    <View style={{ flex: 3, }}>
                      <Text style={{ backgroundColor: 'lightgray', borderRadius: 10, marginBottom: 10, width: 250 }}></Text>
                      <Text style={{ backgroundColor: 'lightgray', borderRadius: 10, marginBottom: 10, width: 150 }}></Text>
                      <Text style={{ backgroundColor: 'lightgray', borderRadius: 10, width: 200 }}></Text>
                    </View>
                  </View>
                </View>
              </View>) : (
                // <></>
                <FlatList
                  data={temp_applications}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => <Application 
                  // title={item.title} id={item.id} status={item.status} styles={item.type} 
                  item={item} />}
                  keyExtractor={item => item.id}
                />
                )}
            </View>
            <View style={{ flex: 1 }} />
          </View>
        </View>
      </View>
    )

  } else {
    if (info === 0) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f3f6' }}>
          <ActivityIndicator size='large' color={'#FF6F00'} />
        </View>
      )
    } else {
      if (info == '') {
        return (
          <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', }}>
            <Image style={{ width: 300, height: 300, marginTop: 100 }} source={require('../../assets/update_info.png')} />
            <View style={{ justifyContent: 'center', alignItems: 'center', width: 300 }}>
              <Text> Vui lòng cập nhật thêm thông tin về doanh nghiệp trước khi đăng tin</Text>
            </View>
            <TouchableOpacity onPress={() => {
              navigation.navigate({ name: 'Update_Info', params: user })
            }} style={{ marginTop: 100, marginHorizontal: 100, backgroundColor: '#FF6F00', padding: 10, borderRadius: 10 }}>
              <Text style={{ color: 'white' }}>Cập nhật ngay</Text>
            </TouchableOpacity>
          </View>
        )
      } else {
        return (
          <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', }}>
            <Image style={{ width: 300, height: 300, marginTop: 100 }} source={require('../../assets/ob.gif')} />
            <View style={{ justifyContent: 'center', alignItems: 'center', width: 300 }}>
              <Text> Chờ phê duyệt từ quản trị viên</Text>
            </View>
          </View>
        )
      }
    }
  }
}

export default WorkerScreen

const styles = StyleSheet.create({})