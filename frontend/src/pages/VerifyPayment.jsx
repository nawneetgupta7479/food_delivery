import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';
import Spinner from '../components/Spinner/Spinner';
import axios from 'axios'; // Make sure to import axios
import { toast } from 'react-toastify'; // Assuming you are using react-toastify for notifications

const VerifyPayment = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // Initialize loading state

    const verifyPayment = async () => {
        try {
            const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
            if (response.data.success) {
                toast.success("Payment Successful");
                navigate("/myorders");
            } else {
                toast.error("Payment Failed");
                navigate("/");
            }
        } catch (error) {
            toast.error("Payment Failed");
            navigate("/");
        } finally {
            setLoading(false); // Set loading to false once API call is finished
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []); // Empty dependency array to run only once on mount

    return (
        <div>
            {loading ? <Spinner /> : null} {/* Conditionally render Spinner */}
        </div>
    );
}

export default VerifyPayment;
