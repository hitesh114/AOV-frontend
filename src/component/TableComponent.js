import React from "react";
import { Link } from "react-router-dom";
import { deleteOffer } from "./API";
import { useNavigate } from "react-router-dom";
/* *************************************************************************** */
function TableComponent({ data, setData }) {
  const navigate = useNavigate();
  const onDelete = async (id) => {
    try {
      await deleteOffer(id);
      const updatedData = data.filter((offer) => offer.id !== id);
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };
  /* const onDelete = async (id) => {
    try {
        await fetch(`http://localhost:3004/items/${id}`, { method: 'DELETE' }); 
        const updatedData = data.filter(offer => offer.id !== id);
        setData(updatedData);
    } catch (error) {
        console.error('Error deleting offer:', error); 
    }
}; */
  /* *************************************************************************** */
  return (
    <table className="table table-striped table-bordered my-2">
      <thead className="thead-light">
        <tr>
          <th>Offer</th>
          <th>Impressions</th>
          <th>Conversions</th>
          <th>Revenue</th>
          <th>Conversion Rate</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((offer) => (
          <tr key={offer.id}>
            <td>{offer.offer}</td>
            <td>{offer.impressions}</td>
            <td>{offer.conversions}</td>
            <td>${(offer.revenue || 0).toFixed(2)}</td>
            <td>{offer.conversionRate}</td>
            <td>
              <button
                onClick={() => navigate(`/edit-offer/${offer.id}`)}
                className="edit-button"
              >
                Edit{" "}
              </button>
              <button
                onClick={() => onDelete(offer.id)}
                className="delete-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableComponent;
