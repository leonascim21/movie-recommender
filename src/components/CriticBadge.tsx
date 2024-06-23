import { Badge } from "@chakra-ui/react";

interface Props {
  rating: string;
}

const CriticBadge = ({ rating }: Props) => {
  let color;
  let numRating = Number(rating);

  if (numRating >= 77) {
    color = "green";
  } else if (numRating >= 67) {
    color = "yellow";
  } else {
    color = "red";
  }

  return (
    <Badge colorScheme={color} fontSize="14px" paddingX={2} borderRadius="4px">
      {numRating}
    </Badge>
  );
};

export default CriticBadge;
