import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import decryptToken from "@/utility/decryptToken";

interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  role: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      const userInfo = decryptToken();
      const decodedUserId = userInfo?._id;

      if (!decodedUserId) {
        toast.error("Invalid user session. Please login again.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5173/api/v1/acceptRequest/getAllUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${decodedUserId}`, // Send user ID in Authorization header
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch users.");
        }

        const data = await response.json();
        setUsers(data.data || []);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Error fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleChangeRole = async () => {
    setIsUpdating(true);

    if (!selectedUser) return;

    try {
      const userInfo = decryptToken();
      const decodedUserId = userInfo?._id;

      const response = await fetch("http://localhost:5173/api/v1/acceptRequest/changeRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${decodedUserId}`, // Send user ID for authentication
        },
        body: JSON.stringify({
          userId: selectedUser.id,
          role: "Admin", // Set role to 'Admin'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to change role.");
      }

      toast.success("User role updated to Admin!");

      // Update the user role locally
      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUser.id ? { ...user, role: "Admin" } : user
        )
      );

      setIsModalOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error updating role.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Show loading indicator
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <ToastContainer />
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Manage Users</h2>
        <table className="min-w-full bg-gray-800 text-white rounded-lg table-auto border-separate border-spacing-2 border border-gray-700">
          <thead>
            <tr className="bg-gray-700 text-left text-sm font-semibold">
              <th className="py-3 px-4 border border-gray-600">User ID</th>
              <th className="py-3 px-4 border border-gray-600">Email</th>
              <th className="py-3 px-4 border border-gray-600">Username</th>
              <th className="py-3 px-4 border border-gray-600">Created At</th>
              <th className="py-3 px-4 border border-gray-600">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`cursor-pointer hover:bg-gray-600 ${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                }`}
                onClick={() => handleRowClick(user)}
              >
                <td className="py-3 px-4 border border-gray-600">{user.id}</td>
                <td className="py-3 px-4 border border-gray-600">{user.email}</td>
                <td className="py-3 px-4 border border-gray-600">{user.username}</td>
                <td className="py-3 px-4 border border-gray-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 border border-gray-600">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for role change */}
      {selectedUser && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="User Details"
          className="modal bg-gray-900 text-white rounded-lg p-6 max-w-lg mx-auto mt-20"
          overlayClassName="modal-overlay bg-black bg-opacity-75 fixed inset-0"
        >
          <h3 className="text-2xl mb-4 text-center font-bold">User Details</h3>
          <div className="space-y-4 text-left">
            <div>
              <strong>Email:</strong> {selectedUser.email}
            </div>
            <div>
              <strong>Username:</strong> {selectedUser.username}
            </div>
            <div>
              <strong>Created At:</strong>{" "}
              {new Date(selectedUser.createdAt).toLocaleDateString()}
            </div>
            <div>
              <strong>Role:</strong> {selectedUser.role}
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleChangeRole}
              disabled={isUpdating}
              className={`bg-green-600 px-4 py-2 rounded-lg text-white w-full ${
                isUpdating ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isUpdating ? "Updating..." : "Make Admin"}
            </button>
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-6 bg-gray-600 px-4 py-2 rounded-lg text-white w-full"
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Users;
