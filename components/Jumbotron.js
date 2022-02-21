import Image from 'next/image'
import aquarium from '../public/aquarium.svg';

const Jumbotron = () => {
    return (< >
        <div className="background-image">
            <Image src={aquarium} alt={aquarium}/>
        </div>
        <div className="promotional-message">
            <h3>Find Your Dream Home How</h3>
            <h2>Move Today</h2>
        </div>
    </>)
}
export default Jumbotron;