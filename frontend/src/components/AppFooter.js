import React from "react";
import { CFooter } from "@coreui/react";

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a
          href="http://dhananjayam.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dashboard
        </a>
        <span className="ms-1">&copy; 2023.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a
          href="http://dhananjayam.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dhananjaya &amp; Dashboard Template
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
