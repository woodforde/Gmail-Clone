import React from 'react';
import { useHref, useNavigate } from 'react-router-dom';
import './SidebarOption.css';

function SidebarOption({ Icon, title, number }) {
  const navigate = useNavigate();
  let href = useHref();

  return (
    <div 
      onClick={() => navigate(`/${title.toLowerCase()}`)}
      className={`sidebarOption ${(title.toLowerCase() === href.slice(1)) && "sidebarOption--active"}`}>
        <Icon />
        <h3>{title}</h3>
        <p>{number}</p>
    </div>
  );
}

export default SidebarOption;