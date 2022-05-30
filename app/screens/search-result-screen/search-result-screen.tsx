import { View, SafeAreaView } from 'react-native';
import React from 'react';
import { SitterProfileCard } from '../../custom-components/sitter-profile-card/sitter-profile-card';
import { FlatList } from 'react-native-gesture-handler';
import { petsitters } from './dummy-data';
import { HEIGHT, WIDTH } from '../../theme';
import { PreBol18, ScreenRootView } from '../../custom-components';
import { LBG } from '../../theme/palette';

export const SearchResultScreen = () => {
  return (
    <ScreenRootView>
        {/* title */}
        <PreBol18 text='검색결과' />

        <View style={{
            width: '100%',
            height: HEIGHT * 2,
            backgroundColor: LBG,
            marginTop: HEIGHT * 12,
        }} />

        {/* list container */}
        <View>
            <FlatList
                data={petsitters}
                renderItem={( {item, index} ) => (
                    <SitterProfileCard 
                        key={item.id}
                        name={item.name}
                        image={item.image}
                        rating={item.rating}
                        review={item.review}
                        title={item.title}
                        desc={item.desc}
                        onPress={() => console.warn("Hello")}
                        style={ index < petsitters.length - 1 ? {marginTop: HEIGHT * 20} : {marginVertical: HEIGHT * 20}}
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    </ScreenRootView>
  );
};