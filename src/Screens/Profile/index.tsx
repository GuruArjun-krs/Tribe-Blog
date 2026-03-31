import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Button, FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [input, setInput] = useState('')

    const userList = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        name: `Ram Charan ${index + 1}`,
        profile: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
        lastMsg: "Hello, hope you're doing great!",
        date: 'Today, 12:25',
    }));

    const renderUserCard = ({ item }: any) => {
        return (
            <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFFFFF', paddingVertical: 16, paddingHorizontal: 12, borderRadius: 10, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <View style={{ width: 30, height: 30, }}>
                        <Image source={{ uri: item?.profile }} style={{ width: '100%', height: '100%', borderRadius: 40 }} />
                    </View>
                    <Text>{item?.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        // <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 110 : 0}
            >
                {/* Search Input Section */}
                <View style={styles.searchSection}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            value={input}
                            onChangeText={setInput}
                            placeholder='Search users...'
                            style={styles.input}
                        />
                    </View>
                </View>

                <FlatList
                    data={userList}
                    renderItem={renderUserCard}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    nestedScrollEnabled={true}
                    ListFooterComponent={() => (
                        <View style={styles.footer}>
                            <Button title='Go Back' onPress={() => navigation.goBack()} />
                        </View>
                    )}
                />
            </KeyboardAvoidingView>
        // </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    searchSection: {
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 5,
    },
    inputWrapper: {
        borderWidth: 1,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderColor: '#BABABA',
        backgroundColor: '#F9F9F9',
    },
    input: {
        height: 45,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        gap: 12,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F5F5F5',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
    },
    userName: {
        fontSize: 16,
        fontWeight: '500',
    },
    footer: {
        marginTop: 20,
        marginBottom: 40,
    }
});