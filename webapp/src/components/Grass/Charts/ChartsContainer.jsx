/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Charts/ChartsContainer.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Wednesday, May 11th 2022, 1:18:57 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */

import React, { useState } from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import InputGroup from "react-bootstrap/InputGroup"
import {ChartTypes} from "./ChartTypes"


export const ChartsContainer = ({children, options, data, colorMap, defaultValue = ChartTypes.LINE}) => {
    const [value, setValue] = useState(defaultValue)
    const handleChangeEvent = e => {
        setValue(e.target.value)
    }

    return (
        <Container>
            <Row>
                <InputGroup className="mb-3" style={{marginTop: 20}}>
                    <InputGroup.Text id="basic-addon1">Select Chart</InputGroup.Text>
                    <Form.Control as="select" value={value} onChange={handleChangeEvent}>
                    {options ? options.map((c) => {
                            return(
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            )
                        }) : []
                    }
                    </Form.Control>
                </InputGroup>
            </Row>
            <Row>
                {
                    React.Children.map(children, child => {
                        if (React.isValidElement(child)) {
                        return React.cloneElement(child, {'chartType' : value, data, colorMap})
                        }
                        return child
                    })
                }
            </Row>
        </Container>
      )


}