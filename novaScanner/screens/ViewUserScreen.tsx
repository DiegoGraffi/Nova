import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Send } from "lucide-react-native";

export default function ViewUserScreen({ route }) {
  const data = route.params.client;

  return (
    <ScrollView className="w-full h-full bg-white">
      {data.foto1 && (
        <View className="w-full h-[350px] relative">
          <Image source={{ uri: data.foto1 }} className="w-full h-full" />
        </View>
      )}

      <View className="w-full p-[15px] space-y-[15px]">
        {data.cient && (
          <View className="w-full p-[15px] border-[.5px] border-gray-600 bg-[#eff1f4]">
            <Text className="text-center">{data.client}</Text>
          </View>
        )}

        {data.codarea && data.telefono && (
          <View className="w-full p-[15px] border-[.5px] border-gray-600 bg-[#eff1f4]">
            <Text className="text-black text-center text-[16px]">
              {data.codarea} 15 {data.telefono}
            </Text>
          </View>
        )}
        <View className="w-full p-[15px] border-[.5px] border-gray-600 bg-[#eff1f4]">
          <Text className="text-black text-center text-[16px]">
            {data.date}
          </Text>
        </View>
        {data.foto2 || data.foto3 || data.foto4 || data.foto5 || data.foto6 ? (
          <ScrollView
            horizontal={true}
            className="border-[.5px] border-gray-600 bg-[#eff1f4]"
            contentContainerStyle={{ padding: 15 }}
          >
            <View className="flex flex-row space-x-[15px] overflow-hidden">
              {data.foto2 && (
                <Image
                  source={{ uri: data.foto2 }}
                  className="w-[200px] h-[300px]"
                />
              )}
              {data.foto3 && (
                <Image
                  source={{ uri: data.foto3 }}
                  className="w-[200px] h-[300px]"
                />
              )}
              {data.foto4 && (
                <Image
                  source={{ uri: data.foto4 }}
                  className="w-[200px] h-[300px]"
                />
              )}
              {data.foto5 && (
                <Image
                  source={{ uri: data.foto5 }}
                  className="w-[200px] h-[300px]"
                />
              )}
              {data.foto6 && (
                <Image
                  source={{ uri: data.foto6 }}
                  className="w-[200px] h-[300px]"
                />
              )}
            </View>
          </ScrollView>
        ) : null}
        <TouchableOpacity className="py-[15px] w-full flex-row space-x-[10px] justify-center items-center bg-[#3F75FF]">
          <Send color={"#EFF1F4"} strokeWidth={1.5} />
          <Text className="text-white text-[18px] font-light">
            Enviar Cliente
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
