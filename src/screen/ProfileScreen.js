import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  Modal,
} from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import api from '../services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SysLoading from '../component/sys_loading';
import { useFonts } from 'expo-font';

function Body({avatar,name}) {
  if(avatar == null){
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'#f1f3f6' }}>
        <ActivityIndicator size='large' color={'#FF6F00'} />
      </View>
    )
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <>
        <View>
          <Image
            style={styles.coverImage}
            source={{ uri: 'https://targetcareers.co.uk/sites/targetcareers.co.uk/files/public/Business-and-management.jpg' }}
          />
        </View>
        <View style={styles.profileContainer}>
          {/* Profile Details */}
          <View>
            {/* Profile Image */}
            <View style={styles.profileImageView}>
              <Image
                style={styles.profileImage}
                source={{
                  uri: avatar,
                }}
              />
            </View>
            {/* Profile Name and Bio */}
            <View style={styles.nameAndBioView}>
              <Text style={styles.userFullName}>{name}</Text>
              <Text style={styles.userBio}>{'I love capturing photos'}</Text>
            </View>
            {/* Posts/Followers/Following View */}
            <View style={styles.countsView}>
              <View style={styles.countView}>
                <Text style={styles.countNum}>13</Text>
                <Text style={styles.countText}>Posts</Text>
              </View>
              <View style={styles.countView}>
                <Text style={styles.countNum}>1246</Text>
                <Text style={styles.countText}>Followers</Text>
              </View>
              <View style={styles.countView}>
                <Text style={styles.countNum}>348</Text>
                <Text style={styles.countText}>Following</Text>
              </View>
            </View>
          </View>
        </View>
      </>
    </ScrollView>
  )
}

function Header({ShowSetting,title}) {
  const navigation = useNavigation()
  return (
    <View style={{ height: 50, flexDirection: 'row', borderBottomWidth: StyleSheet.hairlineWidth }}>
      <TouchableOpacity onPress={()=>{navigation.navigate('Search')}} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Icon name='search' size={20}></Icon>
      </TouchableOpacity>
      <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{title}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.8} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={ShowSetting}>
        <Icon name='settings' size={20}></Icon>
      </TouchableOpacity>
    </View>
  )
}

function Setting({visible,HideSetting,Loading}){
  const navigation = useNavigation();
  const [token, settoken] = useState(null)
  useState(async () => { settoken(await AsyncStorage.getItem('token'))})
  const logout = async () => {
    Loading();
    await axios.post(`${api.baseURL}/logout`, {}, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    }
    ).then(async res => {
      console.log(res.data)
      await AsyncStorage.removeItem('token')
      navigation.navigate('Loading')
      Loading();
    }).catch(e => {
      console.log(e)
      Loading();
    })
  }
  return(
  <Modal visible={visible} transparent={true} animationType={'fade'}>
    <View onPress={HideSetting} style={{
      flex: 1,
      backgroundColor: 'rgba(00,00,00,.5)',
      justifyContent: 'flex-end',
      alignContent: 'center',
    }}>
      <View
        style={{
          flex:1,
        }}
      >
      <TouchableOpacity onPressOut={HideSetting} style={{flex:4,backgroundColor:'rgba(00,00,00,00)'}}/>
      <View style={{flex:1}} >
      <TouchableOpacity activeOpacity={0.9} 
          style={{borderTopEndRadius:15,borderTopStartRadius:15,paddingHorizontal:10,flex:1,backgroundColor: '#e6e6e6',}}>
            <View style={{flex:1,flexDirection:'row', alignItems:'center'}}>
              <Icon name='info-outline' size={20} style={{marginHorizontal: 10}}/>
              <Text>Thông tin chung</Text>
            </View>
          </TouchableOpacity>  
          <TouchableOpacity activeOpacity={0.9} 
          style={{paddingHorizontal:10,flex:1,backgroundColor: '#e6e6e6',}}>
            <View style={{flex:1,flexDirection:'row', alignItems:'center'}}>
              <Icon name='outlined-flag' size={20} style={{marginHorizontal: 10}}/>
              <Text>Báo cáo</Text>
            </View>
          </TouchableOpacity>  
          <TouchableOpacity activeOpacity={0.95} onPress={logout}
          style={{paddingHorizontal:10,flex:1,backgroundColor: '#e6e6e6',}}>
            <View style={{flex:1,flexDirection:'row', alignItems:'center'}}>
              <Icon name='logout' size={20} style={{marginHorizontal: 10}}/>
              <Text>Đăng xuất</Text>
            </View>
          </TouchableOpacity>  
       </View>
      </View>
    </View>
  </Modal>
  )
}
export default function ProfileScreen1() {

  const [showContent, setShowContent] = useState('Photos');
  const [visible,setVisible] = useState(false);
  const [Loading,setLoading] = useState(false);
  const [user,setUser] = useState({});
  const [token, settoken] = useState('');
  useState(async () => { settoken(await AsyncStorage.getItem('token'))})
  useEffect(()=>{
    if(token!==''){
    axios.get(`${api.baseURL}/user`, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    }).then(res=>{
      setUser(res.data)
    }).catch(e=>{
      console.log(e);
    }) 
  }
  },[token])
  
  function ShowSetting(){
    setVisible(true)
  }
  function HideSetting(){
    setVisible(false)
  }
  function changeloading(){
    setLoading(!Loading)
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SysLoading visible={Loading}></SysLoading>
      <Setting visible={visible} HideSetting={HideSetting} Loading={changeloading} />
      <Header title={user.name} ShowSetting={ShowSetting} />
        <Body avatar={user.avatar} name={user.name}/>
    </View>
  );
}

const styles = StyleSheet.create({
  coverImage: { height: 300, width: '100%' },
  profileContainer: {
    // height: 1000,
    backgroundColor: '#fff',
    marginTop: -100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileImageView: { alignItems: 'center', marginTop: -50 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
  },
  nameAndBioView: { alignItems: 'center', marginTop: 10 },
  userFullName: { fontFamily: 'SSBold', fontSize: 26 },
  userBio: {
    fontFamily: 'SSRegular',
    fontSize: 18,
    color: '#333',
    marginTop: 4,
  },
  countsView: { flexDirection: 'row', marginTop: 20 },
  countView: { flex: 1, alignItems: 'center' },
  countNum: { fontFamily: 'SSBold', fontSize: 20 },
  countText: { fontFamily: 'SSRegular', fontSize: 18, color: '#333' },
  interactButtonsView: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  interactButton: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#4b7bec',
    margin: 5,
    borderRadius: 4,
  },
  interactButtonText: {
    fontFamily: 'SSBold',
    color: '#fff',
    fontSize: 18,
    paddingVertical: 6,
  },
  profileContentButtonsView: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: '#f1f3f6',
  },
  showContentButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#000',
  },
  showContentButtonText: {
    fontFamily: 'SSRegular',
    fontSize: 18,
  },
});