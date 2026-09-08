export function buildBookingResultSummary({
  goal,
  frequency,
  packageName,
}: {
  goal: string;
  frequency: string;
  packageName: string;
}) {
  return [goal, frequency, packageName].filter(Boolean).join(" · ");
}
