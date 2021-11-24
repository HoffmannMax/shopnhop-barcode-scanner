import React, { useEffect } from "react";
import config from "./config.json";
import Quagga from "quagga";

const Scanner = props => {


  useEffect(() => {
    Quagga.init(config, err => {
      if (err) {
        console.log(err, "error msg");
      }
      Quagga.start();
      return () => {
        Quagga.stop()
      }
    });

    Quagga.onDetected(res =>{
        console.log(res.codeResult.code)
    });
  }, []);

  

  return (
    // If you do not specify a target,
    // QuaggaJS would look for an element that matches
    // the CSS selector #interactive.viewport
    <div id="interactive" className="viewport" />
  );
};

export default Scanner;
