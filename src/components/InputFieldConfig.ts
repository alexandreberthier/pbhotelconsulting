import {ref} from "vue";
import type {Ref} from "vue";

export enum InputType {
    Name = 'name',
    Organization = 'organization',
    Email = 'email',
    Phone = 'phone',
    TextArea = 'textarea'
}

export interface Config {
    label: string,
    type: string,
    placeholder: string,
    autocomplete: string
    validate?: (input: string) => boolean,
    error?: string
}

export function validateMail(input: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
}

export function validatePhone(input: string) {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(input);
}

export function validateLength(input:string){
    return input.length > 0
}

export const inputConfig: Ref<Record<InputType, Config>> = ref({
    [InputType.Name]: {
        label: 'name',
        type: 'text',
        placeholder: 'Name',
        autocomplete: 'given-name',
        validate: validateLength,
        error: 'Can`t be empty'
    },
    [InputType.Organization]: {
        label: 'organization',
        type: 'text',
        placeholder: 'Organization',
        autocomplete: 'organization',
        validate: validateLength,
        error: 'Can`t be empty'
    },
    [InputType.Email]: {
        label: 'email',
        type: 'email',
        placeholder: 'E-Mail',
        autocomplete: 'email',
        validate: validateMail,
        error: 'Invalid Email'
    },
    [InputType.Phone]: {
        label: 'phone',
        type: 'tel',
        placeholder: 'Phone',
        autocomplete: 'tel',
        validate: validatePhone,
        error: 'Invalid Phone'
    },
    [InputType.TextArea]: {
        label: 'message',
        type: 'textarea',
        placeholder: 'Message',
        autocomplete: 'off',
        validate: validateLength,
        error: 'Can`t be empty'
    }
})