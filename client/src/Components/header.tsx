interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return <div>{title}</div>;
};

export default Header;
