import React, { Component } from "react";
import { View, StyleSheet ,FlatList} from "react-native";
import LeadsCard from "../../component/home/LeadsCard";
import { R } from "../../res";

const data = [
	{
		id: 1,
		name: "Mittal Commercial",
		area: "1120 sq. ft",
		rent: "70,000",
		address:"Commercial - Office space in Marol",
		clientName: "Suraj Vishw",
		clientNo: "9876543210",
		isMeetingScheduled: true,
		meetingTime: "10:00 AM",
	},
	{
		id: 2,
		name: "Mittal Commercial",
		area: "1120 sq. ft",
		rent: "70,000",
		address:"Commercial - Office space in Marol",
		clientName: "Suraj Vishw",
		clientNo: "9876543210",
		isMeetingScheduled: true,
		meetingTime: "12:00 AM",
	},
	{
		id: 3,
		name: "Mittal Commercial",
		area: "1120 sq. ft",
		rent: "70,000",
		address:"Commercial - Office space in Marol",
		clientName: "Suraj Vishw",
		clientNo: "9876543210",
		isMeetingScheduled: true,
		meetingTime: "2:00 PM",
	},
];
export default class ScheduleContainer extends Component {
  render() {
    return (
			<View style={styles.root}>
				<FlatList
					data={data}
					renderItem={LeadsCard}
					keyExtractor={(item) => item.id}
				/>
			</View>
		);
  }
}

const styles = StyleSheet.create({
	root: {
        paddingBottom: R.units.scale(45),
	},
});
