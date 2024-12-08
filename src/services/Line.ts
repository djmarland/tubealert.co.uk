export type Line = {
  name: string;
  shortName: string;
  urlKey: string;
  tflKey: string;
  displayOrder: number;
};

export const ALL_LINES: Line[] = [
  {
    name: "Bakerloo Line",
    shortName: "Bakerloo",
    urlKey: "bakerloo-line",
    tflKey: "bakerloo",
    displayOrder: 1,
  },
  {
    name: "Central Line",
    shortName: "Central",
    urlKey: "central-line",
    tflKey: "central",
    displayOrder: 2,
  },
  {
    name: "Circle Line",
    shortName: "Circle",
    urlKey: "circle-line",
    tflKey: "circle",
    displayOrder: 3,
  },
  {
    name: "District Line",
    shortName: "District",
    urlKey: "district-line",
    tflKey: "district",
    displayOrder: 4,
  },
  {
    name: "Hammersmith \u0026 City Line",
    shortName: "Hammersmith \u0026 City",
    urlKey: "hammersmith-city-line",
    tflKey: "hammersmith-city",
    displayOrder: 5,
  },
  {
    name: "Jubilee Line",
    shortName: "Jubilee",
    urlKey: "jubilee-line",
    tflKey: "jubilee",
    displayOrder: 6,
  },
  {
    name: "Metropolitan Line",
    shortName: "Metropolitan",
    urlKey: "metropolitan-line",
    tflKey: "metropolitan",
    displayOrder: 7,
  },
  {
    name: "Northern Line",
    shortName: "Northern",
    urlKey: "northern-line",
    tflKey: "northern",
    displayOrder: 8,
  },
  {
    name: "Piccadilly Line",
    shortName: "Piccadilly",
    urlKey: "piccadilly-line",
    tflKey: "piccadilly",
    displayOrder: 9,
  },
  {
    name: "Victoria Line",
    shortName: "Victoria",
    urlKey: "victoria-line",
    tflKey: "victoria",
    displayOrder: 10,
  },
  {
    name: "Waterloo \u0026 City Line",
    shortName: "Waterloo \u0026 City",
    urlKey: "waterloo-city-line",
    tflKey: "waterloo-city",
    displayOrder: 11,
  },
  {
    name: "Elizabeth Line",
    shortName: "Elizabeth",
    urlKey: "elizabeth-line",
    tflKey: "elizabeth",
    displayOrder: 12,
  },
  {
    name: "Liberty Line",
    shortName: "Liberty",
    urlKey: "liberty-line",
    tflKey: "liberty",
    displayOrder: 13,
  },
  {
    name: "Lioness Line",
    shortName: "Lioness",
    urlKey: "lioness-line",
    tflKey: "lioness",
    displayOrder: 14,
  },
  {
    name: "Mildmay Line",
    shortName: "Mildmay",
    urlKey: "mildmay-line",
    tflKey: "mildmay",
    displayOrder: 15,
  },
  {
    name: "Suffragette Line",
    shortName: "Suffragette",
    urlKey: "suffragette-line",
    tflKey: "suffragette",
    displayOrder: 16,
  },
  {
    name: "Weaver Line",
    shortName: "Weaver",
    urlKey: "weaver-line",
    tflKey: "weaver",
    displayOrder: 17,
  },
  {
    name: "Windrush Line",
    shortName: "Windrush",
    urlKey: "windrush-line",
    tflKey: "windrush",
    displayOrder: 18,
  },
  {
    name: "DLR",
    shortName: "DLR",
    urlKey: "dlr",
    tflKey: "dlr",
    displayOrder: 19,
  },
  {
    name: "Tram",
    shortName: "Tram",
    urlKey: "tram",
    tflKey: "tram",
    displayOrder: 20,
  },
];

export const getLineByUrlKey = (urlKey: string | null) =>
  urlKey ? ALL_LINES.find((l) => l.urlKey === urlKey) : null;

export type Severity = {
  title: string;
  disrupted: boolean;
  displayOrder: number;
};

export const SEVERITIES: { [key: number]: Severity } = {
  1: {
    title: "Closed",
    disrupted: true,
    displayOrder: 1,
  },
  2: {
    title: "Suspended",
    disrupted: true,
    displayOrder: 1,
  },
  3: {
    title: "Part Suspended",
    disrupted: true,
    displayOrder: 1,
  },
  4: {
    title: "Planned Closure",
    disrupted: true,
    displayOrder: 1,
  },
  5: {
    title: "Part Closure",
    disrupted: true,
    displayOrder: 1,
  },
  6: {
    title: "Severe Delays",
    disrupted: true,
    displayOrder: 5,
  },
  7: {
    title: "Reduced Service",
    disrupted: true,
    displayOrder: 5,
  },
  8: {
    title: "Bus Service",
    disrupted: true,
    displayOrder: 5,
  },
  9: {
    title: "Minor Delays",
    disrupted: true,
    displayOrder: 10,
  },
  10: {
    title: "Good Service",
    disrupted: false,
    displayOrder: 100,
  },
  11: {
    title: "Part Closed",
    disrupted: true,
    displayOrder: 5,
  },
  12: {
    title: "Exist Only",
    disrupted: true,
    displayOrder: 20,
  },
  13: {
    title: "No Step Free Access",
    disrupted: true,
    displayOrder: 20,
  },
  14: {
    title: "Change of frequency",
    disrupted: true,
    displayOrder: 20,
  },
  15: {
    title: "Diverted",
    disrupted: true,
    displayOrder: 20,
  },
  16: {
    title: "Not Running",
    disrupted: true,
    displayOrder: 1,
  },
  17: {
    title: "Issues Reported",
    disrupted: true,
    displayOrder: 25,
  },
  18: {
    title: "No Issues",
    disrupted: false,
    displayOrder: 50,
  },
  19: {
    title: "Information",
    disrupted: false,
    displayOrder: 50,
  },
  20: {
    title: "Service Closed",
    disrupted: true,
    displayOrder: 1,
  },
} as const;

export const getLines = () => {
  // When lines are found in local storage, then keep those at the top
  // Then, append the rest of the lines behind them

  const storedLineKeys = getStoredLineKeys();

  const findInStoredLines = (lineKey: string) => {
    const foundIndex = storedLineKeys.indexOf(lineKey);
    return (foundIndex === -1) ? Infinity : foundIndex;
  }

  ALL_LINES.sort((line, anotherLine) => findInStoredLines(line.urlKey) - findInStoredLines(anotherLine.urlKey));
  return ALL_LINES;
};

export const getStoredLineKeys = () => {
  const storedLineKeys: string[] = JSON.parse(localStorage.getItem("starredLines") || "[]");
  return storedLineKeys;
};

export const storeLineKeys = (lineKeys: string[]) => {
  localStorage.setItem("starredLines", JSON.stringify(lineKeys));
}

export function starLine(lineKey: string) {
  const storedLineKeys = getStoredLineKeys().filter(e => e !== lineKey);
  storedLineKeys.unshift(lineKey);

  console.log("Starred Lines: ", storedLineKeys);
  storeLineKeys(storedLineKeys);
};

export function unstarLine(lineKey: string) {
  const storedLineKeys = getStoredLineKeys().filter(e => e !== lineKey);

  console.log("Starred Lines: ", storedLineKeys);
  storeLineKeys(storedLineKeys);
};