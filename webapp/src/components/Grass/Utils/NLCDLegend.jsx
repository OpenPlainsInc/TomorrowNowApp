/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Utils/NLCDLegend.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Monday, May 2nd 2022, 3:33:26 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */


import React, {useState, useEffect } from "react"
import Accordion from 'react-bootstrap/Accordion'
import ListGroup from "react-bootstrap/ListGroup"
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import './nlcd-legend.scss'

const NLCDLegend = ({categories, family=false}) => {
  // on component mount
  const [color, setColor] = useState('category_color')
  const [label, setLabel] = useState('category_label')
  const [category, setCategory] = useState('category')
  const [data, setData] = useState([])
  const [families, setFamilies] = useState([])
//   const decoratedOnClick = useAccordionButton(eventKey, onClick);

  const familyColor = (familyName) => {
      return categories.find(c => c.family_label === familyName).family_color
  }

  const familyId = (familyName) => {
    return categories.find(c => c.family_label === familyName).family
  }

  useEffect(()=> {
    console.log("NLCDLegend", categories)
    if (family) {
        let tmpFamilies = new Set(categories.map(f => f.family_label))
        console.log("tmpFamilies", tmpFamilies)

        // Convert set to an array to have access to map 
        setFamilies([...tmpFamilies])
        // setColor('family_color')
        // setLabel('family_label')
        // setCategory('family')
    }
  }, [family, categories])

  useEffect(()=> {
   

   console.log("Cat Families: ", families)

   setData(categories)
  }, [categories, families])

  return (
    <Accordion bsPrefix="grass-nlcd-legend">
    { family === true ? <div>
        {
            families.map((f, idx)=> {
                return(
                    <Accordion.Item key={idx} eventKey={f}>
                        <Accordion.Button 
                            style={{
                                backgroundColor: familyColor(f),
                                color: 'black'
                            }}>{`(${familyId(f)}) ${f}`}
                        </Accordion.Button>
                        <Accordion.Body>
                            <Accordion>
                                {
                                    data.filter(d => d.family_label === f).map((c, idy) => {
                                        return(
                                            <Accordion.Item key={idy} eventKey={c[category]}>
                                                <Accordion.Button style={{
                                                        backgroundColor: c[color],
                                                        color: 'black'
                                                        }}>{`(${c[category]}) ${c[label]}`}
                                                </Accordion.Button>
                                                <Accordion.Body>
                                                    {c.description}
                                                </Accordion.Body> 
                                            </Accordion.Item>
                                        )
                                    })
                                }
                            </Accordion>
                        </Accordion.Body>     
                    </Accordion.Item>
                )
            })
        }
    </div>
        :
        <div>
        {
            data.map((c, idx) => {
                return(
                    <Accordion.Item key={idx} eventKey={c[category]}>
                        <Accordion.Button style={{
                                backgroundColor: c[color],
                                color: 'black'
                                }}>{`(${c[category]}) ${c[label]}`}
                        </Accordion.Button>
                        <Accordion.Body>
                            {c.description}
                        </Accordion.Body>
                            
                    </Accordion.Item>
                )
            })
        }
        </div>
      

    }
     </Accordion>
  )



}
export default NLCDLegend;
