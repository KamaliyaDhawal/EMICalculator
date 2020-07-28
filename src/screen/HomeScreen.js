import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import Slider from '@react-native-community/slider';
import RNPickerSelect from 'react-native-picker-select';

import { BackHandler } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const [termIn, setTermIn] = useState('year');
    const [intrest, setIntrest] = useState(8.25);
    let [amount, setAmount] = useState(0);
    const [term, setTerm] = useState(0);

    BackHandler.addEventListener('hardwareBackPress', () => {
        alert('This is test');
    });

    const calculate = () => {
        if (amount === '' || amount === undefined || amount <= 0 || isNaN(amount) ||
            intrest === '' || intrest === undefined || intrest <= 0 ||
            term === '' || term === undefined || term <= 0 || isNaN(term) ||
            termIn === '' || termIn === undefined || termIn === null) {
            alert('Please enter valid value');
        } else {
            let numberOfMonths = term;
            if (termIn === 'year') {
                const loanTermArray = term.toString().split('.');
                numberOfMonths = Math.floor(term) * 12;
                if (loanTermArray.length > 1) {
                    const precisionVal = parseInt(loanTermArray[1]);
                    if (precisionVal >= 1 && precisionVal <= 12) {
                        numberOfMonths += precisionVal;
                    } else {
                        alert('Loan Term entered is incorrect!');
                        return false;
                    }
                }
            }
            const monthlyInterestRatio = (intrest / 100) / 12;
            const top = Math.pow((1 + monthlyInterestRatio), numberOfMonths);
            const bottom = top - 1;
            const sp = top / bottom;
            let emi = ((amount * monthlyInterestRatio) * sp);
            let full = numberOfMonths * emi;
            let intrestAmount = full - amount;
            const int_pge = (intrestAmount / full) * 100;
            const intPerOnTotal = (intrestAmount * 100) / full;
            const amtPerOnTotal = (amount * 100) / full;

            emi = emi.toFixed(2).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            amount = amount.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            full = full.toFixed(2).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            intrestAmount = intrestAmount.toFixed(2).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            navigation.navigate('Result', {
                amount,
                intrest,
                numberOfMonths,
                emi,
                intrestAmount,
                full,
                intPerOnTotal,
                amtPerOnTotal
            });
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>Loan Amount</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={amount}
                    onChangeText={
                        (item) => {
                            setAmount(+item);
                        }
                    }
                />

                <Text style={styles.textStyle}>Intrest Rate(%): {intrest}</Text>
                <Slider
                    style={{ height: 50 }}
                    maximumValue={20}
                    minimumValue={0}
                    minimumTrackTintColor="#286EF6"
                    maximumTrackTintColor="#D9E6F3"
                    step={0.25}
                    thumbTintColor='#286EF6'
                    value={intrest}
                    onValueChange={(item) => {
                        setIntrest(item)
                    }
                    }
                />

                <Text style={styles.textStyle}>Loan Term (Ex: For 1 year and 11 month add 1.11 year or 23 month)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={
                        (item) => {
                            setTerm(+item)
                        }
                    }
                />

                <Text style={styles.textStyle}>Loan Term In: {termIn}</Text>
                <RNPickerSelect
                    value={termIn}
                    style={{ ...pickerSelectStyles }}
                    onValueChange={(value) => setTermIn(value)}
                    items={[
                        { label: 'Year(s)', value: 'year' },
                        { label: 'Month(s)', value: 'month' },
                    ]}
                />
                <TouchableOpacity style={{
                    ...styles.input,
                    ...styles.buttonStyle
                }}
                    onPress={
                        () => {
                            calculate();
                            // navigation.navigate('Result')
                        }
                    }
                >
                    <Text style={styles.buttonTextStyle}>Calculate</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback >
    )
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        backgroundColor: '#D9E6F3',
        borderRadius: 8,
        height: 44,
        marginTop: 10,
        marginBottom: 24,
        paddingHorizontal: 15,
        fontSize: 20
    },
    inputAndroid: {
        backgroundColor: '#D9E6F3',
        borderRadius: 8,
        height: 44,
        marginTop: 10,
        marginBottom: 24,
        paddingHorizontal: 15,
        fontSize: 20
    },
});

const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: '#F2F5F8',
        padding: 25,
        paddingTop: 80,
        flex: 1
    },
    textStyle: {
        fontSize: 18,
        color: '#79797A',
    },
    input: {
        backgroundColor: '#D9E6F3',
        borderRadius: 8,
        height: 44,
        marginTop: 10,
        marginBottom: 24,
        paddingHorizontal: 15,
        fontSize: 24
    },
    buttonStyle: {
        height: 50,
        backgroundColor: '#286EF6',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    buttonTextStyle: {
        color: '#fff',
        fontSize: 24
    }
});

export default HomeScreen;
