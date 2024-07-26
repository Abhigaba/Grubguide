import ratings from '../../../public/ratings'
import { useFilter } from '../contexts/useFilter'


const Ratings = () => {
    
    const {rating, setRating} = useFilter()

    const onselect = (value, index) => {
        if(value) {
            setRating([...rating, index])
            
        }
        else{
            setRating((prev) => (prev.filter((n) => n!==index)))
        }

    }



  return (
<>
    <h2 className='font-bold text-xl px-4 ml-[35%] sm:ml-[25%]'>Select rating</h2>
    <div className='flex flex-col px-4 mt-3 gap-2'>
    {ratings.map((items, index) => (
        <div key={index} className='flex justify-between'>
            <label >{items.icon}</label>
            <input type="checkbox" 
            onChange={(e) => onselect(e.target.checked, index)}
            />
        </div>
    ))}
    </div>
    </>
  )
}

export default Ratings