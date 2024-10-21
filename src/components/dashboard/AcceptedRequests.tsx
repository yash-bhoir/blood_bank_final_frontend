import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

interface Request {
  id: string;
  bloodTypeId: string;
  quantity: number;
  request_date: string;
  required_by: string;
  status: string;
  delivery_address: string;
  contact_number: string;
  reason_for_request: string;
  hospital_name: string;
  urgent: boolean | null;
  isAccepted: boolean | null;
  isQrSent: boolean | null;
  isMailSent: boolean | null;
  isApproved: boolean | null;
  userId: string;
}

const AcceptedRequests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:5173/api/v1/bloodrequest/getAllRequest", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch accepted requests.");
        }
  
        const data = await response.json();
        
        // Filter requests where status is "Accepted"
        const acceptedRequests = data.data.filter((request: Request) => request.status === "Accepted");
  
        setRequests(acceptedRequests || []);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Error fetching accepted requests.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchRequests();
  }, []);
  

  const handleRowClick = (request: Request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  // const handleReject = async () => {
  //   if (!selectedRequest) return;

  //   try {
  //     const response = await fetch("http://localhost:5173/api/v1/acceptRequest/acceptRequest", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         requestId: selectedRequest.id,
  //         userId: selectedRequest.userId,
  //         isAccepted: false,
  //       }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Failed to reject the request.");
  //     }

  //     // Show success message and update the requests state
  //     toast.success("Request rejected successfully!");
  //     setRequests((prev) =>
  //       prev.filter((req) => req.id !== selectedRequest.id) // Remove rejected request from the list
  //     );

  //     // Close the modal after handling the request
  //     setIsModalOpen(false);
  //     setSelectedRequest(null); // Clear the selected request

  //   } catch (error) {
  //     toast.error(error instanceof Error ? error.message : "Error rejecting the request.");
  //   }
  // };

  // Show loading indicator
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  // No accepted requests found
  if (requests.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>No accepted requests found.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <ToastContainer />
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Manage Accepted Requests</h2>
        <table className="min-w-full bg-gray-800 text-white rounded-lg table-auto border-separate border-spacing-2 border border-gray-700">
          <thead>
            <tr className="bg-gray-700 text-left text-sm font-semibold">
              <th className="py-3 px-4 border border-gray-600">Request ID</th>
              <th className="py-3 px-4 border border-gray-600">Blood Type</th>
              <th className="py-3 px-4 border border-gray-600">Quantity</th>
              <th className="py-3 px-4 border border-gray-600">Request Date</th>
              <th className="py-3 px-4 border border-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr
                key={request.id}
                className={`cursor-pointer hover:bg-gray-600 ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}`}
                onClick={() => handleRowClick(request)}
              >
                <td className="py-3 px-4 border border-gray-600">{request.id}</td>
                <td className="py-3 px-4 border border-gray-600">{request.bloodTypeId}</td>
                <td className="py-3 px-4 border border-gray-600">{request.quantity}</td>
                <td className="py-3 px-4 border border-gray-600">
                  {new Date(request.request_date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 border border-gray-600 text-green-500">Accepted</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for request details and actions */}
      {selectedRequest && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Request Details"
          className="modal bg-gray-900 text-white rounded-lg p-6 max-w-lg mx-auto mt-20 overflow-auto max-h-96"
          overlayClassName="modal-overlay bg-black bg-opacity-75 fixed inset-0"
        >
          <h3 className="text-2xl mb-4 text-center font-bold">Request Details</h3>
          <div className="space-y-4 text-left">
            <div>
              <strong>Blood Type:</strong> {selectedRequest.bloodTypeId}
            </div>
            <div>
              <strong>Quantity:</strong> {selectedRequest.quantity} units
            </div>
            <div>
              <strong>Request Date:</strong>{" "}
              {new Date(selectedRequest.request_date).toLocaleDateString()}
            </div>
            <div>
              <strong>Required By:</strong> {selectedRequest.required_by}
            </div>
            <div>
              <strong>Delivery Address:</strong> {selectedRequest.delivery_address}
            </div>
            <div>
              <strong>Hospital Name:</strong> {selectedRequest.hospital_name}
            </div>
            <div>
              <strong>Contact Number:</strong> {selectedRequest.contact_number}
            </div>
            <div>
              <strong>Reason for Request:</strong> {selectedRequest.reason_for_request}
            </div>
            <div>
              <strong>Urgent:</strong> {selectedRequest.urgent ? "Yes" : "No"}
            </div>
            <div>
              <strong>Accepted:</strong> {selectedRequest.isAccepted ? "Yes" : "No"}
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            {/* <button
              onClick={handleReject}
              className="bg-red-600 px-4 py-2 rounded-lg text-white w-full"
            >
              Reject
            </button> */}
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

export default AcceptedRequests;
