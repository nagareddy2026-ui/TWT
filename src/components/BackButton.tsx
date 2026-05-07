import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        backgroundColor: "white",
        color: "#374151",
        border: "1px solid #d1d5db",
        borderRadius: "50%",
        width: "42px",
        height: "42px",
        cursor: "pointer",
        fontSize: "18px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      ←
    </button>
  );
};

export default BackButton;