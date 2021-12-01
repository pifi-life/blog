import styles from './FBLikes.module.css'

export const FBLikes = ({ url }) => {
    return (
        <div className={`fb-like ${styles.likes}`} data-href={url} data-width="" data-layout="standard" data-action="like" data-size="large" data-share="true"></div>
    )
}

export default FBLikes
