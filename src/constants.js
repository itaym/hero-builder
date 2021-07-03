import * as propTypes from "prop-types";

export const API_URL = 'https://frontend-interview-hero-63u64o32qq-uk.a.run.app'
export const EVENT_HERO_CLICK = 'HERO_CLICK'
export const EVENT_NAV_CLICK = 'NAV_CLICK'
export const NO_AVATAR_IMG_URL = '/no_avatar.png'
export const NO_AVATAR_X_IMG_URL = '/no_avatar_x.png'
export const STAGE_HERO_RESULT = 2
export const STAGE_HERO_SELECTION = 0
export const STAGE_SKILL_EDIT = 1

// -----------------------------------------------------------------------------
export const PROPTYPES_HERO = propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    image: propTypes.string,
    skills: propTypes.arrayOf( propTypes.shape({
        name: propTypes.string,
        value: propTypes.number
    }))
})