import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MpesaLogo from "../images/mpesa.jpeg";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import CircularProgress from "@mui/material/CircularProgress";

const PAYMENT_URL = "/auth/user/top_up";

const Mpesa = () => {
  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 400,
    bgcolor: "background.paper",
    border: "2px solid #FFA500",
    borderRadius: 4,
    boxShadow: 24,
    pt: 4,
    pb: 4,
    pl: 3,
    pr: 3,
  };

  useEffect(() => {
    setErrMsg(null);
  }, [phoneNumber, amount]);

  const handlePaymentInput = async (event) => {
    event.preventDefault();

    if (phoneNumber.length !== 12 || amount < 50) {
      if (phoneNumber.length !== 12) {
        setErrMsg("Invalid Phone number!");
      } else {
        setErrMsg("Amount cannot be less than Ksh.50!");
      }
    } else {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("amount", amount);
        formData.append("Phone_number", phoneNumber);

        const response = await axiosPrivate.post(PAYMENT_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Payment successful:", response.data);
      } catch (error) {
        setErrMsg("Payment failed!");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
      >
        Deposit
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "95%" }}>
          <div className="mb-2" id="child-modal-title">
            <img src={MpesaLogo} alt="Mpesa_logo" />
          </div>
          <div id="child-modal-description">
            <form onSubmit={handlePaymentInput}>
              <p className="mb-2 font-medium">Deposit via STK Push: </p>
              {errMsg ? (
                <div className="pb-2">
                  <Alert variant="filled" severity="error">
                    {errMsg}
                  </Alert>
                </div>
              ) : null}

              <div className="flex flex-col gap-3 mb-4">
                <input
                  type="number"
                  placeholder="Enter mpesa number (254..)"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <input
                  type="number"
                  placeholder="Enter amount (Ksh)"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div className="flex justify-between gap-2">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded w-full cursor-pointer"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress color="warning" size={18} />
                  ) : (
                    "Pay"
                  )}
                </button>
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded w-full cursor-pointer"
                  onClick={handleClose}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>

            <p className="text-center mt-4 text-sm text-red-600">
              <i>
                Facing a problem? <br />
                Contact support number{" "}
                <a href="tel:+254769257996" className="underline">
                  +254708827471
                </a>{" "}
                or email us on{" "}
                <a
                  href="mailto:info@boostke.co.ke"
                  className="text-blue-600 underline"
                >
                  info@boostke.co.ke
                </a>
              </i>
            </p>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Mpesa;
