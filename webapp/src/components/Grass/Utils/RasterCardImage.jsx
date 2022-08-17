/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Utils/RasterCardImage.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Wednesday, April 20th 2022, 5:21:38 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import React, { useState, useEffect } from "react"
import Spinner from "react-bootstrap/Spinner"
import Grass from "../grass";
import Card from "react-bootstrap/Card"
import Image from "react-bootstrap/Image"


const RasterCardImage = ({rasterName, mapsetName, locationName, card=true}) => {
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const abortController = new AbortController()
        async function fetchImage() {
            try {
                const data = await Grass.d.renderRaster(locationName, mapsetName, rasterName, abortController)
                console.log("image response:", data)
                data.response.imgurl = `data:image/png;base64,${data.response.imagedata}`
                const rasterImage = data.response
                setImage(rasterImage)
               
                setLoading(false)
              } catch (e) {
                console.log(e);
            }
            return () => { abortController.abort() }
          }
          fetchImage()
      },[rasterName, mapsetName, locationName])

     
      return (
        <>
            {
                loading ? 
                <Spinner as="span" animation="border" role="status" variant="secondary" className="bg-dark text-light" >
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                :
                card ? <Card.Img as="img" variant="top" src={image ? image.imgurl : ""} className="bg-dark text-light"/> :
                <Image as="img" fluid={true} src={image ? image.imgurl : ""} className="bg-dark text-light"></Image>
            }
        </>
      )

};

export default RasterCardImage