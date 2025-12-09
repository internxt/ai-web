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
