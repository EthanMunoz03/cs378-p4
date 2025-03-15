import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header({ searchTerm, setSearchTerm, handleSearch, savedLocations, handleLocationClick }) {

    const [error, setError] = useState(null); 

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const result = await handleSearch();
        if (!result) {
            setError('Failed to find the city. Please try again.');
        } else {
            setError(null);
        }
    };

    return (
        <div className="header">
            
            {/* Search Bar */}
            <div className="search-bar">
                <form onSubmit={handleFormSubmit} className="mb-3">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for a city..."
                        className="form-control mb-2"
                    />
                    <button type="submit" className="btn btn-success">+</button>
                </form>
            </div>

            {error && <p className="text-danger">{error}</p>}

            {/* Saved Location Buttons */}
            <div className="btn-group-wrap mb-1" role="group">
                {savedLocations.map((location) => (
                    <button
                        key={location.name}
                        onClick={() => handleLocationClick(location)}
                        className="btn btn-secondary"
                    >
                        {location.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Header;