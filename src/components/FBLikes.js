import styles from './FBLikes.module.css'

export const FBLikes = ({ url }) => {
    return (
        <div class={`fb-like ${styles.likes}`} data-href={url} data-width="" data-layout="standard" data-action="like" data-size="small" data-share="true"></div>
    )
}

export default FBLikes
