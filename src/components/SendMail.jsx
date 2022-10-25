import React from 'react';
import './SendMail.css'

import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { closeSendMessage } from '../features/mailSlice';
import { selectUser } from '../features/userSlice';

import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

function SendMail() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (formData) => {
        // console.log(formData);
        await addDoc(collection(db, 'emails'), {
            to: formData.to,
            from: user.email,
            subject: formData.subject,
            message: formData.message,
            timestamp: serverTimestamp(),
            categories: formData.category === "" ? ["Primary"] : ["Primary", formData.category],
            important: false,
            starred: false,
            opened: false,
        }).then(() => {
            dispatch(closeSendMessage());
        }).catch((err) => alert(err.message));

        // to: string,
        // from: string,
        // subject: string,
        // message:string,
        // timestamp: timestamp,
        // categories: [string],
        // important: boolean default false
        // starred: boolean default false
        // opened: boolean default false

    };

    return (
        <div className="sendMail">
            <div className="sendMail__header">
                <h3>New Message</h3>
                <CloseIcon
                    onClick={() => dispatch(closeSendMessage())}
                    className="sendMail__close"
                />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    name="to"
                    placeholder="To" 
                    type="email"
                    {...register("to", { required: true })}
                />
                {errors.to && <p className="sendMail__error">To is Required!</p>}
                <input
                    name="subject"
                    placeholder="Subject"
                    type="text"
                    {...register("subject", { required: true })}
                />
                <select
                    name="category"
                    defaultValue=""
                    {...register("category")}
                >
                    <option value="">Choose a category (optional)</option>
                    <option value="Social">Social</option>
                </select>
                {errors.subject && <p className="sendMail__error">Subject is Required!</p>}
                <textarea
                    name="message"
                    className="sendMail__message" 
                    placeholder="Message..." 
                    type="text"
                    {...register("message", { required: true })}
                />
                {errors.message && <p className="sendMail__error">Message is Required!</p>}
                <div className="sendMail__options">
                    <Button
                        className="sendMail__send"
                        variant="contained"
                        color="primary"
                        type="submit"
                    >Send</Button>
                </div>
            </form>
        </div>
    );
}

export default SendMail;