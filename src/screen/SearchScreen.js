import { StyleSheet, Text, View,TouchableOpacity,TextInput,ScrollView,Image,Dimensions,StatusBar } from 'react-native'
import React,{useEffect,useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import  Icon  from '@expo/vector-icons/MaterialIcons'
const header =() =>{
    return(
        View
    )
}
const SearchScreen = () => {
  const navigation = useNavigation()
  const [WINDOW_HEIGHT] = useState(Dimensions.get('screen').height);
  return (
    <View height={WINDOW_HEIGHT} style={{ width: '100%',backgroundColor:'#fff' }}>
        <View style={{flex: 1, backgroundColor:'white',flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{flex: 2,backgroundColor: '#fff',justifyContent:'center',alignItems:'center'}}>
                <Icon name='arrow-back' size={30}/>
            </TouchableOpacity>
            <View style={{flex: 10,padding:8}}>
                <View style={{flex: 1,backgroundColor:'#FFF8E1',borderRadius:5,flexDirection:"row",alignItems:'center'}}>
                    <Icon name='search' size={20} style={{marginHorizontal:5}}></Icon>
                    <TextInput autoFocus style={{fontSize: 12,flex:1}} placeholder='Tìm kiếm'></TextInput>
                </View>
            </View>
            <View style={{flex: 4,justifyContent: 'center', alignItems:'center'}}>
                <Text style={{color: '#FF6F00', fontSize: 13, fontWeight:'400'}}>Tất cả</Text>
            </View>
        </View>
        <View style={{flex: 15}}>

        </View>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})