const LOCALE = "pt-BR" as const;

const zonedOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
};

export class Timestamp {
  /**
   * Sem `timeZone`: ISO 8601 em UTC (termina em `Z`).
   * Com `timeZone`: string legível no fuso IANA (ex.: `America/Sao_Paulo`, `Europe/Lisbon`).
   */
  static now(timeZone?: string): string {
    return Timestamp.format(new Date(), timeZone);
  }

  static format(date: Date, timeZone?: string): string {
    if (timeZone === undefined) {
      return date.toISOString();
    }
    return date.toLocaleString(LOCALE, {
      ...zonedOptions,
      timeZone,
    });
  }
}
