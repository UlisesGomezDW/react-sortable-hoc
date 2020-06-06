import React from "react";
import {
  Page,
  Image,
  Text,
  View,
  Document,
  StyleSheet
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
export const MyDocument = props => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>{props.imageURL}</Text>
      </View>
      <View style={styles.section}>
        <Image source={props.imageURL} />
      </View>
    </Page>
  </Document>
);
