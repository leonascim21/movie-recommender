import React from "react";
import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import useProviders, { Provider } from "../hooks/useProviders";

interface Props {
  movieId: number;
}

const allowedProviders = [
  "Netflix",
  "Hulu",
  "Starz",
  "Amazon Video",
  "Apple TV",
  "Amazon Prime Video",
  "Peacock",
  "Disney Plus",
  "Max",
  "Apple TV Plus",
  "Paramount Plus",
];

const WatchOptions: React.FC<Props> = ({ movieId }) => {
  const { providers, error } = useProviders(movieId);

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!providers) {
    return null;
  }

  const filterProviders = (providerList: Provider[]) => {
    return providerList.filter((provider) =>
      allowedProviders.includes(provider.provider_name)
    );
  };

  const renderProviders = (providerList: Provider[]) => (
    <HStack wrap="wrap" spacing={4}>
      {filterProviders(providerList).map((provider) => (
        <Image
          src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
          alt={provider.provider_name}
          key={provider.provider_id}
          boxSize="50px"
          mb={10}
          mt={3}
          borderRadius={20}
        />
      ))}
    </HStack>
  );

  const flatrateProviders = providers.flatrate
    ? filterProviders(providers.flatrate)
    : [];
  const rentProviders = providers.rent ? filterProviders(providers.rent) : [];
  const buyProviders = providers.buy ? filterProviders(providers.buy) : [];

  if (
    flatrateProviders.length === 0 &&
    rentProviders.length === 0 &&
    buyProviders.length === 0
  ) {
    return null;
  }

  return (
    <>
      <VStack alignItems="start">
        {flatrateProviders.length > 0 && (
          <VStack alignItems="center" w="100%">
            <Heading size="md" textAlign="center" w="100%">
              Stream
            </Heading>
            {renderProviders(flatrateProviders)}
          </VStack>
        )}
        {flatrateProviders.length === 0 && rentProviders.length > 0 && (
          <VStack alignItems="center" w="100%">
            <Heading size="md" textAlign="center" w="100%">
              Rent
            </Heading>
            {renderProviders(rentProviders)}
          </VStack>
        )}
        {flatrateProviders.length === 0 &&
          rentProviders.length === 0 &&
          buyProviders.length > 0 && (
            <VStack alignItems="center" w="100%">
              <Heading size="md" textAlign="center" w="100%">
                Buy
              </Heading>
              {renderProviders(buyProviders)}
            </VStack>
          )}
      </VStack>
    </>
  );
};

export default WatchOptions;
