

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from '@expo/vector-icons/MaterialIcons';
import axios from 'axios';
import api from '../services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const io = require('socket.io-client')
const EditingForm = ({route}) => {
  // const ip = window.RTCPeerConnection.locaIIP;
  const navigation = useNavigation();
  const [token , setToken] = useState('');
  useState(async ()=>{
    setToken(await AsyncStorage.getItem('token'))
  })
  const [title, setTitle] = useState(route.params.title);
  const [description, setDescription] = useState(route.params.description);
  const [location, setLocation] = useState(route.params.location);
  const [salary, setSalary] = useState(route.params.salary);
  const [type, setType] = useState(route.params.type);
  const [requirement, setRequirement] = useState(route.params.requirement);
  const [benefit, setBenefit] = useState(route.params.benefit);
  const [date, setDate] = useState(new Date(route.params.deadline));
  const [quantity,setQuantity] = useState(route.params.quantity.toString());
  const [position,setPosition] = useState(route.params.position);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [errors,setErrors] = useState([]);
  const [socket, setSocket] = useState('')
//   console.log(quantity)
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDeadline(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  useEffect(()=>{
    setSocket(io(api.SocketURL, {
      transports: ['websocket']
    }));

  },[])
  const showDatepicker = () => {
    showMode('date');
  };
  const handleSubmit = () => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const deadline = `${year}-${month}-${day}`;
    const company_id = route.params.company_id;
    const data = {company_id,title,description,location,type,salary,requirement,benefit,deadline,quantity,position}
    console.log(data)
    axios.put(`${api.baseURL}/Jobs/${route.params.id}`,data,{
      headers: { 
        authorization: `Bearer ${token}`,
      },    
    }).then(res =>{
    //   socket.emit('post-job',res.data)
    const id = route.params.id;
      navigation.navigate({name: 'Detail',params: {id,company_id,title,description,location,type,salary,requirement,benefit,deadline,quantity,position}});
    }
    ).catch(e=>{
      setErrors(e.response.data.errors)
    })
  };

  return (
    <ScrollView style={{ padding: 20, backgroundColor:'#fff',}}>
      <View style={{marginBottom: 40}}>
      <Text>Tên công việc:</Text>
      <TextInput
        placeholder="Tên công việc"
        value={title}
        onChangeText={setTitle}
        style={{ marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray' , borderRadius: 10, backgroundColor: 20 }}
      />
      {errors.title && <Text style={{color:'red'}}>{errors.title[0]}</Text>}
      <Text>Địa điểm làm việc:</Text>
      <TextInput
        placeholder="Địa điểm làm việc"
        value={location}
        onChangeText={setLocation}
        style={{ marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray' , borderRadius: 10, backgroundColor: 20 }}
      />
       {errors.location && <Text style={{color:'red'}}>{errors.location[0]}</Text>}
      <Text>Vị trí công việc:</Text>
      <TextInput
        placeholder="Vị trí công việc"
        value={position}
        onChangeText={setPosition}
        style={{ marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray' , borderRadius: 10, backgroundColor: 20 }}
      />
       {errors.position && <Text style={{color:'red'}}>{errors.position[0]}</Text>}
      <Text>Loại công việc:</Text>
      <View style={{backgroundColor:20,borderRadius: 10}}>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
        >
          <Picker.Item style={{}} label="Chọn loại công việc" value="" />
          <Picker.Item style={{}} label="Toàn thời gian" value="full-time" />
          <Picker.Item style={{}} label="Bán thời gian" value="part-time" />
          <Picker.Item style={{}} label="Tạm thời" value="temporary" />
          <Picker.Item style={{}} label="Tự do" value="freelance" />
        </Picker>
      </View>
      {errors.type && <Text style={{color:'red'}}>{errors.type[0]}</Text>}
      <Text>Mức lương:</Text>
      <TextInput
        placeholder="Lương"
        value={salary}
        onChangeText={setSalary}
        keyboardType={"numeric"}
        style={{ marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray' , borderRadius: 10, backgroundColor: 20 }}
      />
       {errors.salary && <Text style={{color:'red'}}>{errors.salary[0]}</Text>}
       <Text>số lượng:</Text>
      <TextInput
        placeholder="Số lượng"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType={"numeric"}
        style={{ marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray' , borderRadius: 10, backgroundColor: 20 }}
      />
       {errors.quantity && <Text style={{color:'red'}}>{errors.quantity[0]}</Text>}
      <Text>Thời hạn:</Text>
      <View>
      <TouchableOpacity onPress={showDatepicker} style={{ flexDirection:'row' ,marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray' , borderRadius: 10, backgroundColor: 20 }}>
        <Text style={{flex:1}}>{date.toDateString()}</Text>
        <Icon name='date-range' size={20}></Icon>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          // is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
    {errors.deadline && <Text style={{color:'red'}}>{errors.deadline[0]}</Text>}
      <Text>Mô tả:</Text>
      <TextInput
        placeholder="Mô tả"
        value={description}
        onChangeText={setDescription}
        style={{ textAlignVertical:"top", marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray' , borderRadius: 10, backgroundColor: 20 }}
        numberOfLines={4}
        multiline={true}
      />
       {errors.description && <Text style={{color:'red'}}>{errors.description[0]}</Text>}
      <Text>Yêu cầu:</Text>
      <TextInput
        placeholder="Yêu cầu"
        value={requirement}
        onChangeText={setRequirement}
        style={{ textAlignVertical:"top", marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray' , borderRadius: 10, backgroundColor: 20 }}
        numberOfLines={4}
        multiline={true}
      />
       {errors.requirement && <Text style={{color:'red'}}>{errors.requirement[0]}</Text>}
      <Text>Quyền lợi:</Text>
      <TextInput
        placeholder="Quyền lợi"
        value={benefit}
        onChangeText={setBenefit}
        style={{ textAlignVertical:"top", marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray' , borderRadius: 10, backgroundColor: 20 }}
        numberOfLines={4}
        multiline={true}
      />
       {errors.benefit && <Text style={{color:'red'}}>{errors.benefit[0]}</Text>}
      <Button color={"#FF6F00"} title="Đăng tin" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default EditingForm;
