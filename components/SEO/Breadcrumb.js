import Link from 'next/link';

export default function Breadcrumb({ items, className = '' }) {
  if (!items?.length) {
    return null;
  }

  return (
    <nav aria-label="Fil d'Ariane" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary-200/70">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.path}-${item.label}`} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden="true" className="text-primary-200/35">
                  /
                </span>
              )}
              {isLast ? (
                <span aria-current="page" className="text-secondary-700">
                  {item.label}
                </span>
              ) : (
                <Link href={item.path}>
                  <a className="rounded-sm transition-colors duration-200 hover:text-secondary-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-700">
                    {item.label}
                  </a>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
