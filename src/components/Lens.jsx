import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Lens = ({ onClose, handleImageUpload }) => {
    const [dragActive, setDragActive] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [zoom, setZoom] = useState(1);
    const fileInputRef = useRef();
    const [noResult, setNoResult] = useState(false);
    const navigate = useNavigate();

    const handleFileUpload = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); 
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    // const handlePasteSearch = () => {
    //     if (imageUrl) {
    //         setImagePreview(imageUrl);
    //     }
    // };

    const handleZoom = (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            setZoom((prev) => Math.min(prev + 0.1, 3));
        } else {
            setZoom((prev) => Math.max(prev - 0.1, 0.5));
        }
    };

    const handleConfirm = () => {
        if (imagePreview) {
            // convert base64 to Blob and send as file
            fetch(imagePreview)
                .then((res) => res.blob())
                .then((blob) => {
                    const file = new File([blob], "uploaded-image.png", { type: blob.type });
                    handleImageUpload(file);
                    onClose();
                });
        }
    };
    const handlePasteSearch = () => {
        if (imageUrl.trim()) {
            onClose(); // Close the modal
            navigate(`/${encodeURIComponent(imageUrl.trim())}/1`); // Navigate with pasted URL
        }
    };

    return (
        <div
            className="fixed top-0 left-0 w-full h-full bg-black/60 z-50 flex items-center justify-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <div className="bg-[#2f2f2f] rounded-lg p-6 w-[90%] md:w-[500px] relative">
                <button onClick={onClose} className="absolute right-4 top-4 text-white text-2xl">
                    &times;
                </button>
                <h2 className="text-white text-center text-lg mb-4">Search any image with Google Lens</h2>

                <div
                    className={`border border-dashed ${dragActive ? "border-green-500 bg-black/30" : "border-gray-700 bg-black/40"
                        } p-6 rounded-md text-center transition-all`}
                >
                    {!imagePreview ? (
                        <>
                            <p className="text-white mb-4">
                                Drag & drop an image here or{" "}
                                <span
                                    className="text-blue-500 underline cursor-pointer"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    upload a file
                                </span>
                            </p>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e.target.files[0])}
                            />

                            <p className="text-white mt-4 mb-2">OR</p>

                            <div className="flex items-center gap-4">
                                <input
                                    type="text"
                                    placeholder="Paste image link"
                                    className="w-full p-2 rounded bg-gray-800 text-white outline-none"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                />

                                <button
                                    className="px-6 py-2 bg-blue-600 text-white rounded"
                                    onClick={handlePasteSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                className="overflow-hidden border rounded"
                                style={{ height: "300px" }}
                                onWheel={handleZoom}
                            >
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="mx-auto transition-transform duration-300"
                                    style={{ transform: `scale(${zoom})`, maxHeight: "100%", maxWidth: "100%" }}
                                />
                            </div>
                            <div className="flex justify-center mt-4 gap-4">
                                <button
                                    onClick={handleConfirm}
                                    className="px-4 py-2 bg-green-600 text-white rounded"
                                >
                                    Confirm Search
                                </button>
                                <button
                                    onClick={() => {
                                        setImagePreview(null);
                                        setZoom(1);
                                    }}
                                    className="px-4 py-2 bg-red-600 text-white rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Lens;
