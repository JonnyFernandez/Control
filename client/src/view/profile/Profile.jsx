import { useState } from "react";
import Sidebar from "../../components/sideBar/Sidebar";
import p from './Profile.module.css'
import { NavAdmin, CustomerManagement, ContentManagement, CreateProd, Help, Marketing, OrderManagement, Reporting, SecurityWeb, SettingsWeb } from '../../components/componentAdmin/index'




const Profile = () => {

    const [prod, setProd] = useState(true)
    const [customer, setCustomer] = useState(false)
    const [content, setContent] = useState(false)
    const [createProd, setCreateProd] = useState(false)
    const [help, setHelp] = useState(false)
    const [marketing, setMarketing] = useState(false)
    const [order, setOrder] = useState(false)
    const [reporting, setReporting] = useState(false)
    const [security, setSecurity] = useState(false)
    const [settings, setSettings] = useState(false)


    const selector = (data) => {
        switch (data) {
            case "prod":
                setProd(true)
                setCustomer(false)
                setContent(false)
                setCreateProd(false)
                setHelp(false)
                setMarketing(false)
                setOrder(false)
                setReporting(false)
                setSecurity(false)
                setSettings(false)
                break
            case "orders":
                setProd(false)
                setCustomer(false)
                setContent(false)
                setCreateProd(false)
                setHelp(false)
                setMarketing(false)
                setOrder(true)
                setReporting(false)
                setSecurity(false)
                setSettings(false)
                break
            case "client":
                setProd(false)
                setCustomer(true)
                setContent(false)
                setCreateProd(false)
                setHelp(false)
                setMarketing(false)
                setOrder(false)
                setReporting(false)
                setSecurity(false)
                setSettings(false)
                break
            case "report":
                setProd(false)
                setCustomer(false)
                setContent(false)
                setCreateProd(false)
                setHelp(false)
                setMarketing(false)
                setOrder(false)
                setReporting(true)
                setSecurity(false)
                setSettings(false)
                break
            case "marketing":
                setProd(false)
                setCustomer(false)
                setContent(false)
                setCreateProd(false)
                setHelp(false)
                setMarketing(true)
                setOrder(false)
                setReporting(false)
                setSecurity(false)
                setSettings(false)
                break
            case "content":
                setProd(false)
                setCustomer(false)
                setContent(true)
                setCreateProd(false)
                setHelp(false)
                setMarketing(false)
                setOrder(false)
                setReporting(false)
                setSecurity(false)
                setSettings(false)
                break
            case "setting":
                setProd(false)
                setCustomer(false)
                setContent(false)
                setCreateProd(false)
                setHelp(false)
                setMarketing(false)
                setOrder(false)
                setReporting(false)
                setSecurity(false)
                setSettings(true)
                break
            case "security":
                setProd(false)
                setCustomer(false)
                setContent(false)
                setCreateProd(false)
                setHelp(false)
                setMarketing(false)
                setOrder(false)
                setReporting(false)
                setSecurity(true)
                setSettings(false)
                break
            case "help":
                setProd(false)
                setCustomer(false)
                setContent(false)
                setCreateProd(false)
                setHelp(true)
                setMarketing(false)
                setOrder(false)
                setReporting(false)
                setSecurity(false)
                setSettings(false)
                break
        }
    };

    return (
        <div className={p.profile}>
            <NavAdmin />
            <div className={p.body}>

                <div className={p.left}>
                    <Sidebar selector={selector} />
                </div>

                <div className={p.right}>
                    {prod && <h1>Productos</h1>}
                    {customer && <CustomerManagement />}
                    {content && <ContentManagement />}
                    {createProd && <CreateProd />}
                    {help && <Help />}
                    {marketing && <Marketing />}
                    {order && <OrderManagement />}
                    {reporting && <Reporting />}
                    {security && <SecurityWeb />}
                    {settings && <SettingsWeb />}

                </div>


            </div>
        </div>
    );
}

export default Profile;