import NavAdmin from "../../components/navAdmin/navAdmin";
import Sidebar from "../../components/sideBar/Sidebar";
import p from './Profile.module.css'


const Profile = () => {

    const selector = (data) => {
        alert(data)
    }

    return (
        <div className={p.profile}>
            <NavAdmin />
            <div className={p.body}>
                <Sidebar selector={selector} />

            </div>
        </div>
    );
}

export default Profile;
