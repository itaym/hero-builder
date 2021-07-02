import React, { useCallback } from 'react'
import VerticalNav from '../VerticalNav'
import { dispatcher } from 'react-dispatch'
import {
    EVENT_NAV_CLICK,
    STAGE_HERO_RESULT, STAGE_HERO_SELECTION, STAGE_SKILL_EDIT} from '../../constants'

function TopMenu({ activeList, currentSelected }) {

    const onNavClick = useCallback(requestedStage => () => {
        if (!activeList.includes(requestedStage)) return
        dispatcher.dispatch(EVENT_NAV_CLICK, requestedStage)
    }, [activeList])

    return (
        <VerticalNav
            activeList={activeList}
            selected={currentSelected}>
            <div onClick={onNavClick(STAGE_HERO_SELECTION)}>Class</div>
            <div onClick={onNavClick(STAGE_SKILL_EDIT)}>Skills</div>
            <div onClick={onNavClick(STAGE_HERO_RESULT)}>Result</div>
        </VerticalNav>
    );
}

export default React.memo(TopMenu);
