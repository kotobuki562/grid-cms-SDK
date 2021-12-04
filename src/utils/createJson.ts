export const parseJson = <T>(rows: any[][], colms: any[]) => {
  const contents: T[] = [];
  for (const row of rows.slice(1, rows.length)) {
    const obj: any = {};
    for (let i = 0; i < row.length; i++) {
      obj[colms[i]] = row[i];
    }
    contents.push(
      Object.keys(obj).reduce((acc: any, key: string) => {
        if (key.includes("JSON")) {
          try {
            acc[key] = JSON.parse(obj[key]);
          } catch (e) {
            throw new Error("JSON parse error");
          }
        } else {
          acc[key] = obj[key];
        }
        return acc;
      }, {})
    );
  }
  return contents;
};
