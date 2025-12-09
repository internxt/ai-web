import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

interface TableRow {
  feature: string;
  [key: string]: string;
}

const ComparisonSection: React.FC = () => {
  const { t } = useTranslation('page');

  try {
    const competitors = t('ComparisonSection.table.competitors', { returnObjects: true }) as string[];
    const rows = t('ComparisonSection.table.rows', { returnObjects: true }) as TableRow[];

    if (!Array.isArray(competitors) || !Array.isArray(rows)) {
      console.error('ComparisonSection: Invalid data structure');
      return null;
    }

    return (
      <section className="flex flex-col items-center py-10 lg:py-20 px-5 lg:px-10 xl:px-32 3xl:px-80 bg-white">
        <div className="flex flex-col items-center gap-16 w-full">
          <Header />
          <div className="hidden lg:block w-full">
            <DesktopComparisonTable competitors={competitors} rows={rows} />
          </div>
          <div className="block lg:hidden w-full">
            <MobileComparisonTable competitors={competitors} rows={rows} />
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('ComparisonSection error:', error);
    return null;
  }
};

const Header: React.FC = () => {
  const { t } = useTranslation('page');

  return (
    <div className="flex flex-col items-center text-center gap-6 lg:px-80">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-100">{t('ComparisonSection.title')}</h2>
      <p className="text-xl text-gray-55 leading-tight">{t('ComparisonSection.descriptions')}</p>
    </div>
  );
};

interface DesktopComparisonTableProps {
  competitors: string[];
  rows: TableRow[];
}

const DesktopComparisonTable: React.FC<DesktopComparisonTableProps> = ({ competitors, rows }) => {
  const totalColumns = competitors.length + 1;
  const columnWidth = `${100 / totalColumns}%`;

  return (
    <div className="w-full overflow-x-auto mt-8">
      <table className="w-full border-collapse table-fixed">
        <colgroup>
          {Array.from({ length: totalColumns }).map((_, index) => (
            <col key={index} style={{ width: columnWidth }} />
          ))}
        </colgroup>
        <DesktopTableHeader competitors={competitors} />
        <DesktopTableBody competitors={competitors} rows={rows} />
      </table>
    </div>
  );
};

interface DesktopTableHeaderProps {
  competitors: string[];
}

const DesktopTableHeader: React.FC<DesktopTableHeaderProps> = ({ competitors }) => {
  const getHeaderCellClass = (index: number, total: number): string => {
    const baseClasses = 'py-4 px-6 text-center ring-inset ring-1 ring-neutral-25 text-sm font-semibold';
    const isFirst = index === 0;
    const isLast = index === total - 1;
    const isEven = index % 2 === 0;

    const bgColor = isEven ? 'bg-neutral-17' : 'bg-white';
    const textColor = 'text-gray-900';
    const roundedClass = isFirst ? 'rounded-tl-[16px]' : isLast ? 'rounded-tr-[16px]' : '';

    return `${baseClasses} ${bgColor} ${textColor} ${roundedClass}`;
  };

  return (
    <thead>
      <tr>
        <th className="text-left py-4 px-6"></th>
        {competitors.map((competitor, index) => (
          <th key={index} className={getHeaderCellClass(index, competitors.length)}>
            {competitor}
          </th>
        ))}
      </tr>
    </thead>
  );
};

interface DesktopTableBodyProps {
  competitors: string[];
  rows: TableRow[];
}

const DesktopTableBody: React.FC<DesktopTableBodyProps> = ({ competitors, rows }) => {
  return (
    <tbody>
      {rows.map((row, rowIndex) => (
        <DesktopTableRow
          key={rowIndex}
          row={row}
          rowIndex={rowIndex}
          competitors={competitors}
          isLastRow={rowIndex === rows.length - 1}
          isFirstRow={rowIndex === 0}
        />
      ))}
    </tbody>
  );
};

interface DesktopTableRowProps {
  row: TableRow;
  rowIndex: number;
  competitors: string[];
  isLastRow: boolean;
  isFirstRow: boolean;
}

const DesktopTableRow: React.FC<DesktopTableRowProps> = ({ row, rowIndex, competitors, isLastRow, isFirstRow }) => {
  const isRowEven = rowIndex % 2 === 0;

  const getCellBackgroundColor = (columnIndex: number): string => {
    const isColEven = columnIndex % 2 === 0;

    if (isRowEven && isColEven) return 'bg-neutral-10';
    if (!isRowEven && isColEven) return 'bg-white';
    if (!isRowEven && !isColEven) return 'bg-neutral-17';
    if (isRowEven && !isColEven) return 'bg-neutral-37';

    return '';
  };

  const getFeatureCellClass = (): string => {
    const baseClasses = 'px-6 font-medium ring-inset ring-1 ring-neutral-25';
    const bgColor = getCellBackgroundColor(0);
    const roundedClass = isLastRow ? 'rounded-bl-[16px]' : isFirstRow ? 'rounded-tl-[16px]' : '';

    return `${baseClasses} ${bgColor} ${roundedClass}`;
  };

  const getCompetitorCellClass = (colIndex: number): string => {
    const absoluteColIndex = colIndex + 1;
    const isLastCol = colIndex === competitors.length - 1;

    const baseClasses = 'px-6 text-center text-sm text-gray-600 ring-inset ring-1 ring-neutral-25';
    const bgColor = getCellBackgroundColor(absoluteColIndex);
    const roundedClass = isLastRow && isLastCol ? 'rounded-br-[16px]' : '';

    return `${baseClasses} ${bgColor} ${roundedClass}`;
  };

  const normalizeCompetitorKey = (competitor: string): string => {
    return competitor === 'Open AI' ? 'OpenAI' : competitor;
  };

  return (
    <tr className="h-16">
      <td className={getFeatureCellClass()}>
        <div className="flex items-center h-16">{row.feature}</div>
      </td>

      {competitors.map((competitor, colIndex) => {
        const competitorKey = normalizeCompetitorKey(competitor);

        return (
          <td key={colIndex} className={getCompetitorCellClass(colIndex)}>
            <div className="flex items-center justify-center h-16">{row[competitorKey]}</div>
          </td>
        );
      })}
    </tr>
  );
};

interface MobileComparisonTableProps {
  competitors: string[];
  rows: TableRow[];
}

const MobileComparisonTable: React.FC<MobileComparisonTableProps> = ({ competitors, rows }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      setIsScrolled(scrollElement.scrollLeft > 0);
    };

    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, []);

  const normalizeCompetitorKey = (competitor: string): string => {
    return competitor === 'Open AI' ? 'OpenAI' : competitor;
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="flex">
        <div
          className="relative flex-shrink-0"
          style={{
            boxShadow: isScrolled ? '4px 0px 6px -1px rgba(0, 0, 0, 0.1), 2px 0px 4px -2px rgba(0, 0, 0, 0.1)' : 'none',
          }}
        >
          <div className="relative z-10 w-[140px] bg-white sm:w-[170px]">
            <div className="h-[48px]"></div>

            {rows.map((row, index) => (
              <div
                key={`fixed-${index}`}
                className={`flex h-[50px] flex-col items-start justify-center border border-neutral-25 px-2 sm:px-3 ${
                  index % 2 === 0 ? 'bg-neutral-10' : 'bg-white'
                } ${index === 0 ? 'rounded-tl-2xl' : ''} ${index === rows.length - 1 ? 'rounded-bl-2xl' : ''}`}
              >
                <p className="text-xs font-normal leading-tight text-gray-95">{row.feature}</p>
              </div>
            ))}
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-x-auto">
          <div style={{ width: `${competitors.length * 215}px` }}>
            <div className="flex">
              {competitors.map((competitor, compIndex) => (
                <div key={`header-${compIndex}`} className="w-[215px]">
                  <div
                    className={`flex h-[48px] flex-col items-center justify-center border border-neutral-25 p-3 ${
                      compIndex === 0 ? 'bg-neutral-17' : 'bg-white'
                    } ${compIndex === 0 ? 'rounded-tl-2xl' : ''} ${
                      compIndex === competitors.length - 1 ? 'rounded-tr-2xl' : ''
                    }`}
                  >
                    <span className="text-xs font-semibold text-gray-900 sm:text-sm">{competitor}</span>
                  </div>
                </div>
              ))}
            </div>

            {rows.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="flex">
                {competitors.map((competitor, compIndex) => {
                  const competitorKey = normalizeCompetitorKey(competitor);
                  const isEven = rowIndex % 2 === 0;
                  const isLastRow = rowIndex === rows.length - 1;
                  const isLastCol = compIndex === competitors.length - 1;

                  let bgColor = '';
                  if (compIndex % 2 === 0) {
                    bgColor = isEven ? 'bg-neutral-37' : 'bg-neutral-17';
                  } else {
                    bgColor = isEven ? 'bg-white-95' : 'bg-white';
                  }

                  return (
                    <div key={`cell-${compIndex}`} className="w-[215px]">
                      <div
                        className={`flex h-[50px] flex-col items-center justify-center border border-neutral-25 px-2 ${bgColor} ${
                          isLastRow && isLastCol ? 'rounded-br-2xl' : ''
                        }`}
                      >
                        <span className="text-center text-xs font-normal text-gray-100">{row[competitorKey]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSection;
