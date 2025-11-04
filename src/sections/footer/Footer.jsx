
import React, { useRef } from 'react';
import './footer.css';
import InstaIcon from '../../assets/svg/insta-icon';
import IconWhatsapp from '../../assets/svg/whatsapp-icon';

import './footer.css';

export default function Footer() {

    return (
<div className="footer-container layout-grid">
  <div className="footer-logo">גרוב.</div>

  <div className="footer-des">
    עקבו אחרינו באינסטגרם כדי לראות את כל ההשראות והצבעוניות,
    ודברו איתנו בוואטסאפ לכל שאלה או התייעצות.
    אל תפספסו את הרגעים המלאים בגרוב והנאה!
  </div>

  <div className="icons-footer">

<div  className="footer-icon-wrapper">
<a href="https://www.instagram.com/mor_iz/" target="_blank">
  <InstaIcon />
</a>
<span className="instagram-icon-footer">אינסטגרם</span>
</div>

<div className="footer-icon-wrapper">

<a href="https://wa.me/972522937174" target="_blank" >
  <IconWhatsapp />
</a>
<span className="instagram-icon-footer">לוואטסאפ</span>
</div>


</div>
<div className="footer-credit">
  <span>© כל הזכויות שמורות 2025 </span>
  <span>
 
    <a href="https://wa.me/972522937174" target="_blank" rel="noopener noreferrer">
      Moriz. Studio
    </a>
       {' '}
  </span>
</div>




  {/*
  <div className="newsletter-footer">
    <span>נשבעים לא לשלוח ספאם</span>
    <div className="form-wrapper">
      <input placeholder="שם" style={{ padding: '8px' }} />
      <input placeholder="טלפון" style={{ padding: '8px' }} />
      <input placeholder="מייל" style={{ padding: '8px' }} />
      <button>שליחה</button>
    </div>
  </div>
  */}
</div>
    )
}