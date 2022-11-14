/*
 * Filename: LikertScaleSelect.js
 * Project: TomorrowNow
 * File Created: Sunday November 13th 2022
 * Author: Corey White (smortopahri@gmail.com)
 * Maintainer: Corey White
 * -----
 * Last Modified: Sun Nov 13 2022
 * Modified By: Corey White
 * -----
 * License: GPLv3
 * 
 * Copyright (c) 2022 TomorrowNow
 * 
 * TomorrowNow is an open-source geospatial participartory modeling platform
 * to enable stakeholder engagment in socio-environmental decision-makeing.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 * 
 */

import Form from 'react-bootstrap/Form'
import {useForm, Controller, useFormContext} from "react-hook-form";

// const testResponse = [
//     {value: -0.99, text: "Highly Decrease Likelihood of Development"},
//     {value: -0.5, text: "Decrease Likelihood of Development"},  
//     {value: 0.0, text: "Status Quo"},
//     {value: 0.5, text: "Increase Likelihood of Development"},
//     {value: 0.99, text: "Highly Increase Likelihood of Development"}
// ]


export const LikertScaleSelect = ({label, responses, formKey, required=true}) => {
    let methods = useFormContext()

    const inputName = (key, inputText) => {
        return `${key}.${inputText.toLowerCase().replaceAll(' ', '_')}`
    }

    return (
        <Form.Group className="mb-12" controlId={`likertgroup-${formKey}`}>
            <Form.Label><div className="fw-bold">{label}</div></Form.Label>
            { responses.map(option => {
                return (
                    <Controller key={`inline-${inputName(label, option.text)}`}
                        control={methods.control}
                        name={formKey}
                        defaultValue="" 
                        rules={{ required: required }}
                        render={({ field: { onChange, onBlur, value, ref } }) => (  
                            <Form.Check
                                inline={true}
                                ref={ref}
                                type="radio"
                                name={`likertGroup.${formKey}`}
                                label={option.text}
                                value={option.value}
                                onChange={(e)=> {
                                    onChange(e)
                                    // handleChange(value, formKey)
                                }
                                }
                                // multiple={false}
                                autoFocus/>
                            )}
                    />
                )
            })}
        </Form.Group>
    )
}