import React from "react";

const Table = ({ transactions }) => {
    return (
        <div className="mt-6 overflow-hidden shadow-sm rounded-lg border border-gray-200">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-primary-600">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {transactions.length > 0 ? (
                            transactions.map((transaction) => (
                                <tr key={transaction._id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(transaction.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {transaction.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${transaction.category === 'Income' ? 'bg-green-100 text-green-800' : 
                                             transaction.category === 'Food' ? 'bg-blue-100 text-blue-800' :
                                             transaction.category === 'Transportation' ? 'bg-yellow-100 text-yellow-800' :
                                             transaction.category === 'Entertainment' ? 'bg-purple-100 text-purple-800' :
                                             transaction.category === 'Housing' ? 'bg-red-100 text-red-800' :
                                             'bg-gray-100 text-gray-800'}`}>
                                            {transaction.category}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                                        ${Math.abs(transaction.amount).toFixed(2)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                    No transactions found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;