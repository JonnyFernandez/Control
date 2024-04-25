import { useState } from "react";
import NavAdmin from "../../components/navAdmin/navAdmin";
import Sidebar from "../../components/sideBar/Sidebar";
import p from './Profile.module.css'
import { CustomerManagement, ContentManagement, CreateProd, Help, Marketing, OrderManagement, Reporting, SecurityWeb, SettingsWeb } from '../../components/componentAdmin/index'



const Profile = () => {

    const [customer, setCustomer] = useState(true)
    const [content, setContent] = useState(true)
    const [createProd, setCreateProd] = useState(false)
    const [help, setHelp] = useState(false)
    const [marketing, setMarketing] = useState(false)
    const [order, setOrder] = useState(false)
    const [reporting, setReporting] = useState(false)
    const [security, setSecurity] = useState(false)
    const [settings, setSettings] = useState(false)


    const selector = (data) => {
        alert(`${data}`)
    }

    return (
        <div className={p.profile}>
            <NavAdmin />
            <div className={p.body}>

                <div className={p.left}>
                    <Sidebar selector={selector} />
                </div>

                <div className={p.right}>

                    {customer && <CustomerManagement />}
                    {content && <ContentManagement />}
                    {createProd && <CreateProd />}
                    {/* <Help />
                    <Marketing />
                    <OrderManagement />
                    <Reporting />
                    <SecurityWeb />
                    <SettingsWeb /> */}

                </div>


            </div>
        </div>
    );
}

export default Profile;