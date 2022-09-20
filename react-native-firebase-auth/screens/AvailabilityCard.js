import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import { Card } from "react-native-paper";
import ContainerView from "../container/ContainerView";

const { width, height } = Dimensions.get("window");

const AvailabilityCard = ({ route, navigation }) => {
  const { item } = route.params;

  const { period } = item.elements;

  const [allValues, setAllValues] = useState({});

  const enumerateDaysBetweenDates = (startDate, endDate) => {
    const now = moment(startDate).clone();
    const dates = [];

    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format("YYYY-MM-DD"));
      now.add(1, "days");
    }
    return dates;
  };

  const markedDates = (start, end) => {
    const newMarked = {};

    const test = enumerateDaysBetweenDates(start, end);
    for (let i = 0; i < test.length; i++) {
      if (i === 0) {
        newMarked[test[i]] = {
          startingDay: true,
          color: "#2CCF98",
          textColor: "white",
        };
      } else if (i === test.length - 1) {
        newMarked[test[i]] = {
          selected: true,
          endingDay: true,
          color: "#2CCF98",
          textColor: "white",
        };
      } else {
        newMarked[test[i]] = {
          selected: true,
          color: "#2CCF98",
          textColor: "white",
        };
      }
    }

    return newMarked;
  };

  useEffect(() => {
    period.forEach((element) => {
      let secondstart = markedDates(element.startDate, element.endDate);
      setAllValues((prev) => ({ ...prev, ...secondstart }));
    });
  }, []);

  return (
    <ContainerView >
      <Card style={styles.card}>
        <Calendar
          hideArrows={false}
          minDate={"1996-05-10"}
          maxDate={"2030-05-30"}
          monthFormat={"MMMM yyyy "}
          markingType={"period"}
          markedDates={allValues}
          enableSwipeMonths={true}
          theme={{
            dayTextColor: "#1F1F1F",
            textSectionTitleColor: "#1F1F1F",
            textDayFontWeight: "500",
            textMonthFontWeight: "700",
            textDayHeaderFontWeight: "500",
            textDayFontSize: 16,
            textMonthFontSize: 24,
            textDayHeaderFontSize: 18,
            arrowColor: "#000000",
            arrowStyle: {
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
            },
            calendarBackground: "transparent",
          }}
        />
      </Card>
    </ContainerView>
  );
};

export default AvailabilityCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 32,
    paddingHorizontal: 10,
    height: height / 2,
  },
});
