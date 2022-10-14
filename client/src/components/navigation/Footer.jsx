const Footer = ({setCurrentView}) => {
  return (
    <div className="footer">
      <div className="menu-button" onClick={() => setCurrentView("main")}>
        Back To Home
      </div>
    </div>
  );
};

export default Footer;
