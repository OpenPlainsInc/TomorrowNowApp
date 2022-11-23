/*
 * Filename: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp/src/components/Grass/Modules/ModuleForm.jsx
 * Path: /home/coreywhite/Documents/GitHub/TomorrowNow/TomorrowNowApp/webapp
 * Created Date: Thursday, May 5th 2022, 9:24:24 pm
 * Author: Corey White
 * 
 * Copyright (c) 2022 Corey White
 */
import {useForm} from "react-hook-form";
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ModuleStringParam from './Inputs/ModuleStringParam'
import ModuleBooleanParam from './Inputs/ModuleBooleanParam';
import ModuleArrayParam from './Inputs/ModuleArrayParam';
import ModuleNumberParam from './Inputs/ModuleNumberParam';
import ModuleIntegerParam from "./Inputs/ModuleIntegerParam";

export const ModuleForm = ({moduleName, moduleParams}) => {
    const { handleSubmit, control, reset } = useForm();
    const onSubmit = data => {
        console.log("Form Data:", data);
    }

    const formInputFromSchema = (param) => {
        let schemaType = param.schema.type
        let key = `${param.name}_${schemaType}`
        console.log("formInputFromSchema: ", schemaType)
        if (schemaType === 'string') return <ModuleStringParam key={key} param={param} control={control}/>;
        if (schemaType === 'boolean') return <ModuleBooleanParam key={key} param={param} control={control}/>;
        if (schemaType === 'array') return <ModuleArrayParam key={key} param={param} control={control}/>;
        if (schemaType === 'integer') return <ModuleIntegerParam key={key} param={param} control={control}/>;
        if (schemaType === 'number') return <ModuleNumberParam key={key} param={param} control={control}/>;

        return null;
    }

    return(
        
        <Form ref={moduleName} onSubmit={handleSubmit(onSubmit)}>
            { 
                moduleParams.map((p) => { 
                    return(       
                      <Col key={p.name} md={6}>
                          {formInputFromSchema(p)}
                      </Col>     
                    )
                  })
            }
            <Button variant="secondary" type="submit">Run</Button>
        </Form>
        
    )
}
