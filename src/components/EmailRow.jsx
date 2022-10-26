import React from 'react';
import './EmailRow.css';
import { Checkbox, IconButton } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectMail } from '../features/mailSlice';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function EmailRow({ id, title, subject, description, time, starred, important }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { sidebarOption } = useParams();

    const openMail = () => {
        dispatch(
            selectMail({
                id,
                title,
                subject,
                description,
                time,
            })
        );
        navigate(`/${sidebarOption}/${id}`);
    }

    const toggleStarred = async () => {
        const emailRef = doc(db, 'emails', id);
        await updateDoc(emailRef, {
            starred: !starred,
        });
    }

    const toggleImportant = async () => {
        const emailRef = doc(db, 'emails', id);
        await updateDoc(emailRef, {
            important: !important,
        });
    }

    return (
        <div className='emailRow'>
            <div className="emailRow__options">
                <Checkbox />
                <IconButton onClick={toggleStarred}>
                    { starred ? (
                        <StarIcon className='starIcon--active' />
                    ):(
                        <StarBorderOutlinedIcon />
                    )}
                </IconButton>
                <IconButton onClick={toggleImportant}>
                    { important ? (
                        <LabelImportantIcon className='starIcon--active' />
                    ):(
                        <LabelImportantOutlinedIcon />
                    )}
                </IconButton>
            </div>

            <div className='emailRow__info' onClick={openMail}>
                <h3 className="emailRow__title">
                    {title}
                </h3>
                <div className="emailRow__message">
                    <h4>
                        {subject}{" "}
                        <span className="emailRow__description">
                            - {description}
                        </span>
                    </h4>
                </div>
                <p className="emailRow__time">
                    {time}
                </p>
            </div>
        </div>
    );
}

export default EmailRow;