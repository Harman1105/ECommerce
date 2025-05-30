import { text } from "express";

export const registerFormControls = [
    {
        name:'username',
        label:'User Name',
        placeholder: 'Enter your username',
        componentType:'input',
        type:'text'
    },
    {
        name:'email',
        label:'Email',
        placeholder: 'Enter your email',
        componentType:'input',
        type:'email'
    },
    {
        name:'password',
        label:'Password',
        placeholder: 'Enter your password',
        componentType:'input',
        type:'password'
    }
]