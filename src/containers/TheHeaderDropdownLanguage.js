import React from 'react'
import { CBadge, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { AiOutlineTranslation } from 'react-icons/ai';
import { config } from '../reusable/configs/config';
import { useSelector, useDispatch } from 'react-redux';

const TheHeaderDropdownLanguage = () => {
    const dispatch = useDispatch();
    const language = useSelector(state => state.language);
    
    return (
        <CDropdown inNav className="c-header-nav-item mx-2">
            <CDropdownToggle className="c-header-nav-link" caret={false}>
                {/* <CIcon name="cil-bell"/> */}
                <AiOutlineTranslation size={18} />
                <CBadge shape="pill" color="danger">{language}</CBadge>
            </CDropdownToggle>
            <CDropdownMenu placement="bottom-end" className="pt-0">
                {/* <CDropdownItem header={false} tag="div" className="text-center" color="light">
          <strong>You have {langSelected} notifications</strong>
        </CDropdownItem> */}
                <CDropdownItem onClick={() => dispatch({ type: 'set', language: 'en' })} className={language === 'en' ? 'active' : null}><CIcon className="mr-2 text-success" width={'25'} src={config.langLogo.en} /> English</CDropdownItem>
                <CDropdownItem onClick={() => dispatch({ type: 'set', language: 'fr' })} className={language === 'fr' ? 'active' : null}><CIcon className="mr-2 text-danger" width={'25'} src={config.langLogo.fr} /> French</CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default TheHeaderDropdownLanguage