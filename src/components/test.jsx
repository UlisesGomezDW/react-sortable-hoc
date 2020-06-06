import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "./style.css";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

const SortableItem = SortableElement(({ value }) => {
  return (
    <div className="item">
      <p>{value.name}</p>
    </div>
  );
});

const SortbaleList = SortableContainer(({ items }) => {
  return (
    <div className="container-item">
      {items.map((value, index) => (
        <SortableItem key={index} index={index} value={value} />
      ))}
    </div>
  );
});

const Test = () => {
  const [list, setList] = useState([]);
  const [id, setId] = useState("");
  const onSortEnd = ({ oldIndex, newIndex }) => {
    let dataCopy = [...list];
    let ListVisit = arrayMove(dataCopy, oldIndex, newIndex);
    setList(ListVisit);
    firebase
      .firestore()
      .collection("Visits")
      .doc(id)
      .update({ ListVisit })
      .then(() => console.log("Actualizado"))
      .catch(() => console.error("No funcionó"));
  };
  useEffect(() => {
    let isMounted = true;
    firebase
      .firestore()
      .collection("Visits")
      .onSnapshot(dates => {
        dates.forEach(list => {
          if (isMounted) {
            setList(list.data().ListVisit);
            setId(list.id);
          }
        });
      });
    return () => {
      isMounted = false;
    };
  }, []);
  return <SortbaleList items={list} onSortEnd={onSortEnd} />;
};
export default Test;
