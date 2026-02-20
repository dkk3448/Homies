import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { useUser, useClerk } from '@clerk/clerk-expo';
import Colors from './../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useClerk(); 
  const navigation = useNavigation(); 

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState(''); 

  const quotes = [
    { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { content: "Act as if what you do makes a difference. It does.", author: "William James" },
    { content: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { content: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
    { content: "Happiness depends upon ourselves.", author: "Aristotle" },
    { content: "Do what you can with all you have, wherever you are.", author: "Theodore Roosevelt" },
    { content: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex].content);
    setAuthor(quotes[randomIndex].author);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigation.replace('Login');
  };

  const profileMenu = [
    { id: 1, name: 'Logout', icon: 'log-out', action: handleLogout }
  ];

  return (
    <View>
      {/* Header Section */}
      <View style={{ padding: 20, paddingTop: 30, backgroundColor: Colors.PRIMARY }}>
        <Text style={{ fontSize: 30, fontFamily: 'outfit-bold', color: Colors.WHITE }}>Profile</Text>
        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Image 
            source={{ uri: user?.imageUrl }}
            style={{ width: 90, height: 90, borderRadius: 99 }} 
          />
          <Text style={{ fontSize: 26, marginTop: 8, fontFamily: 'outfit-medium', color: Colors.WHITE }}>
            {user?.fullName}
          </Text>
          <Text style={{ fontSize: 18, marginTop: 8, fontFamily: 'outfit-medium', color: Colors.WHITE }}>
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>
      </View>

      {/* Motivational Quote Section */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text 
          style={{ 
            fontSize: 18, 
            fontFamily: 'outfit-italic', 
            color: Colors.PRIMARY, 
            textAlign: 'center',
          }}
        >
          "{quote}"
        </Text>
        {author && (
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'outfit-medium',
              color: Colors.GRAY,
              textAlign: 'center',
              marginTop: 10,
            }}
          >
            - {author}
          </Text>
        )}
      </View>

      {/* Profile Menu Section */}
      <View style={{ paddingTop: 40 }}>
        <FlatList
          data={profileMenu}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 40, paddingHorizontal: 80 }}
              onPress={item.action ? item.action : () => console.log(`${item.name} pressed`)}
            >
              <Ionicons name={item.icon} size={35} color={Colors.PRIMARY} />
              <Text style={{ fontFamily: 'outfit', fontSize: 20, marginLeft: 10 }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
