import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  
  const Loader = ({ visible = false }) => {
  
    return (
      visible && (
        <View style={style.container}>
          <View style={style.loader}>
            <ActivityIndicator size="large" color={"blue"} />
            <Text style={{ marginLeft: 10, fontSize: 16 }}>Loading...</Text>
          </View>
        </View>
      )
    );
  };
  
  const style = StyleSheet.create({
    loader: {
        height: 70,
        backgroundColor: 'white',
        marginHorizontal: 50,
        marginTop: '80%',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 70,
      },
      container: {
        width:"100%",
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 10,
        justifyContent: 'center',
      },
  });
  
  export default Loader;
  