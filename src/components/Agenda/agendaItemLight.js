import React from 'react';
import { fr } from 'date-fns/locale';
import { format } from 'date-fns';
import styled from 'styled-components';
import { colors } from '../../consts/style';

import { Text } from '../Elements';
const ItemWrapper = styled.div`
  text-transform: uppercase;
  display: flex;
  position: relative;
  flex-direction: row;
  width: 100%;
  gap: 2rem;
`;

const AgendaItemMois = styled.span`
  text-transform: uppercase;
  color: ${colors.dark};
  font-weight: 700;
`;

const AgendaItemVille = styled.span`
  color: ${colors.yellow};
  font-weight: 800;
  text-transform: uppercase;
`;

const AgendaItemJour = styled.div`
  color: ${colors.blue};
  font-weight: 800;
  font-size: 4.2rem;
  //  font-family: 'Raleway';
`;

const AgendaItemContent = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  & a {
    color: ${colors.blue};
  }
  & a:hover {
    text-decoration: underline;
  }
`;

const AgendaItemLight = ({ item, path = '' }) => {
  //console.log(item)
  return (
    <ItemWrapper>
      <AgendaItemJour>
        {format(new Date(item.dateDebutEvenement), 'dd', { locale: fr })}
      </AgendaItemJour>
      <div style={{ lineHeight: '2.5rem' }}>
        <AgendaItemMois>
          {format(new Date(item.dateDebutEvenement), 'LLLL yyyy', { locale: fr })}
        </AgendaItemMois>{' '}
        /<AgendaItemVille> {item.ville}</AgendaItemVille>
        <AgendaItemContent>
          <Text
            dangerouslySetInnerHTML={{ __html: item.details }}
            style={{ lineHeight: '2.5rem', wordBreak: 'auto-phrase' }}
          />
        </AgendaItemContent>
      </div>
    </ItemWrapper>
  );
};
export default AgendaItemLight;
