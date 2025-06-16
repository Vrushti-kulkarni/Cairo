import React from 'react'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from './ui/input'

//pls make sure this import statement is correct
import { Controller, FieldValues, Path, Control } from 'react-hook-form'

//input this after defining FormFieldProps with generic T parameter

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string//optional string;
    type?: 'text' | 'email' | 'password' | 'file'

}
//generic T parameter <T>
const FormField = ({ control, name, label, placeholder, type = "text" }: FormFieldProps<T>) => (
    <Controller
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                {/* add class name here later */}
                {/* make label as the one being printed dynamically */}
                <FormLabel className='label'>{label}</FormLabel>
                <FormControl>
                    {/* add class name here later */}
                    <Input
                        className="input"
                        placeholder={placeholder}
                        type={type}
                        {...field} />

                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
);

export default FormField