import { useSelector } from "react-redux";
import MetaData from "../../MetaData";
import { selectUser } from "../../slices/userSlice";
import Header from "../home/Header";
import "../../styles/user/Profile.css";
import { Link } from "react-router-dom";


function Profile(){
    const { info } = useSelector(selectUser);

    return (
        <div>
            <MetaData title={`${info?.name}'s porfile`} />
            <Header />

            <div className="profile">
              <div className="profile_left">
                  <div className="profile_avatar">
                      <img src={info?.avatar.url} alt={info?.name} />
                  </div>
                  <div>
                      <Link to="/user/profile/update">
                      <button>Edit Profile</button>
                      </Link>
                  </div>
              </div>
              <div className="profile_right">
                  <div>
                      <h3>Full Name</h3>
                      <p>{info?.name}</p>
                  </div>

                  <div>
                      <h3>Email</h3>
                      <p>{info?.email}</p>
                  </div>

                  <div>
                      <h3>Joined On</h3>
                      <p>{String(info?.createdAt)?.slice(0, 10)}</p>
                  </div>
                  <Link to="/user/password/update">
                   <button>Change Password</button>
                  </Link>
              </div>
            </div>
        </div>
    );
}

export default Profile;