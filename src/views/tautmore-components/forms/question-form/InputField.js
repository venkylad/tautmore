import React from 'react';
import { Field } from "formik";
import {Label} from "reactstrap";

const InputField = ({labelfor, name, id, labelname, value, handleChange, type,  placeholder}) => {
    
    return (
        <div>
            <Label for={labelfor}>{labelname}</Label>
            <Field
                type={type}
                className="form-control"
                name={name}
                id={id}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
            />
        </div>
    )
}

export default InputField
