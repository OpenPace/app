import { DateTime } from "luxon";

const units = ["year", "month", "week", "day", "hour", "minute"] as const;

export function timeLeft(dateTime: DateTime) {
  const diff = dateTime.diffNow().shiftTo(...units);
  const unit = units.find((u) => diff.get(u) !== 0) || "second";
  const amount = Math.trunc(diff.as(unit));

  if (amount === 0) {
    return "today";
  }
  if (amount === 1) {
    return `in ${amount} ${unit}`;
  }

  return `in ${amount} ${unit}s`;
}

export function timeAgo(dateTime: DateTime) {
  const diff = dateTime.diffNow().shiftTo(...units);
  const unit = units.find((u) => diff.get(u) !== 0) || "second";
  const amount = Math.trunc(diff.as(unit)) * -1;

  if (amount === 0) {
    return "today";
  }
  if (amount === 1) {
    return `${amount} ${unit} ago`;
  }

  return `${amount} ${unit}s ago`;
}

export function inPast(dateTime: DateTime) {
  return DateTime.local() > dateTime;
}

export function inFuture(dateTime: DateTime) {
  return DateTime.local() < dateTime;
}
