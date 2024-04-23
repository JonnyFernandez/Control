import NavAdmin from "../../components/navAdmin/navAdmin";
import Sidebar from "../../components/sideBar/Sidebar";
import p from './Profile.module.css'


const Profile = () => {


    return (
        <div className={p.profile}>
            <NavAdmin />
            <div className={p.body}>
                <Sidebar />

            </div>
        </div>
    );
}

export default Profile;
