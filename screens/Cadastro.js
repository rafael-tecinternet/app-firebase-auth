import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Cadastro = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const cadastrar = () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Você deve preecher e-mail e senha");
      return;
    }
    createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        /* aO FAZER A CRIAÇÃO DO NOVO USUÁRIO (COM EMAI E SENHA), 
        APROVEITAMOS PARA ATUALIZAR VIA UPDATEPROFILE A PROPRIEDADE 
        DO AUTH QUE PERMITE ADICIONAR UM NOME AO USUÁRIO */
        updateProfile(auth.currentUser, {
          displayName: nome,
        });
        Alert.alert("Conta criada com sucesso", "Deseja entrar?", [
          {
            text: "NÃO",
            onPress: () => {
              return false;
            },
          },
          {
            text: "SIM",
            onPress: () => {
              navigation.navigate("AreaLogada");
            },
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
        let mensagem;
        switch (error.code) {
          case "auth/email-already-in-use":
            mensagem = "E-mail já cadastrado!";
            break;
          case "auth/weak-password":
            mensagem = "Senha deve ter pelo menos 6 dígitos!";
            break;
          case "auth/invalid-email":
            mensagem = "Endereço de e-mail inválido!";
            break;
          default:
            0;
            mensagem = "Algo deu errado... tente novamente!";
            break;
        }
        Alert.alert("Atenção!", mensagem);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View style={estilos.container}>
      <View style={estilos.formulario}>
        <TextInput
          placeholder="Nome"
          style={estilos.input}
          onChangeText={(valor) => setNome(valor)}
        />
        <TextInput
          placeholder="E-mail"
          style={estilos.input}
          keyboardType="email-address"
          onChangeText={(valor) => setEmail(valor)}
        />
        <TextInput
          placeholder="Senha"
          style={estilos.input}
          secureTextEntry
          onChangeText={(valor) => setSenha(valor)}
        />
        <View style={estilos.botoes}>
          <Button
            onPress={cadastrar}
            disabled={loading}
            title="Cadastre-se"
            color="blue"
          />
          {loading && <ActivityIndicator size="large" color="orange" />}
        </View>
      </View>
    </View>
  );
};

export default Cadastro;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  formulario: {
    marginVertical: 16,
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    marginVertical: 8,
    padding: 8,
    borderRadius: 4,
  },
  botoes: {
    marginVertical: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
