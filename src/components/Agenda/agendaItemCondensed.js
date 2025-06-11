import React from 'react';
import { fr } from 'date-fns/locale';
import { format } from 'date-fns';
import styled from 'styled-components';
import { mq, colors, font } from '../../consts/style'; 

import {
    Text,
  } from "../Elements"

const ItemWrapperCondensed = styled.div`
  padding-top:0;
  display:flex;
  position: relative;
  flex-direction:column;
  width:100%;
  margin-bottom:0;
  /* border-top:1px solid white;*/
  justify-content: space-between;
  /*gap:3rem;*/
  ${mq.mobile`
    flex-direction:column-reverse;
    gap:0;
  `}
`


const MyFlex = styled.div`
  display:flex;
  flex-direction:column;
  
  line-height:unset;
`

const AgendaItemDate = styled.div`
  display:flex;
  color:${colors.blue}; 
  font-weight:700;
  line-height:1;
  font-size:1.6rem;
`

const AgendaItemContent = styled.div`
  display:flex;  
  ${mq.mobile`
  margin-left:0;
  padding:0;
  `}
  flex-direction:column;
  h2 {
    ${font.h2}
    text-transform:none;
  }
  width: 100%;
  & ${Text} {
    font-size:1.4rem;
    & p {
      margin-bottom:0.5rem;
    }
  }
`


const AgendaItemCondensed = ({item}) => {
  
    return (
       <MyFlex>
          <AgendaItemDate>{item.dateFinEvenement ? format(new Date(item.dateDebutEvenement), 'eee dd LLL', {locale: fr})+" au "+format(new Date(item.dateFinEvenement), 'eee dd LLL yyyy', {locale: fr}) : format(new Date(item.dateDebutEvenement), 'eee dd LLL yyyy', {locale: fr})}
           
          </AgendaItemDate>
          <ItemWrapperCondensed>
            <AgendaItemContent>
                <Text dangerouslySetInnerHTML={{ __html: item.details }}/>
            </AgendaItemContent>
        </ItemWrapperCondensed>
    
        </MyFlex>
    )
}
export default AgendaItemCondensed;