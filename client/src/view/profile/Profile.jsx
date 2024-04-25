import NavAdmin from "../../components/navAdmin/navAdmin";
import Sidebar from "../../components/sideBar/Sidebar";
import p from './Profile.module.css'
import Card from '../../components/card/Card'



const Profile = () => {


    return (
        <div className={p.profile}>
            <NavAdmin />
            <div className={p.body}>

                <div className={p.left}>
                    <Sidebar />
                </div>

                <div className={p.right}>
                    <h1>hwllo wold</h1>
                    <h1>hwllo wold</h1>
                    <h1>hwllo wold</h1>
                    <h1>hwllo wold</h1>
                    <h1>hwllo wold</h1>
                    <h1>hwllo wold</h1>
                    <h1>hwllo wold</h1>
                    <h1>hwllo wold</h1>
                    <h1>hwllo wold</h1>
                    <h1>hwllo wold</h1>
                    <h1>hwllo wold</h1>
                    <h1>hwllo wold</h1>
                    <h1>hwllo wold</h1>
                    <h1>hwllo wold</h1>
                    <h1>hwllo wold</h1>
                    <h1>hwllo wold</h1>


                </div>


            </div>
        </div>
    );
}

export default Profile;