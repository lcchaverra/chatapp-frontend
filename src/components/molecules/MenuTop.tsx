import React, { useContext, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from "primereact/button";
import { useNavigate } from 'react-router-dom';
import { PrimeReactContext } from 'primereact/api';
import Logo from '../../assets/logo.png';

const MenuTop = () => {
    const navigation = useNavigate();

    const handleLogut = () => {
        localStorage.removeItem("token");
        navigation("/login");
    }

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
    ];

    const start = 
    (
        <div className="flex align-items-center pr-4">
            <img alt="logo" src={Logo} height="40" className="mr-2"></img>
        </div>
    )
    const end = (
        <div className="flex align-items-center gap-2">
            {/* <Button icon="pi pi-moon" rounded text raised severity="secondary" aria-label="moon" onClick={handleChangeTheme} /> */}
            <Button icon="pi pi-user" rounded text raised severity="warning" aria-label="User" />
            <Button icon="pi pi-sign-out" rounded text raised severity="warning" onClick={handleLogut}  />
        </div>
    );

  return (
    <div className="card">
    <Menubar model={items} start={start} end={end} />
    </div>
  )
}

export default MenuTop