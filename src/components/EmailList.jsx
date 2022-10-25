import React, { useEffect, useState } from 'react';
import './EmailList.css';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, where, limit } from 'firebase/firestore';

import { Checkbox, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RedoIcon from '@mui/icons-material/Redo';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import SettingsIcon from '@mui/icons-material/Settings';
import InboxIcon from '@mui/icons-material/Inbox';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import Section from './Section';
import EmailRow from './EmailRow';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

function EmailList() {
    const [emails, setEmails] = useState([]);
    const [activeSection, setActiveSection] = useState("Primary");
    const user = useSelector(selectUser) || { email: "" };

    useEffect(() => {
        const emailsRef = collection(db, 'emails');
        const emailQuery = query(emailsRef, where('to', '==', user.email), where('categories', 'array-contains', activeSection), limit(50));
        // orderBy('timestamp', 'desc') cant be implemented because you cannot use an orderBy with a == operator in a query 
        // https://firebase.google.com/docs/firestore/query-data/order-limit-data

        onSnapshot(emailQuery, (snapshot) => {
            setEmails(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        });

    }, [user, activeSection]);

    return (
        <div className="emailList">
            <div className="emailList__settings">
                <div className="emailList__settingsLeft">
                    <Checkbox />
                    <IconButton>
                        <ArrowDropDownIcon />
                    </IconButton>
                    <IconButton>
                        <RedoIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
                <div className="emailList__settingsRight">
                    <IconButton>
                        <ChevronLeftIcon />
                    </IconButton>
                    <IconButton>
                        <ChevronRightIcon />
                    </IconButton>
                    <IconButton>
                        <KeyboardHideIcon />
                    </IconButton>
                    <IconButton>
                        <SettingsIcon />
                    </IconButton>
                </div>
            </div>

            <div className="emailList__sections">
                <Section    
                    Icon={InboxIcon}
                    title="Primary"
                    color="red"
                    selected={activeSection === "Primary"}
                    setActiveSection={setActiveSection}
                />
                <Section
                    Icon={PeopleIcon}
                    title="Social"
                    color="#1A73E8"
                    selected={activeSection === "Social"}
                    setActiveSection={setActiveSection}
                />
                <Section
                    Icon={LocalOfferIcon}
                    title="Promotions"
                    color="green"
                    selected={activeSection === "Promotions"}
                    setActiveSection={setActiveSection}
                />
            </div>

            <div className="emailList__list">
                {emails.map(({ id, data: { to, subject, message, timestamp, starred } }) => (
                    <EmailRow
                        key={id}
                        id={id}
                        title={to}
                        subject={subject}
                        description={message}
                        time={new Date(timestamp?.seconds * 1000).toUTCString()}
                        starred={starred}
                    />
                ))}
            </div>
        </div>
    );
}

export default EmailList;