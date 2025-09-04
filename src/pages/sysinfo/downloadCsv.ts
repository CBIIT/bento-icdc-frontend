// utils/downloadVersionsCsv.ts
export type Row = {
  name: string;
  currentVersion?: string | number | null | undefined;
  apiEndpoint?: string | number | null | undefined;
};

type Section = {
  title: string;
  rows: Row[];
};

function toCsvCell(value: unknown): string {
  const str =
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    value === null || value === undefined ? '' : String(value).trim();
  // Escape if needed: wrap in quotes and escape inner quotes
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function sectionsToCsv(sections: Section[]): string {
  const lines: string[] = [];

  for (const section of sections) {
    // Section header as a single-column line
    lines.push(toCsvCell(section.title));
    // Column headers
    lines.push(
      [
        toCsvCell('Name'),
        toCsvCell('Current Version'),
        toCsvCell('API Endpoint'),
      ].join(',')
    );
    // Rows
    for (const r of section.rows) {
      lines.push(
        [
          toCsvCell(r.name),
          toCsvCell(r.currentVersion),
          toCsvCell(r.apiEndpoint),
        ].join(',')
      );
    }
    // Blank line between sections
    lines.push('');
  }

  return lines.join('\n');
}

export function downloadVersionsCsv(
  coreMicroServicesTable: Row[],
  extendedMicroServicesTable: Row[],
  dependenciesTable: Row[],
  filename = 'versions.csv'
) {
  const sections: Section[] = [
    { title: 'Core Microservices', rows: coreMicroServicesTable },
    { title: 'Extended Microservices', rows: extendedMicroServicesTable },
    { title: 'Dependencies', rows: dependenciesTable },
  ];

  const csv = sectionsToCsv(sections);

  // Prepend BOM so Excel opens UTF-8 correctly
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Add this to utils/downloadVersionsCsv.ts

export function downloadVersionsJson(
  coreMicroServicesTable: Row[],
  extendedMicroServicesTable: Row[],
  dependenciesTable: Row[],
  filename = 'versions.json'
) {
  const payload = {
    generatedAt: new Date().toISOString(),
    sections: [
      { title: 'Core Microservices', rows: coreMicroServicesTable },
      { title: 'Extended Microservices', rows: extendedMicroServicesTable },
      { title: 'Dependencies', rows: dependenciesTable },
    ],
  };

  const json = JSON.stringify(payload, null, 2);

  const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
