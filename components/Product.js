import Image from 'next/image'
import styles from '../styles/Product.module.scss';
import EventComponent from '../components/EventComponent';

const Product = (props) => {

    return (
        <div className={styles.product}>
            <h2 className={styles.product__title}>{props.product.name}</h2>
            <p className={styles.product__description}>{props.product.description}</p>
            <div className={styles.product__image}>
            <Image src={props.product.image} alt={props.product.image.src} />
            </div>
            <div className="product__price-button-container">
                <div className={styles.product__price}>${props.product.price.toFixed(2)}</div>
                <EventComponent itemId={props.product.id}>
                </EventComponent>
            </div>
        </div>
    )
}

export default Product