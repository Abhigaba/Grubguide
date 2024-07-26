import React, { createContext, useContext, useState } from 'react';

const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const [map, setMap] = useState(null);

    const panToLocation = (location) => {
        if (map) {
            map.panTo(location);
        }
    };

    return (
        <MapContext.Provider value={{ map, setMap, panToLocation }}>
            {children}
        </MapContext.Provider>
    );
};

export const useMap = () => useContext(MapContext);