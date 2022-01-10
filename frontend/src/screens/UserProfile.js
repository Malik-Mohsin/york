import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import useUserProfile from "../utils/useUserProfile";

const UserProfile = () => {
  const { userData, loading, orders } = useUserProfile();

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col bg-gray-200 items-center justify-center mx-auto min-h-screen">
          <div className="max-w-md py-10 px-16 bg-white shadow-lg rounded-lg my-20">
            <div>
              <h2 className="text-gray-800 text-xl font-semibold">
                Name: {userData?.name}
              </h2>
              <h2 className="text-gray-800 text-xl font-semibold">
                Email: {userData?.email}
              </h2>
              <h2 className="text-gray-800 text-xl font-semibold">
                Account balance: {userData?.accountBalance}
              </h2>
            </div>
            <div className="flex justify-end mt-4">
              <span className="text-xl font-medium text-indigo-500">
                {userData?.isMember ? "Member" : "Not a member"}
              </span>
            </div>
          </div>

          <h1 className="font-bold text-2xl mb-5">Orders Reciepts</h1>
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 pb-20">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full sm:w-96"
                        >
                          Product Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders?.map((order) => (
                        <tr key={order.productId}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {order.productName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ">
                              {order.productPrice}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
