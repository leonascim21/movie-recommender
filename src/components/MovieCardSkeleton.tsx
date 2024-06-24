import { Card, Skeleton, SkeletonCircle } from "@chakra-ui/react";

const MovieCardSkeleton = () => {
  return (
    <Card>
      <Skeleton height="200px" minWidth="200px" maxWidth="200px" />
      <SkeletonCircle />
    </Card>
  );
};

export default MovieCardSkeleton;
