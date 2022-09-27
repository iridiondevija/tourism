import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import { Card } from "react-native-paper";
import ContainerView from "../container/ContainerView";
import cardService from "../services/cardsServices";
import Loader from "./Loader";

const { width, height } = Dimensions.get("window");

const AvailabilityCard = ({ route, navigation }) => {
  const { singleCardId } = route.params;
  const [cardAvailabilityPeriod, setCardAvailabilityPeriod] = useState(null);
  const [allValues, setAllValues] = useState({});

  const loadData = async (id) => {
    const response = await cardService.getCardDetailDates(id);
    setCardAvailabilityPeriod(response);
    console.log(response)
  };

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

    const filledDates = enumerateDaysBetweenDates(start, end);
    for (let i = 0; i < filledDates.length; i++) {
      if (i === 0) {
        newMarked[filledDates[i]] = {
          startingDay: true,
          color: "#2CCF98",
          textColor: "white",
        };
      } else if (i === filledDates.length - 1) {
        newMarked[filledDates[i]] = {
          selected: true,
          endingDay: true,
          color: "#2CCF98",
          textColor: "white",
        };
      } else {
        newMarked[filledDates[i]] = {
          selected: true,
          color: "#2CCF98",
          textColor: "white",
        };
      }
    }

    return newMarked;
  };

  const today = moment().format("YYYY-MM-DD");

  useEffect(() => {
    !!singleCardId === true && loadData(singleCardId);
  }, [singleCardId]);

  useEffect(() => {
    cardAvailabilityPeriod !== null &&
      cardAvailabilityPeriod.availabilityPeriod.forEach((element) => {
        let secondstart = markedDates(element.startDate, element.endDate);
        setAllValues((prev) => ({ ...prev, ...secondstart }));
      });
  }, [cardAvailabilityPeriod]);

  return (
    <>
      {cardAvailabilityPeriod === null ? (
        <Loader visible={true} />
      ) : (
        <ContainerView>
          <Card style={styles.card}>
            <Calendar
              hideArrows={false}
              minDate={today}
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
      )}
    </>
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
