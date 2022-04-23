import React, { useState } from 'react'
import { View } from 'react-native'
import { Icon, ListItem, Text } from 'react-native-elements'
import { Modal } from '../Shared'
import { ChangeDisplayNameForm } from './ChangeDisplayNameForm'
import { ChangeMailForm } from './ChangeMailForm'
import { ChangePasswordForm } from './ChangePasswordForm'

export function AccountOptions(props) {
    const { onReload }= props
    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)
    const onCloseOpenModal = () => setShowModal((prevState) => !prevState );
    const selectedComponent = (key) =>{
        if (key === "displayName") {
            setRenderComponent(<ChangeDisplayNameForm onCloseOpenModal={onCloseOpenModal} onReload={onReload} />);
        }
        if (key === "email") {
            setRenderComponent(<ChangeMailForm onCloseOpenModal={onCloseOpenModal} onReload={onReload} />);
        }
        if (key === "password") {
            setRenderComponent(<ChangePasswordForm onCloseOpenModal={onCloseOpenModal} />);
        }

        onCloseOpenModal();
    }
    const menuOptions = getMenuOptions(selectedComponent);
    return (
        <View>
            {
                menuOptions.map((menu,index) =>(
                    <ListItem 
                        key={index}
                        bottomDivider 
                        onPress={menu.onPress}>
                        <Icon 
                            type={menu.iconType}
                            name={menu.iconNameLeft}
                            color={menu.iconColorLeft}
                        />

                        <ListItem.Content>
                            <ListItem.Title>{menu.title}</ListItem.Title>
                        </ListItem.Content>
                        <Icon 
                            type={menu.iconType}
                            name={menu.iconNameRight}
                            color={menu.iconColorRight}
                        />
                    </ListItem>
                ))
            }
            <Modal show={showModal} close={onCloseOpenModal}>
                {renderComponent}
            </Modal>
        </View>
    )
}

const getMenuOptions = (selectedComponent) => {
    return [
        {
            title: "Cambiar Nombre y Apellidos",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress:()=>{
                selectedComponent("displayName");
            },
        },
        {
            title: "Cambiar Email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress:()=>{
                selectedComponent("email");
            },
        },
        {
            title: "Cambiar contraseña",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress:()=>{
                selectedComponent("password");
            },
        },
    ]
}