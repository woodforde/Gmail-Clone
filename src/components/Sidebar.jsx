import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import SidebarOption from './SidebarOption';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InboxIcon from '@mui/icons-material/Inbox';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import NearMeIcon from '@mui/icons-material/NearMe';
import NoteIcon from '@mui/icons-material/Note';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import DuoIcon from '@mui/icons-material/Duo';
import PhoneIcon from '@mui/icons-material/Phone';
import { useDispatch } from 'react-redux';
import { openSendMessage } from '../features/mailSlice';
import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useHref, useParams } from 'react-router-dom';

function Sidebar() {
    const dispatch = useDispatch();

    const [counts, setCounts] = useState([]);

    const [inboxCount, setInboxCount] = useState(0);
    const [starredCount, setStarredCount] = useState(0);
    const [importantCount, setImportantCount] = useState(0);

    let href = useHref();

    useEffect(() => {
        const emailsRef = collection(db, 'emails');
        getCount(emailsRef)
    }, []);

    const getCount = async (emailsRef) => {
        const queries = [
            {type: "inbox", query: query(emailsRef, where('opened', '==', false))},
            {type: "starred", query: query(emailsRef, where('opened', '==', false), where('starred', '==', true))},
            {type: "important", query: query(emailsRef, where('opened', '==', false), where('important', '==', true))},
        ]
        // const inboxQuery = query(emailsRef, where('opened', '==', false));
        // const starredQuery = query(emailsRef, where('opened', '==', false), where('starred', '==', true));
        // const importantQuery = query(emailsRef, where('opened', '==', false), where('important', '==', true));

        const countList = await Promise.all(
            queries.map(async (query) => ({
                type: query.type,
                snapshot: await getCountFromServer(query.query),
            }))
        );

        countList.map((result) => {
            if (result.type === "inbox") setInboxCount(result.snapshot.data().count);
            if (result.type === "starred") setStarredCount(result.snapshot.data().count);
            if (result.type === "important") setImportantCount(result.snapshot.data().count);
        })

        // console.log(inboxCount)
        // const snapshot = await getCountFromServer(inboxQuery);
        // setInboxCount(snapshot.data().count);
    }

  return (
    <div className="sidebar">
        <Button
            onClick={() => dispatch(openSendMessage())}
            className="sidebar__compose"
            startIcon={<AddIcon fontSize="large" />}
        >Compose</Button>

        <SidebarOption Icon={InboxIcon} title="Inbox" number={inboxCount} />
        <SidebarOption Icon={StarIcon} title="Starred" number={starredCount} />
        <SidebarOption Icon={AccessTimeIcon} title="Snoozed" number={0} />
        <SidebarOption Icon={LabelImportantIcon} title="Important" number={importantCount} />
        <SidebarOption Icon={NearMeIcon} title="Sent" number={""} />
        <SidebarOption Icon={NoteIcon} title="Drafts" number={0} />
        <SidebarOption Icon={ExpandMoreIcon} title="More" number={""} />

        <div className="sidebar__footer">
            <div className="sidebar__footerIcons">
                <IconButton>
                    <PersonIcon />
                </IconButton>
                <IconButton>
                    <DuoIcon />
                </IconButton>
                <IconButton>
                    <PhoneIcon />
                </IconButton>
            </div>
        </div>
    </div>
  );
}

export default Sidebar;