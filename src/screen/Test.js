import { StyleSheet, Text, View, TextInput, ScrollView, Image } from 'react-native'
import React from 'react'
import Icon from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
const Test = () => {
    return (
        <View style={{ height: '100%', width: '100%' }}>
            <LinearGradient colors={['#D16100','#ee921d']} style={{ flex: 1,}}>
                <View style={{ flex: 3, flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='arrow-back' size={25} color='#fff' />
                    </View>
                    <View style={{ flex: 6, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white' }} color={'white'}>THÔNG TIN AGRIBANK</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>⋮</Text>
                    </View>
                </View>
                <View style={{ flex: 3, }}>
                    <View style={{ marginHorizontal: 20, marginBottom: 15, backgroundColor: '#E29E4D', flex: 1, borderRadius: 16, flexDirection: 'row', padding: 5 }}>
                        <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#E29E4D' }}>Tất cả</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white' }}>Biến động số dư</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white' }}>Tin</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 2, backgroundColor: '#fff', flexDirection: 'row', flexDirection: 'row', alignItems: 'center' }}>
                    <Icon style={{ marginLeft: 10 }} color='#A4A7AC' name='search' size={25}></Icon>
                    <TextInput style={{ fontSize: 18, marginLeft: 10 }} placeholder='Tìm kiếm'></TextInput>
                </View>
            </LinearGradient>

            <View style={{ flex: 4, backgroundColor: '#E2E2E2' }}>
                <ScrollView>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={{ width: 50, height: 50 }}>
                            <Image style={{ height: 35, width: 35, borderRadius: 90, marginLeft: 10, marginTop: 10 }} source={{ uri: 'https://th.bing.com/th/id/R.c72c432036fc09b7ef18e1bc36c983ad?rik=vvO8LVjjhhyQrw&pid=ImgRaw&r=0' }}></Image>
                        </View>
                       
                        <View style={{
                            width: 270, minHeight: 200, backgroundColor: '#fff',
                            marginLeft: 10,
                            borderRadius: 12,
                           
                            paddingVertical: 8,
                            paddingHorizontal: 15,
                            shadowOpacity: 0.9,
                            elevation: 3,
                            shadowColor: '#000',
                            shadowRadius: 3,
                            shadowOffset: { width: 0, height: 2 },
                            borderBottomWidth: 0,
                        }}>
                            <Text>Agribank: 10:11</Text>
                            <Text>28/12/2022</Text>
                            <Text>Tài khoản:</Text>
                            <Text style={{ fontWeight: 'bold' }}>740320520123201</Text>
                            <Text>Số tiền GD: <Text style={{ color: '#58B181' }}> +5,000,000VND</Text> </Text>
                            <Text>Số dư cuối: <Text style={{ color: '#2C30FF', fontWeight: 'bold' }}> 19,473,300VND</Text></Text>
                            <Text>Nội dung: 471992-0912099134102391923123</Text>
                            {/* <Text>MA_GD:229624748/</Text> */}
                            {/* <Text>C2010341,Nguyen Nhu Hoang,Hoc</Text>
                    <Text>phi1/2022-2023#Hoc phi - Dai hoc Can tho Webservic e[BPMENT-FT-426814]</Text> */}
                            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 10, color: '#AFAFAF' }}>10:11</Text>
                            </View>

                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={{ width: 50, height: 50 }}>
                            <Image style={{ height: 35, width: 35, borderRadius: 90, marginLeft: 10, marginTop: 10 }} source={{ uri: 'https://th.bing.com/th/id/R.c72c432036fc09b7ef18e1bc36c983ad?rik=vvO8LVjjhhyQrw&pid=ImgRaw&r=0' }}></Image>
                        </View>
                        <View style={{
                            width: 270, minHeight: 200, backgroundColor: '#fff',
                            marginLeft: 10,
                            borderRadius: 12,
                            shadowColor: '#000',
                            shadowRadius: 3,
                            paddingVertical: 8,
                            paddingHorizontal: 15,
                            shadowOpacity: 0.9,
                            elevation: 3,
                            shadowOffset: { width: 0, height: 2 },
                            borderBottomWidth: 0,
                        }}>
                            <Text>Agribank: 16:19</Text>
                            <Text>28/12/2022</Text>
                            <Text>Tài khoản:</Text>
                            <Text style={{ fontWeight: 'bold' }}>740320520123201</Text>
                            <Text>Số tiền GD: <Text style={{ color: '#A44B62' }}> -18,183,000VND</Text> </Text>
                            <Text>Số dư cuối: <Text style={{ color: '#2C30FF', fontWeight: 'bold' }}> 1,290,300VND</Text></Text>
                            <Text>Nội dung:</Text>
                            <Text>MA_GD:229624748/</Text>
                            <Text>C2010341,Nguyen Thi Nhu Hoang,Hoc</Text>
                            <Text>phi1/2022-2023#Hoc phi - Dai hoc Can tho Webservic e[BPMENT-FT-426814]</Text>
                            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 10, color: '#AFAFAF' }}>16:19</Text>
                            </View>

                        </View>
                    </View>



                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={{ width: 50, height: 50 }}>
                            <Image style={{ height: 35, width: 35, borderRadius: 90, marginLeft: 10, marginTop: 10 }} source={{ uri: 'https://th.bing.com/th/id/R.c72c432036fc09b7ef18e1bc36c983ad?rik=vvO8LVjjhhyQrw&pid=ImgRaw&r=0' }}></Image>
                        </View>
                        <View style={{
                            width: 270, minHeight: 200, backgroundColor: '#fff',
                            marginLeft: 10,
                            borderRadius: 12,
                            shadowColor: '#000',
                            shadowRadius: 3,
                            paddingVertical: 8,
                            paddingHorizontal: 15,
                            shadowOpacity: 0.9,
                            elevation: 3,
                            shadowOffset: { width: 0, height: 2 },
                            borderBottomWidth: 0,
                        }}>
                            <Text>Agribank: 20:28</Text>
                            <Text>28/12/2022</Text>
                            <Text>Tài khoản:</Text>
                            <Text style={{ fontWeight: 'bold' }}>740320520123201</Text>
                            <Text>Số tiền GD: <Text style={{ color: '#A44B62' }}> -18,980,000VND</Text> </Text>
                            <Text>Số dư cuối: <Text style={{ color: '#2C30FF', fontWeight: 'bold' }}> 493,300VND</Text></Text>
                            <Text>Nội dung:</Text>
                            <Text>MA_GD:229624748/</Text>
                            <Text>C2010341,Hoc</Text>
                            <Text>phi1/2022-2023#Hoc phi - Dai hoc Can tho Webservic e[BPMENT-FT-426814]</Text>
                            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 10, color: '#AFAFAF' }}>16:19</Text>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Test

const styles = StyleSheet.create({})