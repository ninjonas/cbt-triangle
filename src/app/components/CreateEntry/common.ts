export const getPleasantnessLabel = (value: number) => {
  if (value <= 20) return "Very Unpleasant 😢";
  if (value <= 40) return "Unpleasant ☹️";
  if (value <= 60) return "Neutral 😐";
  if (value <= 80) return "Pleasant 😊";
  return "Very Pleasant 😄";
};

export const getPleasantnessLabelColor = (value: number) => {
  if (value <= 20) return "text-red-500"; // Very Unpleasant
  if (value <= 40) return "text-orange-500"; // Unpleasant
  if (value <= 60) return "text-gray-500"; // Neutral
  if (value <= 80) return "text-green-500"; // Pleasant
  return "text-emerald-500"; // Very Pleasant
};
