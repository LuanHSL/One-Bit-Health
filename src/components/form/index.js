import React,  { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Vibration,
  Pressable } from 'react-native'
import ResultImc from './result-imc';
import styles from './style';

export default function Form(){
  const [height, setHeight] = useState(null)
  const [weight, setWeight] = useState(null)
  const [messageImc, setMessageImc] = useState("preencha o peso e altura")
  const [imc, setImc] = useState(null)
  const [textButton, setTextButton] = useState("Calcular")
  const [errorMessage, setErrorMessage] = useState(null)

  function verificationImc() {
    if (imc == null) {
      Vibration.vibrate()
      setErrorMessage('campo obrigatório*')
    }
  }

  function formatterToNumber(string) {
    return Number(string.replace(',', '.'))
  }

  function imcCalculator() {
    const weightFormatted = formatterToNumber(weight)
    const heightFormatted = formatterToNumber(height)
    return setImc((weightFormatted / (Math.pow(heightFormatted, 2))).toFixed(2))
  }

  function validationImc() {
    if (weight != null && height != null) {
      imcCalculator()
      setHeight(null)
      setWeight(null)
      setMessageImc("Seu imc é igual:")
      setTextButton("Calcular novamente")
      setErrorMessage(null)
      return
    }
    setImc(null)
    verificationImc()
    setTextButton("Calcular")
    setMessageImc("preencha o peso e altura")
  }
  return(
    <Pressable onPress={ Keyboard.dismiss } style={styles.formContext}>
      <View style={styles.form}>
        <Text style={styles.formLabel}>Altura</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setHeight}
          value={height}
          placeholder="Ex. 1.75"
          keyboardType="numeric" />

        <Text style={styles.formLabel}>Peso</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setWeight}
          value={weight}
          placeholder="Ex. 73.65"
          keyboardType="numeric" />

        <TouchableOpacity
          style={styles.buttonCalculator}
          onPress={() => validationImc() }>
            <Text style={styles.textButtonCalculator}>
              {textButton}
            </Text>
        </TouchableOpacity>
      </View>
      <ResultImc
        messageResultImc={messageImc}
        resultImc={imc} />
    </Pressable>
  );
}