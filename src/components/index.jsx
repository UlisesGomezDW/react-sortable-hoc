import React from "react";
import BarCode from "react-barcode";
import firebase from "firebase";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MyDocument } from "./document";
export class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataImage: "",
      url: ""
    };
    this.myRef = React.createRef();
  }
  Generate = () => {
    let self = window.self;
    const ref = this.myRef.current.refs.renderElement;
    var svgString = new XMLSerializer().serializeToString(ref);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var DOMURL = self.URL || self.webkitURL || self;
    var img = new Image();
    var svg = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    var url = DOMURL.createObjectURL(svg);
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      var png = canvas.toDataURL("image/png");
      DOMURL.revokeObjectURL(png);
      localStorage.setItem("data", png);
    };
    img.src = url;
    const dataImg = localStorage.getItem("data");
    const storageRef = firebase
      .storage()
      .ref(`codes/${Math.floor(Math.random() * 100)}.png`);
    const task = storageRef.putString(dataImg, "data_url");
    task.on(
      "state_changed",
      snapshot => {},
      err => {},
      () => {
        task.snapshot.ref.getDownloadURL().then(url => {
          this.setState({ url: url });
          alert("Hola uwu");
        });
      }
    );
    localStorage.removeItem("data");
  };
  // message = url => {

  //   );
  // };
  render() {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <p>Original</p>
          <BarCode ref={this.myRef} value="149709578955" />
          <canvas id="canvas" width="222px" height="142px" />
        </div>
        <button onClick={this.Generate}>Generar</button>

        <PDFDownloadLink
          document={<MyDocument imageURL={this.state.url} />}
          fileName="movielist.pdf"
          style={{
            textDecoration: "none",
            padding: "10px",
            color: "#4a4a4a",
            backgroundColor: "#f2f2f2",
            border: "1px solid #4a4a4a"
          }}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download Pdf"
          }
        </PDFDownloadLink>
      </div>
    );
  }
}
