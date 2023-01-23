import { View, Text, TouchableOpacity,Image ,StyleSheet,ScrollView,ActivityIndicator, FlatList, TextInput,Dimensions,StatusBar} from 'react-native'
import React,{useEffect,useState} from 'react'
import Icon from '@expo/vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import api from '../services/ApiService'

const token = AsyncStorage.getItem('token');
const Statuses = [
  {title: 'Tất cả',id:1},
                  
  {title: 'Đang hiển thị',id:2},
                  
  {title:'Đang bị ẩn',id:3},
                  
  {title:'Tin hết hạn',id:4}
  // {title:'còn hạn',id:5}
];
const Posts = [
      {title: 'mádasdas',status:'Đang hiển thị',style:'bán thới gian', id:1},
      {title: 'mádasdas',status:'Tin bị khóa',style:'toàn thới gian', id:2},
      {title: 'mádasdas',status:'Tin hết hạn',style:'bán thới gian', id:3},
      {title: 'mádasdas',status:'Tin hết hạn',style:'bán thới gian', id:4}
];
export function Header ({user},{}){
  return(
    <View style={{ flex: 1,padding:5, borderRadius:10,borderBottomWidth: 0.12 }}>
        <View style={{ flex: 2, flexDirection: 'row',backgroundColor:'#fff',borderRadius:10 }}>
          <View style={{ flex: 1,justifyContent:'center',alignItems:'center' }}>
            <Image style={{width:50, height:50, borderRadius: 25 }} source={{uri: user.avatar}}></Image>
          </View>
          <View style={{ flex: 4, justifyContent: 'center',}}>
            <Text style={{fontWeight:'bold'}}>{user.name}</Text>
            <View style={{flexDirection: 'row',alignItems:'center'}}>
              <View style={{width:100,height:25}}>
                <Text style={{fontSize:11}}>MDN: <Text>{user.id}</Text></Text>
              </View>
              {/* {user.business_auth == 0 ? (
                <View style={{minWidth:80,height:25,justifyContent:'center',borderColor:'gray',borderWidth:1,borderRadius:5,padding: 3}}>
                  <Text style={{fontSize:10,color:'gray'}}>Chưa xác thực</Text>
              </View>
              ):(
                <View style={{minWidth:80,height:25,justifyContent:'center',borderColor:'green',borderWidth:1,borderRadius:5,padding: 3}}>
                  <Text style={{fontSize:10,color:'green'}}>Đã xác thực</Text>
                </View> 
              )
              } */}
            </View>
          </View>
        </View>
      </View>
  )
}
const Status = ({ title,focus,id,ChoseStatus }) => {
  // console.log(focus)
  if(focus===id){
    return(
    <View style={{ backgroundColor: '#FF6F00', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 30, marginRight: 10,marginVertical:8 }}>
      <Text style={{color:'white'}}>{title}</Text>
    </View>
    )
  }
  return(
   <TouchableOpacity onPress={()=>{ChoseStatus(id)}}  style={{ backgroundColor: '#DEE3E5', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 30, marginRight: 10,marginVertical:8 }}>
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}

const Post = ({title,status,id,styles}) =>{
  return(
    <View style={{
      height: 150, 
      width: 340, 
      marginHorizontal:5,
      marginBottom: 15, 
      backgroundColor: '#fff',
      shadowOpacity: 0.9,
      elevation: 3,
      shadowColor: '#000',
      shadowRadius: 3,
      shadowOffset: { width: 0, height: 2 }, 
      borderRadius: 10
    }}>
      <View style={{flex:1, flexDirection: 'row',padding:10,}}>
        <View style={{flex:3,}}>
          <Text style={{fontWeight:'bold'}}>{title} </Text>
          <Text>#{id} </Text>
        </View>
        <View style={{flex:1, alignItems: 'flex-end'}}>
          <Text style={{fontSize:10}}>{status}</Text>  
        </View> 
      </View>
      <View style={{flex:2,padding:10}}>
        <Text style={{fontSize:12, color:'gray'}}>Loại hình công việc</Text>
        <Text style={{fontSize:13}}>{styles}</Text>
      </View>
    </View>
  )
}

const PostScreen = ({route}) => {
  const [WINDOW_HEIGHT] = useState(Dimensions.get('screen').height - StatusBar.currentHeight);
  const [user] = useState(route.params)
  const [focus,setFocus] = useState(1);
  // for(let i=0;i<region.length;i++){
  //   console.log(i+' '+region[i].name)
  // }
  console.log(token)
  const navigation = useNavigation();
  const [info,setInfo] = useState(0);
  console.log(info == '')
  // console.log(user)
  useEffect(()=>{
      axios.get(`${api.baseURL}/Business_info/${user.id}`,{
        headers: {
        authorization: `Bearer ${token._z}`,
      }})
      .then(res=>{
        // console.log(res.data)
        setInfo(res.data)
      }).catch(e=>{
        console.log(e)
      })
  },[])
  const ChoseStatus = (id)=>{
    setFocus(id)
  }
  if(user.business_auth){
    return (
    <View style={{ height:WINDOW_HEIGHT,backgroundColor: '#fff',  }}>
      <Header user={user}></Header>

      <View style={{ flex: 8 }}>
        <View style={{flex:2,}}>
          <View style={{marginLeft:20, flex: 1}}>
              <FlatList 
              horizontal
              // style={{}}
              showsHorizontalScrollIndicator={false}
              data={Statuses} 
              renderItem={({item}) => <Status title={item.title} id={item.id} focus={focus} ChoseStatus={ChoseStatus} />}
              keyExtractor={item=>item.id}
              />
          </View>
          <View style={{flex:2,justifyContent:'center' }}>
            <Text style={{marginLeft: 20, fontSize: 12}}>Tìm kiếm:</Text>
            <View style={{backgroundColor: '#fff',height: 50, marginHorizontal:20,flexDirection:'row',alignItems:'center',borderRadius: 20, shadowOpacity: 0.9,
              elevation: 3,
              shadowColor: '#000',
              shadowRadius: 3,
              shadowOffset: { width: 0, height: 2 }, }}>
              <Icon style={{marginLeft:10}} name='search' size={25}/>
              <TextInput placeholder='Tìm kiếm theo tiêu đề,mã tin' style={{flex:1}}/>
            </View>
          </View>
        </View>
        <View style={{flex:7}}>
            <View style={{justifyContent:'flex-start',paddingHorizontal:20}}>
              <Text style={{fontSize:12}}>50 tin tuyển dụng</Text>
            </View>
          <View style={{flex:11,backgroundColor: '#fff',alignItems:'center'}}>
            <FlatList 
            data={Posts}
            showsVerticalScrollIndicator={false}
            renderItem={({item})=><Post title={item.title} id={item.id} status={item.status} styles={item.style} />}
            keyExtractor={item=>item.id}
            />
          </View>
          <View style={{flex:1}}/>
          <View style={{flex:1,position:'absolute',marginHorizontal: 125,marginTop: 450}}>
              <View style={{flex: 4}}/>
              <TouchableOpacity style={{backgroundColor: 'rgba(255, 134, 28, 0.5)',padding: 5,borderRadius: 10}}>
                  <Text style={{color: 'white'}}>+ Thêm Tin mới</Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
  
  }else{
    if(info === 0){
      return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'#f1f3f6' }}>
        <ActivityIndicator size='large' color={'#FF6F00'} />
      </View>
      )
    }else{
      if(info == ''){
        return(
          <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center',}}>
              <Image style={{width: 300, height: 300 , marginTop: 100}} source={require('../../assets/update_info.png')}/>
              <View style={{justifyContent: 'center', alignItems: 'center',width: 300}}>
                <Text> Vui lòng cập nhật thêm thông tin về doanh nghiệp trước khi đăng tin</Text>
              </View>
              <TouchableOpacity onPress={()=>{
                navigation.navigate({name:'Update_Info',params: user})
              }} style={{marginTop: 100, marginHorizontal: 100,backgroundColor: '#FF6F00',padding: 10,borderRadius: 10}}>
                <Text style={{color:'white'}}>Cập nhật ngay</Text>
              </TouchableOpacity>
          </View>
        )
      }else{
        return(
          <View>
            <Text>Cho duyet</Text>
          </View>
        )
      }
    }
  }
}

export default PostScreen

const styles = StyleSheet.create({})
