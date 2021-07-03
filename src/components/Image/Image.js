import * as propTypes from 'prop-types'
import React from 'react'
import styles from './Image.module.scss'
import { NO_AVATAR_IMG_URL, NO_AVATAR_X_IMG_URL} from '../../constants'
import classNames from "classnames";

const Image = ({ alt, className, src, ...rest }) => {
    const onImageError = e => e.target.src = NO_AVATAR_X_IMG_URL
    return (
        <img
            {...rest}
            className={classNames(styles.Image, className)} alt={alt} src={src || NO_AVATAR_IMG_URL}
            onError={onImageError} />
    )
}
Image.propTypes = {
    alt: propTypes.string,
    className: propTypes.any,
    src: propTypes.string,
}
export default React.memo(Image)