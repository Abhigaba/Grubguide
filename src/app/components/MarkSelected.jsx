import { MarkerF, OverlayView } from '@react-google-maps/api'
import React, { useContext } from 'react'
import PlaceCard from './PlaceCard'
import { useBuisness } from '../contexts/useBuisness'

const MarkSelected = ({place}) => {
    const {selectedPlace, setselectedPlace} = useBuisness()

    return (
    <div>
         <MarkerF
                position={place.geometry.location}
                onClick={()=>setselectedPlace(place)}
                icon={{
                  url:'/circle.png',
                  scaledSize:{
                    width:10,
                    height:10
                  }
                }}
            >    
            {selectedPlace.reference===place.reference && 
                <OverlayView 
                position={place.geometry.location}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
            <div className='ml-[-90px] mt-[-230px]'>
                <PlaceCard place={place} showDir={true} />
            </div>
                </OverlayView>
            }    
        </MarkerF>
    </div>
  )
}

export default MarkSelected