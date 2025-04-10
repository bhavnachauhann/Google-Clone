import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

import MicIcon from "../assets/mic.svg";
import ImageIcon from "../assets/image.svg";
import Lens from "./Lens";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const SearchInput = () => {
    const { query } = useParams();
    const [searchQuery, setSearchQuery] = useState(query || "");
    const [isListening, setIsListening] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showLens, setShowLens] = useState(false); 

    const navigate = useNavigate();

    const searchQueryHandler = (event) => {
        if (event?.key === "Enter" && searchQuery?.length > 0) {
            navigate(`/${searchQuery}/1`);
        }
    };

    const startListening = () => {
        if (!SpeechRecognition) {
            alert("Speech Recognition not supported in this browser");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        setIsListening(true);
        recognition.start();

        recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript;
            setSearchQuery(spokenText);
            navigate(`/${spokenText}/1`);
        };

        recognition.onend = () => setIsListening(false);
        recognition.onerror = (e) => {
            console.error("Speech recognition error:", e);
            setIsListening(false);
        };
    };

    const handleImageUpload = (file) => {
        const previewURL = URL.createObjectURL(file);
        setImageFile(previewURL);
        simulateImageLabelAPI(file);
    };

    const simulateImageLabelAPI = async (file) => {
        const detectedLabel = "";
        setSearchQuery(detectedLabel);

        const mockSuggestions = [
            "what is this",
            "what is this called",
            "wallpaper 4k",
            "what does this mean",
        ];

        setSuggestions(mockSuggestions);
        setShowSuggestions(true);
    };

    const selectSuggestion = (sug) => {
        setSearchQuery(sug);
        setShowSuggestions(false);
        navigate(`/${sug}/1`);
    };

    return (
        <div className="relative w-full max-w-[600px]">
            <div
                id="searchBox"
                className="h-[46px] w-full flex items-center gap-3 px-4 border border-gray-300 rounded-3xl bg-white text-black shadow-sm"
            >
                <AiOutlineSearch size={18} color="#5f6368" />
                {imageFile && (
                    <img src={imageFile} alt="preview" className="h-6 w-6 rounded object-cover" />
                )}
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyUp={searchQueryHandler}
                    placeholder="Add to your search"
                    className="grow outline-none bg-transparent text-black placeholder:text-gray-500"
                />
                {searchQuery && (
                    <IoMdClose
                        size={20}
                        className="cursor-pointer text-gray-500"
                        onClick={() => {
                            setSearchQuery("");
                            setShowSuggestions(false);
                            setImageFile(null);
                        }}
                    />
                )}
                <img
                    src={MicIcon}
                    alt="mic"
                    onClick={startListening}
                    className="h-5 w-5 cursor-pointer"
                />
                <img
                    src={ImageIcon}
                    alt="upload"
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => setShowLens(true)} 
                />
            </div>

            {/* Suggestion Box */}
            {showSuggestions && (
                <div className="absolute bg-white mt-1 w-full rounded-md overflow-hidden border border-gray-300 shadow z-50">
                    {suggestions.map((sug, idx) => (
                        <div
                            key={idx}
                            onClick={() => selectSuggestion(sug)}
                            className="flex items-center gap-2 p-2 text-black hover:bg-gray-100 cursor-pointer"
                        >
                            <AiOutlineSearch />
                            <span>{sug}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Listening Overlay */}
            {isListening && (
                <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black/80 text-white z-50">
                    <p className="text-xl mb-6">Listening...</p>
                    <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
                        <img src={MicIcon} alt="mic" className="h-8 w-8" />
                    </div>
                </div>
            )}

            {/* Lens Modal */}
            {showLens && (
                <Lens
                    onClose={() => setShowLens(false)} 
                    handleImageUpload={handleImageUpload} 
                />
            )}

            
        </div>
    );
};

export default SearchInput;
