
import React, { useRef } from 'react';
import './footer.css';
import InstaIcon from '../../assets/svg/insta-icon';

import './footer.css';

export default function Footer() {

    return (
        <div className="footer-container layout-grid">
            <div className="footer-logo">גרוב.</div>
            <div className="footer-des">עקבו אחרינו ברשתות החברתיות והצטרפו לניוזלטר שלנו. כדי לקבל הצצה בלעדית אל מאחורי הקלעים, 
השראות צבעוניות, ורגעים מלאי גרוב והנאה – אל תפספסו.</div>

<div className="instgram-icon-footer">אינסטגרם </div>

{/* <div className="newsletter-footer">
    <span>נשבעים לא לשלוח ספאם </span>
<div className="form-wrapper">
    <input placeholder="שם" style={{ padding: '8px' }} />
    <input placeholder="טלפון" style={{ padding: '8px' }} />
    <input placeholder="מייל" style={{ padding: '8px' }} />
    <button>שליחה</button>
</div> */}
{/* </div> */}



        </div>
    )
}