import type { JSX } from "react";

export const blueText = (text: string) => {
  if (!text) return null;
  return text.split('**').map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="text-primary">
        {part}
      </span>
    ) : (
      part
    ),
  );
};

export const parseMarkdown = (text: string) => {
  if (!text) return null;

  const lines = text.split('\n');
  const elements: JSX.Element[] = [];
  let i = 0;
  let keyCounter = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim().startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      elements.push(renderTable(tableLines, keyCounter++));
      continue;
    }

    if (line.startsWith('###')) {
      elements.push(
        <h3 key={keyCounter++} className="text-lg font-semibold mt-4 mb-2">
          {parseInlineFormatting(line.replace(/^###\s*/, ''), keyCounter)}
        </h3>
      );
    } else if (line.startsWith('##')) {
      elements.push(
        <h2 key={keyCounter++} className="text-xl font-semibold mt-4 mb-2">
          {parseInlineFormatting(line.replace(/^##\s*/, ''), keyCounter)}
        </h2>
      );
    } else if (line.trim().startsWith('-')) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('-')) {
        listItems.push(lines[i].trim().substring(1).trim());
        i++;
      }
      elements.push(
        <ul key={keyCounter++} className="list-disc list-inside mb-3 space-y-1 ml-2">
          {listItems.map((item, idx) => (
            <li key={idx}>{parseInlineFormatting(item, keyCounter)}</li>
          ))}
        </ul>
      );
      continue;
    } else if (line.trim() === '---') {
      elements.push(<hr key={keyCounter++} className="my-4 border-gray-300" />);
    } else if (line.trim() === '') {
      elements.push(<div key={keyCounter++} className="h-2" />);
    } else if (line.trim()) {
      elements.push(
        <p key={keyCounter++} className="mb-3">
          {parseInlineFormatting(line, keyCounter)}
        </p>
      );
    }

    i++;
  }

  return elements;
};

export const parseInlineFormatting = (text: string, baseKey: number = 0) => {
  if (!text) return null;

  let keyCounter = 0;

  return text.split('**').map((part, index) => {
    if (index % 2 === 1) {
      return (
        <strong key={`${baseKey}-bold-${keyCounter++}`} className="font-semibold">
          {part}
        </strong>
      );
    }

    return part.split('*').map((subPart, subIndex) =>
      subIndex % 2 === 1 ? (
        <em key={`${baseKey}-italic-${keyCounter++}`} className="italic">
          {subPart}
        </em>
      ) : (
        subPart
      )
    );
  });
};

export const renderTable = (tableLines: string[], key: number) => {
  const rows = tableLines.map(line =>
    line.split('|').filter(cell => cell.trim()).map(cell => cell.trim())
  );

  const dataRows = rows.filter(row => !row[0].startsWith('---'));
  const headers = dataRows[0];
  const bodyRows = dataRows.slice(1);

  return (
    <div key={key} className="overflow-x-auto my-4">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="border border-gray-300 px-4 py-2 text-left font-semibold">
                {parseInlineFormatting(header, key * 1000 + idx)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, rowIdx) => (
            <tr key={rowIdx} className="border-b border-gray-300">
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="border border-gray-300 px-4 py-2">
                  {parseInlineFormatting(cell, key * 1000 + rowIdx * 100 + cellIdx)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};