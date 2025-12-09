import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="max-w-2xl mx-auto card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-6 mb-6">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src={user?.photoURL || "https://via.placeholder.com/150"} alt="Profile" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.displayName}</h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>
          <div className="divider"></div>
          <div className="space-y-4">
            <div>
              <label className="label"><span className="label-text font-semibold">Full Name</span></label>
              <input type="text" value={user?.displayName || ""} className="input input-bordered w-full" disabled />
            </div>
            <div>
              <label className="label"><span className="label-text font-semibold">Email</span></label>
              <input type="email" value={user?.email || ""} className="input input-bordered w-full" disabled />
            </div>
            <div>
              <label className="label"><span className="label-text font-semibold">Photo URL</span></label>
              <input type="url" value={user?.photoURL || ""} className="input input-bordered w-full" disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
