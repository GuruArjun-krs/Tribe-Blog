import { useAddFavorite, useDeleteBlog } from '@/Api/Hooks/BlogHook';
import { AppIcon, Typo } from '@/Components';
import useFetchLocal from '@/Hooks/useFetchLocal';
import { COLORS } from '@/Utils/colors';
import { showToast } from '@/Utils/toastHelper';
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

const CardMenu = ({ route }: any) => {
    const { data } = route?.params || {}
    const navigation = useNavigation<any>()
    const { userId } = useFetchLocal();
    const isMyPost = userId === data?.createdBy?._id
    const { mutate: addFavorite } = useAddFavorite();
    const { mutate: deleteBlog } = useDeleteBlog()
    const isFavorited = data?.favorites?.includes(userId);

    const options = [
        {
            id: 'favorite',
            Label: isFavorited ? 'Remove from Favorite' : 'Add to Favorite',
            icon: <AppIcon name={isFavorited ? 'heart-crack' : 'heart'} type={isFavorited ? 'FontAwesome6' : 'FontAwesome'} size={16} color={COLORS.hotPink} />
        },
        ...(isMyPost ? [
            {
                id: 'delete',
                Label: 'Delete',
                icon: <AppIcon name='trash' type='Feather' size={16} color={COLORS.status.error} />
            }] : [{
                id: 'user',
                Label: 'Visit Profile',
                icon: <AppIcon name='user' type='Feather' size={16} color={COLORS.purple} />
            }])
    ]

    const handleAction = (key: string) => {
        if (key === 'favorite') {
            addFavorite(data?._id, {
                onSuccess: (data) => {
                    navigation.navigate('BottomTab', { screen: 'Home' })
                    if (data?.isFavorited) {
                        showToast('success', 'Added to Favorites')
                    } else {
                        showToast('success', 'Removed from Favorites')
                    }
                },
                onError: (error) => {
                    showToast('error', error?.message)
                }
            })
        } else if (key === 'delete') {
            deleteBlog(data?._id, {
                onSuccess: (data) => {
                    navigation.navigate('BottomTab', { screen: 'Home' })
                    showToast('success', 'Blog Deleted')
                },
                onError: (error) => {
                    showToast('error', error?.message)
                }
            })
        } else {
            navigation.navigate('BloggerProfile', { id: data?.createdBy?._id })
        }
    }

    return (
        <View style={{ padding: 20, gap: 10 }}>
            {options?.map((el) => (
                <TouchableOpacity key={el?.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 12 }} onPress={() => handleAction(el?.id)}>
                    {el?.icon}
                    <Typo title={el?.Label} />
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default CardMenu