import { useFormik } from 'formik';
import React from 'react';
import * as Yup from "yup";
import styles from '../Form/form.module.css';
import emailjs from "emailjs-com";

interface IIssueValue {
    issue: string;
    [key: string]: unknown;
}

export default function Form() {
    const validationSchema = Yup.object().shape({
        issue: Yup.string()
            .required('Проблема обязательна')
            .min(10, 'Проблема должна содержать минимум 10 символов'),
    });

    const formik = useFormik({
        initialValues: {
            issue: ""
        } as IIssueValue,
        validationSchema: validationSchema,
        validateOnChange: false,
        onSubmit: (values, { resetForm }) => {
            emailjs.send('service_0i2osxp', 'template_30j5pr4', values, 'EXJ9v0zal06MiPDfq')
                .then((response) => {
                    console.log('Успешно отправлено!', response.status, response.text);
                    resetForm();
                })
                .catch((error) => {
                    console.error('Ошибка при отправке:', error);
                });
        }
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <textarea className={styles.input}
                    cols={40}
                    rows={10}
                    name="issue"
                    placeholder='Hi what is your problem?'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.issue}
                />
                {formik.touched.issue && formik.errors.issue ? (
                    <div>{formik.errors.issue}</div>
                ) : null}
                <button type="submit" className={styles.btn}>Submit</button>
            </form>
        </div>
    );
}