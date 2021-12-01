import React, { useEffect } from 'react';
import styles from './FBComments.module.css'

const FbComments = ({ url }) => {
  useEffect(() => {
    if(window.FB) {
      window.FB.XFBML.parse();
    }
  }, [])
  return (
    <React.Fragment>
      <div id='fb-root'></div>
      <div className={`fb-comments ${styles.comments}`} data-href={url} data-width='750' data-numposts='5'></div>
    </React.Fragment>
  )
}

export default FbComments;
