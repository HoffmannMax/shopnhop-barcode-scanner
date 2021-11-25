import React, { useEffect, useState } from "react";
import config from "./config.json";
import Quagga from "quagga";

export default function Scanner({ newScann }) {
    const [cameraPermission, setCameraPermission] = useState(true);


    useEffect(() => {
        //barcode scanner init
        Quagga.init(config, (err) => {
            //
            if (err) {
                if(err.code === 0){
                    //console.log(err, "Quagga error message");
                    //console.log(err.code)
                    setCameraPermission(false);
                }else{
                    console.error(err)
                }
               
            } else {
                Quagga.start();
            }

            return () => {
                Quagga.stop();
            };
        });

        Quagga.onDetected((res) => {
            newScann(res.codeResult.code);
        });
    }, []);

    return (
        // If you do not specify a target,
        // QuaggaJS would look for an element that matches
        // the CSS selector #interactive.viewport
        cameraPermission ? (
            <div id="interactive" className="viewport" />
        ) : (
            
            <div className="flex flex-col justify-center items-center mt-6">
            <h1 className="text-2xl text-red-500">No permission for camera use granted</h1>
        </div>
        )
    );
}
