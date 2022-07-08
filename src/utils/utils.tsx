// 主にTailwindCSS等で、複数のクラス名を連結させるときに用いる。
// 例: <div className={classNames(isFoo ? "bg-red-500" : "bg-green-500", "flex space-x-4 p-4")}>
export const classNames = (...classes: string[]) =>
  classes.filter(Boolean).join(" ");

// ゼロ埋めされた日時文字列を取得するときに用いる。
// 例: convDateToStrZeroPadding(new DateTime(2022,1,2,3,4,5).toString()) => 2022/01/02 03:04:05
export const convDateToStrZeroPadding = (dateStr: string) => {
  const _date: Date = new Date(dateStr);
  return (
    _date.getFullYear().toString() +
    "/" +
    ("0" + (_date.getMonth() + 1).toString()).slice(-2) +
    "/" +
    ("0" + _date.getDate().toString()).slice(-2) +
    " " +
    ("0" + _date.getHours().toString()).slice(-2) +
    ":" +
    ("0" + _date.getMinutes().toString()).slice(-2) +
    ":" +
    ("0" + _date.getSeconds().toString()).slice(-2)
  );
};

// 装飾記号のない日時文字列を取得するときに用いる。ファイル名やシリアルなどに。
// 例: convDateToStrSimple(new Date(2022,1,2,3,4,5).toString()) => 20220102030405
export const convDateToStrSimple = (dateStr: string) => {
  const _date: Date = new Date(dateStr);
  return (
    _date.getFullYear().toString() +
    ("0" + (_date.getMonth() + 1).toString()).slice(-2) +
    ("0" + _date.getDate().toString()).slice(-2) +
    ("0" + _date.getHours().toString()).slice(-2) +
    ("0" + _date.getMinutes().toString()).slice(-2) +
    ("0" + _date.getSeconds().toString()).slice(-2)
  );
};

// ファイルサイズ[byte]から、最適なSI接頭辞をつけてファイルサイズを表記する。
// 例: dataLength(6527608) => 6.22 MB
const prefixList = ["", "K", "M", "G", "T", "P", "E", "Z", "Y"];

export const dataLength = (byte: number): string => {
  let num = byte;
  let prefixIndex = 0;

  while (num > 1000) {
    num = num / 1000;
    prefixIndex++;
  }

  return `${num.toFixed(1)} ${prefixList[prefixIndex]}B`;
};
