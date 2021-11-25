import React, { useEffect } from "react";
import config from "./config.json";
import Quagga from "quagga";

export default function Scanner({newScann}) {
    useEffect(() => {
        
        //barcode scanner init
        Quagga.init(config, (err) => {
            if (err) {
                console.log(err, "Quagga error message");
            }
            Quagga.start();
            return () => {
                Quagga.stop();
            };
        });

        Quagga.onDetected((res) => {
            newScann(res.codeResult.code)
        });
    }, []);

    return (
        // If you do not specify a target,
        // QuaggaJS would look for an element that matches
        // the CSS selector #interactive.viewport
        <div id="interactive" className="viewport" />
    );
};


