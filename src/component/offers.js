import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { updateOffer, addOffer } from "./API";
/* ***************************************************************************** */
const CreateNewOffer = ({ data, setData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    offer: "",
    impressions: "",
    conversions: "",
    revenue: "",
    conversionRate: "",
  });
  const editingOffer = !!id;
  /* ************************************************************************************************ */
  /* Edit or Add */
  useEffect(() => {
    if (editingOffer) {
      console.log("editing 1");
      const existingOffer = data.find((offer) => offer.id == id);
      if (existingOffer) {
        console.log("editing 2");
        setFormValues(existingOffer);
      }
    } else {
      console.log("ERROR. . . ");
    }
  }, [data, id, editingOffer]);
  /* **************************************************************************************************** */
  /* Handle Change */
  const handleChange = (e) => {
    console.log("change");
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: name === "offer" ? value : Number(value),
    }));
  };
  /* ***************************************************************************************************** */
  /* Handle Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const newOffer = {
      id: formValues.id,
      offer: formValues.offer,
      impressions: parseInt(formValues.impressions, 10),
      conversions: parseInt(formValues.conversions, 10),
      revenue: parseFloat(formValues.revenue),
      conversionRate:
        (
          (parseInt(formValues.conversions, 10) /
            parseInt(formValues.impressions, 10)) *
          100
        ).toFixed(2) + "%",
    };
    try {
      if (editingOffer) {
        console.log("New offer data:", newOffer);
        // Edit existing offer
        await updateOffer(formValues.id, newOffer);
        console.log("New offer data:", newOffer);
        setData((prevData) =>
          prevData.map((offer) =>
            offer.id === formValues.id ? newOffer : offer
          )
        );
      } else {
        // Add new offer
        const response = await addOffer(newOffer);
        setData((prevData) => [...prevData, response.data]);
      }
      setFormValues({
        id: "",
        offer: "",
        impressions: "",
        conversions: "",
        revenue: "",
        conversionRate: "",
      }); // Reset form
      navigate("/offers");
    } catch (error) {
      console.error(
        "Error saving offer:",
        error.response ? error.response.data : error.message
      );
    }
  };
  /************************************************************************************************************* */
  return (
    <div className="container mt-4">
      <h1 className="mb-4">
        {editingOffer ? "Edit Offer" : "Create New Offer"}
      </h1>
      <form onSubmit={handleSubmit} className="offer-form">
        <div className="mb-3 form-label form-control">
          {/* Offer Code */}
          <input
            type="text"
            name="offer"
            placeholder="Offer Code"
            value={formValues.offer}
            onChange={handleChange}
            required
          />
          {/* Impressions */}
          <input
            type="number"
            name="impressions"
            placeholder="Impressions"
            value={formValues.impressions}
            onChange={handleChange}
            required
          />
          {/* Conversions */}
          <input
            type="number"
            name="conversions"
            placeholder="Conversions"
            value={formValues.conversions}
            onChange={handleChange}
            required
          />
          {/* Revenue */}
          <input
            type="number"
            name="revenue"
            placeholder="Revenue"
            value={formValues.revenue}
            onChange={handleChange}
            required
          />
          {/* conversionRate */}
          {/* <input
            type="number"
            name="conversionRate"
            placeholder="conversionRate"
            value={setFormValues.conversionRate}
            onChange={handleChange}
            required
          /> */}
          {/* Submit */}
          <button
            type="submit"
            className="create-offer-btn"
            onClick={handleSubmit}
          >
            {editingOffer ? "Update Offer" : "Create Offer"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateNewOffer;
