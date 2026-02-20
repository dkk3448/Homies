import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
WebBrowser.maybeCompleteAuthSession();
export default function Login() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    const onPress = React.useCallback(async () => {
        console.log("SCO")
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
     
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);
  return (
    <View style={{alignItems:'center'}}>
        <Image source={require('./../../../assets/images/douglas-sheppard-CGZbE-Pa1S8-unsplash.jpg')} 
            style={styles.loginImage}
        />
        <View style={styles.subContainer}>
            <Text style={{fontSize:27,color:Colors.WHITE,
                textAlign:'center'}}>
                 
                <Text style={{fontWeight:'bold'}}> Welcome to Homies 
                </Text>
            </Text>
            <Text style={{fontSize:17,color:Colors.WHITE,
            textAlign:'center',marginTop:20}}>best App to manage tasks for accomodations</Text>
        
            <TouchableOpacity style={styles.button} 
            onPress={onPress}>
                <Text style={{textAlign:'center',
                fontSize:17,
                color:Colors.PRIMARY}}>Sign-in with Google</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    loginImage:{
        width:'100%',
        height:450,
        marginTop:0,
    },
    subContainer:{
        width:'100%',
        backgroundColor:Colors.PRIMARY,
        height:'80%',
        marginTop:-20,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:20
        
    },
    button:{
        padding:15,
        backgroundColor:Colors.WHITE,
        borderRadius:99,
        marginTop:40
    }
})