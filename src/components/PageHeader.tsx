import '../styles/PageHeader.css';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}

const PageHeader = ({ title, subtitle, rightAction }: PageHeaderProps) => {
  return (
    <div className="page-header">
      <div className="header-left">
        <h1 className="header-title">{title}</h1>
        {subtitle && <p className="header-subtitle">{subtitle}</p>}
      </div>
      {rightAction && (
        <div className="header-right">
          {rightAction}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
