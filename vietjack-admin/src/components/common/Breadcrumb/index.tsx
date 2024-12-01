import { ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export type BreadcrumbItem = {
  title: string;
  path: string;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  icon?: ReactNode;
};

const Breadcrumb = ({ items, icon }: BreadcrumbProps) => {
  const { t } = useTranslation(['common']);
  return (
    <nav className="flex items-center">
      {icon && <span className="inline-block mr-2">{icon}</span>}
      <ol className="flex items-center gap-2 space-x-2">
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center gap-1 space-x-3">
            {index !== 0 && <ChevronRight size={18} color="#667085" />}
            <Link className="text-gray-500 capitalize text-sm-medium" to={item.path}>
              {t(item.title)}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
