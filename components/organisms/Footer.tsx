import React from 'react';
import ScrollButton from './../molecules/ScrollButton';
import {
  IconArrowToTop,
  IconEnvelope,
  IconGithub,
  IconLogoColored,
} from './../atoms/Icons';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps): React.ReactElement => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer
      className={`jth-footer jth-container${className ? ` ${className}` : ``}`}
    >
      <nav className="jth-footer-container">
        <ul className="jth-footer-items-left">
          <li>© {new Date().getFullYear()} JthCast</li>
          <li>
            <IconLogoColored className="jth-footer-logo" />
          </li>
          {/* <li> */}
          {/* <Link aria-label={`Terms of use`} to="/"> */}
          {/* <span>Terms of use</span> */}
          {/* </Link> */}
          {/* </li> */}
          {/* <li> */}
          {/* <Link aria-label={`Privacy notice`} to="/404/"> */}
          {/* <span>Privacy notice</span> */}
          {/* </Link> */}
          {/* </li> */}
        </ul>
        {/* <ul className="jth-footer-items-center">
          <li>
            <span>Center</span>
          </li>
        </ul> */}
        <ul className="jth-footer-items-right">
          <li className="jth-footer-items-icon">
            <a href="mailto:jthcast@gmail.com" aria-label="mail">
              <IconEnvelope />
            </a>
          </li>
          <li className="jth-footer-items-icon">
            <a
              href="https://github.com/jthcast"
              target="_blank"
              rel="noreferrer"
              aria-label="github"
            >
              <IconGithub />
            </a>
          </li>
        </ul>
      </nav>
      <ScrollButton
        ariaLabel="ScrollTop"
        tabIndex={-1}
        onClick={scrollToTop}
        showType="notTopAndUp"
        className="jth-footer-scrollButton-top"
      >
        <IconArrowToTop />
      </ScrollButton>
    </footer>
  );
};

export default Footer;
