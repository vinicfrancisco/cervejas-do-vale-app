import React, { useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';
import { BeerDTO } from '~/dtos/beers';
import Button from '../Button';
import {
  Modal,
  Container,
  Title,
  Description,
  StarsContainer,
  StarButton,
  SuccessImage,
} from './styles';

interface RatingModalProps {
  beer_id: string;
  visible: boolean;
  onRate: (rating: number) => Promise<BeerDTO>;
  onDismiss: () => void;
}

const RatingModal: React.VFC<RatingModalProps> = ({
  visible,
  onRate,
  onDismiss,
}) => {
  const { colors } = useTheme();

  const [rating, setRating] = useState<number[]>([0, 0, 0, 0, 0]);

  const hasRated = useMemo((): boolean => {
    return !!rating.find(rate => rate > 0);
  }, [rating]);

  const handlePressStar = async (rate: number) => {
    setRating(state => state.map((item, index) => (index + 1 <= rate ? 1 : 0)));

    await onRate(rate);
  };

  const handleClose = () => {
    onDismiss();
    setRating([0, 0, 0, 0, 0]);
  };

  return (
    <Modal visible={visible} onDismiss={onDismiss}>
      <Container>
        {hasRated ? (
          <>
            <Description>Agradecemos pela revisão!</Description>

            <SuccessImage />

            <Button onPress={handleClose}>Fechar</Button>
          </>
        ) : (
          <>
            <Title>Avaliar cerveja</Title>

            <Description>
              Avalie a cerveja com uma nota de 1 a 5 estrelas
            </Description>

            <StarsContainer>
              {rating.map((item, index) => (
                <StarButton
                  key={`star-${index}`}
                  onPress={() => handlePressStar(index + 1)}
                >
                  <Icon
                    name={item > 0 ? 'star' : 'star-outline'}
                    size={30}
                    color={colors.primary}
                  />
                </StarButton>
              ))}
            </StarsContainer>
          </>
        )}
      </Container>
    </Modal>
  );
};

export default RatingModal;
