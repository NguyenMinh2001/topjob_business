import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Modal, Dimensions, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Header } from './PostScreen';
import axios from 'axios';
import api from '../services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather as Icon, MaterialIcons as MIcon } from '@expo/vector-icons';
import PagerView from 'react-native-pager-view';
export default function HomeScreen({ navigation, route }) {
  const [WINDOW_HEIGHT] = useState(Dimensions.get('screen').height - StatusBar.currentHeight);
  const [user] = useState(route.params)

  const [token, settoken] = useState('')
  useState(async () => { settoken(await AsyncStorage.getItem('token')) })


  const [stories, setStories] = useState([
    {
      key: 1,
      userImage: 'https://randomuser.me/api/portraits/men/60.jpg',
      userName: 'Brayden Willis',
      storyImage:
        'https://images.pexels.com/photos/4726898/pexels-photo-4726898.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      isSeen: false,
    },
    {
      key: 2,
      userImage: 'https://randomuser.me/api/portraits/women/81.jpg',
      userName: 'Sophie Price',
      storyImage:
        'https://images.pexels.com/photos/5257534/pexels-photo-5257534.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      isSeen: false,
    },
    {
      key: 3,
      userImage: 'https://randomuser.me/api/portraits/men/79.jpg',
      userName: 'Rick Perry',
      storyImage:
        'https://images.pexels.com/photos/3380805/pexels-photo-3380805.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      isSeen: false,
    },
    {
      key: 4,
      userImage: 'https://randomuser.me/api/portraits/men/85.jpg',
      userName: 'Dave Pena',
      storyImage:
        'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      isSeen: false,
    },
    {
      key: 5,
      userImage: 'https://randomuser.me/api/portraits/women/74.jpg',
      userName: 'Layla Kennedy',
      storyImage:
        'https://images.pexels.com/photos/33287/dog-viszla-close.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      isSeen: false,
    },
  ]);

  const [blog, setBlog] = useState([
    {
      srcImage: 'https://tuyendung.topcv.vn/bai-viet/wp-content/uploads/2022/10/cach-danng-tin-tuyen-dung-thu-hut-ung-vien.png',
      blogName: 'Bật mí cách đăng tin tuyển dụng hiệu quả hút 100%...',
      shortBlog: 'Cách đăng tin tuyển dụng thu hút ứng viên tiềm năng vẫn là luôn bài toán đầy thách thức của nhà tuyển dụng. Sự..',
    },
    {
      srcImage: 'https://tuyendung.topcv.vn/bai-viet/wp-content/uploads/2022/10/vi-sao-nhan-vien-hay-bo-viec-3.jpg',
      blogName: 'Vì sao nhân viên hay bỏ việc? Nguyên nhân và cách...',
      shortBlog: 'Vì sao nhân viên hay bỏ việc? Làm thế nào để giữ chân nhân viên? … là những câu hỏi hóc búa mà nhiều...',
    },
    {
      srcImage: 'https://tuyendung.topcv.vn/bai-viet/wp-content/uploads/2023/02/tuyen-dung-nhan-su-cap-cao-tuyendung.topcv_.vn-1-696x435.jpg',
      blogName: 'Quy trình tuyển dụng nhân sự cấp cao thành công',
      shortBlog: 'Tuyển dụng nhân sự cấp cao có vai trò quan trọng đối với sự phát triển của mỗi doanh nghiệp. Nhân sự cấp cao...',
    },
    {
      srcImage: 'https://tuyendung.topcv.vn/bai-viet/wp-content/uploads/2023/02/nguoi-tim-viec-tuyendung.topcv-1-218x150.jpg',
      blogName: 'Hơn 46% người tìm việc muốn lương trên 20 triệu đồng/tháng',
      shortBlog: 'Theo báo cáo thị trường lao động Thành phố Hồ Chí Minh thời điểm trước và sau Tết Quý Mão 2023 mới đây: có...',
    },
    {
      srcImage: 'https://tuyendung.topcv.vn/bai-viet/wp-content/uploads/2023/02/ky-nang-dan-dat-doi-nhom-tuyendung.topcv_.vn-1-218x150.jpg',
      blogName: 'Các kỹ năng dẫn dắt đội nhóm trong thời kỳ suy thoái kinh tế',
      shortBlog: 'Dù ở bất kỳ đơn vị nào, quy mô ra sao thì kỹ năng dẫn dắt đội nhóm vẫn có vai trò quan trọng,...',
    },

  ]);

  const [currentStoryView, setCurrentStoryView] = useState(stories);
  const [storyModalVisible, setStoryModalVisible] = useState(false);

  return (
    <View style={{ height: WINDOW_HEIGHT, backgroundColor: '#fff' }}>
      {/* Header */}
      <Header user={user} />
      <View style={{ flex: 8 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Stories */}
          <View style={[styles.storiesView]}>
            <Text style={{ marginLeft: 20, fontSize: 15, fontWeight: 'bold', marginBottom: 10 }}>Thông Tin Mới</Text>
            <PagerView style={{ height: 110 }} initialPage={0}>
              {stories.map((story, i) => (

                <View style={{ marginLeft: 10, alignItems: 'center' }} key={i}>
                  <TouchableOpacity
                    style={styles.storyContentView}
                  >
                    <Image
                      style={{
                        width: 365,
                        height: 100,
                        borderRadius: 10,
                        opacity: story.isSeen ? 0.5 : 1,
                      }}
                      source={{
                        uri: story.storyImage,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </PagerView>
          </View>
          {/* Chats View */}
          <Text style={{ marginLeft: 20, fontSize: 15, fontWeight: 'bold', marginBottom: 10 }} >Hiệu Quả Tuyển Dụng</Text>
          <View style={{ height: 250 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1, backgroundColor: '#F7FAFF', margin: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'flex-start', padding: 5 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#6A9DCB' }}>6</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#6A9DCB', }}>Ứng viên mới</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: '#FFF6EF', margin: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'flex-start', padding: 5 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#E0B773' }}>6</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#E0B773', }}>Ứng viên mới</Text>
              </View>


            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1, backgroundColor: '#FFEFEF', margin: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'flex-start', padding: 5 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#B8594F' }}>6</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#B8594F', }}>Ứng viên mới</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: '#E6F7EF', margin: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'flex-start', padding: 5 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#5AA07F' }}>6</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#5AA07F', }}>Ứng viên mới</Text>
              </View>
            </View>
          </View>
          <View style={{ height: 20, }}></View>
          <Text style={{ marginLeft: 20, fontSize: 15, fontWeight: 'bold', marginBottom: 10 }} >Blog</Text>
          {/* Story Modal */}
          <View style={{ minHeight: 150, marginBottom: 100 }}>
            {blog.map((blog, i) =>
            (
              <View style={{ backgroundColor: 'white', paddingHorizontal: 10, flexDirection: 'row', marginBottom: 10 }} key={i} >
                <Image source={{ uri: blog.srcImage }} style={{ height: 100, width: 120 }} />
                <View style={{ paddingHorizontal: 5, flex: 1 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{blog.blogName}</Text>
                  <Text style={{ fontSize: 10 }}>{blog.shortBlog}</Text>
                </View>
              </View>
            ))}

          </View>
        </ScrollView>
      </View>
    </View>
  );

}
const styles = StyleSheet.create({
  storiesView: {
    paddingVertical: 10,
    paddingRight: 10,
    backgroundColor: '#fafafa',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  storyContentView: {
    // width: 90,
    // height: 130,
    borderRadius: 10,
    borderColor: '#dfe4ea',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyUserImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    height: '90%',
    borderRadius: 20,
    overflow: 'hidden',
  },
});