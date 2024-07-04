import React, { useEffect, useState } from 'react';
import {
    Form,
    FormGroup,
    FormFeedback,
    Label,
    Input,
    Button,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const initialForm = {
    email: '',
    password: '',
    terms: false,
};

const initialErrors = {
    email: true,
    password: true,
    terms: true,
};

const errorMessages = {
    email: 'Please enter a valid email address',
    password: 'Password must be at least 4 characters long',
};

export default function Login() {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState(initialErrors);
    const [isValid, setIsValid] = useState(false);

    const history = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .trim()
            .match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim);
    };

    const handleChange = (event) => {
        let { name, value, type } = event.target;
        value = type === 'checkbox' ? event.target.checked : value.trim();
        setForm({ ...form, [name]: value });

        // tek tek bütün alanları kontrol edip, hata varsa hata statini güncelleyeceğim

        if (
            (name === 'email' && validateEmail(value)) ||
            (name === 'password' && value.length >= 4) ||
            (name === 'terms' && value)
        ) {
            // hata olmadığı durum
            setErrors({ ...errors, [name]: false });
        } else {
            setErrors({ ...errors, [name]: true });
        }
    };

    useEffect(() => {
        // her hangi bir alan güncellenmesi tamamlandığındai formda herhangi bir hata var mı diye bakıp isValid'i güncellemeliyim

        if (errors.email || errors.password || errors.terms) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }, [errors]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isValid) {
            axios
                .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
                .then((res) => {
                    const user = res.data.find(
                        (item) => item.password == form.password && item.email == form.email
                    );
                    if (user) {
                        setForm(initialForm);
                        history.push('/main');
                    } else {
                        history.push('/error');
                    }
                });
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    onChange={handleChange}
                    value={form.email}
                    invalid={errors.email}
                />
                {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                    id="examplePassword"
                    name="password"
                    placeholder="Enter your password "
                    type="password"
                    onChange={handleChange}
                    value={form.password}
                    invalid={errors.password}
                />
                {errors.password && (
                    <FormFeedback>{errorMessages.password}</FormFeedback>
                )}
            </FormGroup>
            <FormGroup check>
                <Input
                    id="terms"
                    name="terms"
                    checked={form.terms}
                    type="checkbox"
                    onChange={handleChange}
                    invalid={errors.terms}
                />{' '}
                <Label htmlFor="terms" check>
                    I agree to terms of service and privacy policy
                </Label>
            </FormGroup>
            <FormGroup className="text-center p-4">
                <Button disabled={!isValid} color="primary">
                    Sign In
                </Button>
            </FormGroup>
        </Form>
    );
}
