import { useState, useEffect } from "react";
import "../style/page/address.css";
import NavBar from "../components/page/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateAddress, addAddress } from "../slices/AddressSlice";
import { toast } from "react-toastify";
import apiClient from "../app/AppClient";
import { ENDPOINTS } from "../services/Constants";

export default function Address() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    // 1. Unpack incoming router parameter payloads safely
    const locationState = location.state?.address;

    // 2. Define clean default form values (do not auto-generate long numeric IDs for new entries here)
    const defaultAddressValues = {
        id: locationState?.id ?? "", 
        fullName: locationState?.fullName ?? locationState?.name ?? "", 
        phone: locationState?.phone ?? "",
        street: locationState?.street ?? "",
        city: locationState?.city ?? "",
        state: locationState?.state ?? "",
        zip: locationState?.zip ?? "",
        country: locationState?.country ?? "",
    };

    const [address, setAddress] = useState(defaultAddressValues);

    // 3. Keep component state in lockstep with incoming route parameter modifications
    useEffect(() => {
        if (locationState) {
            setAddress({
                id: locationState.id,
                fullName: locationState.fullName ?? locationState.name ?? "",
                phone: locationState.phone ?? "",
                street: locationState.street ?? "",
                city: locationState.city ?? "",
                state: locationState.state ?? "",
                zip: locationState.zip ?? "",
                country: locationState.country ?? "",
            });
        } else {
            setAddress(defaultAddressValues);
        }
    }, [locationState]);

    const handleChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (locationState != null) {
                dispatch(updateAddress(address));
           
                await apiClient.put(ENDPOINTS.updateAddress(address.id), address);
                toast.success("Address Updated successfully!");
            } else {
                const response = await apiClient.post(ENDPOINTS.addAddress, address);
                dispatch(addAddress(response.data ?? address));
                toast.success("New Address Saved successfully!");
            }
            
            navigate(-1);
        } catch (error) {
            console.error("Address operation failed:", error);
            toast.error(error.response?.data?.message || "Something went wrong. Please check your authorization.");
        }
    };

    return (
        <>
            <NavBar />
            <div className="container">
                <h2>{locationState ? "Update Address" : "Add Address"}</h2>

                <form onSubmit={handleSubmit} className="address-form">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={address.fullName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={address.phone}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="street"
                        placeholder="Street Address"
                        value={address.street}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={address.city}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={address.state}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="zip"
                        placeholder="ZIP Code"
                        value={address.zip}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={address.country}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        {locationState ? "Update Address" : "Save Address"}
                    </button>
                </form>
            </div>
        </>
    );
}
