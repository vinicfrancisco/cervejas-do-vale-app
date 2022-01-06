import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';
import { Container } from './styles';

interface RatingProps {
  rating: number;
}

const Rating: React.VFC<RatingProps> = ({ rating }) => {
  const { colors } = useTheme();

  const stars = useMemo(() => {
    let fullfilledStars = 0;
    let halfStar = 0;
    let emptyStars = 5;

    if (rating > 0) {
      fullfilledStars = Math.trunc(rating);
      halfStar = rating - fullfilledStars > 0 ? 1 : 0;
      emptyStars = 5 - fullfilledStars - halfStar;
    }

    const fullfilledStarsArray = new Array(0);
    const emptyStarsArray = new Array(0);

    for (let i = 0; i < fullfilledStars; i++) {
      fullfilledStarsArray.push(1);
    }

    for (let i = 0; i < emptyStars; i++) {
      emptyStarsArray.push(1);
    }

    return {
      emptyStarsArray,
      halfStar,
      fullfilledStarsArray,
    };
  }, [rating]);

  return (
    <Container>
      {stars.fullfilledStarsArray.map((item, index) => (
        <Icon
          key={`full-${index}`}
          name="star"
          size={22}
          color={colors.primary}
        />
      ))}

      {stars.halfStar > 0 && (
        <Icon name="star-half" size={22} color={colors.primary} />
      )}

      {stars.emptyStarsArray.map((item, index) => (
        <Icon
          key={`empty-${index}`}
          name="star-outline"
          size={22}
          color={colors.primary}
        />
      ))}
    </Container>
  );
};

export default Rating;
