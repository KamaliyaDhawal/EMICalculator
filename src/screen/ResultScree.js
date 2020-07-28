import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory-native';

const ResultScreen = ({ navigation, route }) => {
    const intPerOnTotal = route.params.intPerOnTotal;
    const amtPerOnTotal = route.params.amtPerOnTotal;
    const graphicData = [
        { y: intPerOnTotal, x: '50%' },
        { y: amtPerOnTotal, x: '90%' }
    ];


    return (
        <View style={styles.viewStyle}>
            <View style={styles.viewBox}>
                <Text style={styles.title}>EMI</Text>
                <Text style={styles.subTitle}>{route.params.numberOfMonths} Month(s) *</Text>
                <Text style={[styles.title, styles.amount]}>{route.params.emi}</Text>
            </View>

            <View style={styles.viewBox}>
                <Text style={styles.title}>Total Payment</Text>
                <Text style={[styles.title, styles.amount, { marginBottom: -20 }]}>{route.params.full}</Text>

                <VictoryPie
                    data={graphicData}
                    width={250}
                    height={250}
                    innerRadius={50}
                    colorScale={['#3055A8', '#EC3F78']}
                    style={{
                        labels: {
                            fill: 'white', fontSize: 15, padding: 7,
                        },
                    }}
                />

                <Text style={{
                    position: 'absolute',
                    bottom: '11%',
                    left: '10%',
                    color: '#EC3F78',
                    fontSize: 16,
                    fontWeight: 'bold'
                }}> Amount </Text>
                <Text style={{
                    position: 'absolute',
                    bottom: '5%',
                    left: '10%',
                    color: '#EC3F78',
                    fontSize: 18
                }}> {route.params.amount} </Text>

                <Text style={{
                    position: 'absolute',
                    bottom: '11%',
                    right: '10%',
                    color: '#3055A8',
                    fontSize: 16,
                    fontWeight: 'bold'
                }}> Intrest </Text>
                <Text style={{
                    position: 'absolute',
                    bottom: '5%',
                    right: '10%',
                    color: '#3055A8',
                    fontSize: 18
                }}> {route.params.intrestAmount} </Text>

            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: '#F2F5F8',
        padding: 25,
        paddingTop: 40,
        flex: 1
    },
    viewBox: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 8, },
        shadowColor: '#D5DAF1',
        shadowOpacity: 2.0,
    },
    title: {
        fontSize: 20,
        color: '#767676',
        fontWeight: 'bold'
    },
    subTitle: {
        marginTop: 20,
        fontSize: 18,
        color: '#767676'
    },
    amount: {
        color: 'black',
        marginVertical: 20
    }
});

export default ResultScreen;