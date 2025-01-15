import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { BlockUI } from 'primereact/blockui';
import Logo from '../../assets/logo.png';


const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [rol, setRol] = useState('');
    const navigation = useNavigate();
    const toast = React.useRef(null);
    const [loading, setLoading] = useState(false);

    const handleRedirect = () => {
        navigation("/login");
    }

    const handleRegister = async (e:any) => {
        e.preventDefault();

        if(password.length < 8) {
            toast.current.show({
                severity: 'warn',
                summary: 'Contraseña muy corta',
                detail: 'La contraseña debe tener al menos 8 caracteres.',
                life: 3000
            });
            return; 
        }
        const payload = {
            name: name,
            username: username,
            password: password,
            role: rol
        };

        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                const data = await response.json();
                toast.current.show({severity:'success', summary: 'Exitoso', detail:'Inicio de Sesión exitoso', life: 3000});
                localStorage.setItem("token", data.token);
            } else {
                console.error("Error al iniciar sesión:", response.statusText);
                toast.current.show({severity:'error', summary: 'Error', detail:'Usuario o contraseña incorrectos', life: 3000});
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            toast.current.show({severity:'error', summary: 'Error', detail:'Hubo un problema al iniciar sesión. Intenta nuevamente.', life: 3000});
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <BlockUI blocked={loading}>
        <div className="bg-gray-600 py-8 px-4 md:px-6 lg:px-8 w-full h-screen">
        <Toast ref={toast} />
        {
            loading &&
            <div className="flex align-items-center justify-content-center">
                {/* <ProgressSpinner /> */}
            </div>
        }
        <div className="flex align-items-center justify-content-center">
            <form className="surface-card p-4 shadow-2 border-round w-full lg:w-6" method="POST">
                <div className="text-center mb-5">
                    <img src={Logo} alt="Logo" height={50} className="mb-3" />
                    <div className="text-900 text-3xl font-medium mb-3">Bienvenid@ - Registro</div>
                    <span className="text-600 font-medium line-height-3">¿No tienes una cuenta?</span>
                    <span className="text-600 font-medium line-height-3 ml-2">Creala Hoy! solo tienes que diligenciar este formulario</span>
                </div>
                <div>
                    <label htmlFor="nombre" className="block text-900 font-medium mb-2">Ingrese su Nombre</label>
                    <InputText id="name" 
                        type="text" 
                        placeholder="Nombre" 
                        className="w-full mb-3" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="username" className="block text-900 font-medium mb-2">Nombre de Usuario</label>
                    <InputText id="username" 
                        type="text" 
                        placeholder="Nombre de Usuario" 
                        className="w-full mb-3" 
                        value={username} 
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <label htmlFor="password" className="block text-900 font-medium mb-2">Contraseña</label>
                    <InputText id="password" 
                        type="password" 
                        placeholder="Contraseña" 
                        className="w-full mb-3" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password" className="block text-900 font-medium mb-2">Rol</label>
                    <Dropdown value={rol} onChange={(e) => setRol(e.value)} options={['student','moderator']} optionLabel="name" 
                        placeholder="Selecione un Rol" className="w-full md:w-14rem" />
                        <div className="flex align-items-center justify-content-between mb-6"></div>
                    <div className="flex align-items-center justify-content-between">
                        <Button label="Registrarse" severity="warning" icon="pi pi-user" className="w-2/4 mr-2" onClick={handleRegister}  />
                        <Button label="Iniciar Sesion" severity="secondary" icon="pi pi-arrow-left" className="w-2/4" onClick={handleRedirect} />
                    </div>
                </div>
            </form>
        </div>
    </div>
        </BlockUI>
    )
}

export default Register