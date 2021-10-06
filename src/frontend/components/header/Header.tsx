const Header = (props) => {
  const { children, title } = props;

  return (
    <div className="header-box">
      <h1 className={"header"}>{title}</h1>
      <div className="header__bar">{children}</div>
    </div>
  );
};

export default Header;
