import React from 'react';
import { fr } from 'date-fns/locale';
import { format } from 'date-fns';
import styled from 'styled-components';
import {  colors } from '../../consts/style'; 
import Link from '../ExtendedLink';

import {
  
    Text,
  } from "../Elements"

const ItemWrapper = styled.div`

  display:flex;
  position: relative;
  flex-direction:row;
  width:100%; 
  gap:2rem;
 
`
const AgendaItemProjet =   styled(Text)`
  display:inline;
  text-transform:uppercase;
  padding-right:.4rem; 
  padding-left:.4rem;
  color:${colors.dark}; 
 
  & a:hover {
    text-decoration:underline;
  }
    & a {
      font-weight:700;  
     color:${ props => props.theme === "light" ? colors.dark : colors.blue };
  }
     
  
`

const AgendaItemMois =   styled.span`
  text-transform:uppercase;
  font-weight:700;
 color:${props => props.theme === "light" ? '#fff' : 'inherit' };
  
`

const AgendaItemVille =   styled.span`
  color:${colors.dark};
  font-weight:700;
   
`

const AgendaItemJour =   styled.div`
  min-width:45px;
  font-weight:800;
  font-size:4.2rem;
 // font-family: 'Raleway';
  color:${props => props.theme === "dark" ? colors.blue : '#fff' };
` 

const AgendaItemContent =   styled.div`
  display:block;
  gap:1rem;
  width: 100%;
  & p { text-align:left;font-size:1.6rem;}
  & a {
    color:black;
    text-decoration:underline;
  }
  &  a:hover {
    color:black;
  text-decoration:none;
  }
`


const AgendaItem = ({item, path = '', theme = 'dark', displayName = false}) => {
 // console.log(path)
    return (
       <div>
           <ItemWrapper theme={theme}>
           {/* 
            <AgendaItemJour  theme={theme}>
              { format(new Date(item.dateDebutEvenement), 'dd', {locale: fr})}
            </AgendaItemJour>
            */}
            <div style={{'lineHeight':'2rem','flexGrow':'1'}}> 
              <AgendaItemMois theme={theme}>
               { !item.dateFinEvenement ?        format(new Date(item.dateDebutEvenement), 'dd LLL yyyy', {locale: fr}) :
                format(new Date(item.dateDebutEvenement), 'dd LLL', {locale: fr})+  ' au ' + format(new Date(item.dateFinEvenement), 'dd LLL yyyy', {locale: fr})
               }
              </AgendaItemMois>&nbsp;|&nbsp;  
              {displayName && 
                <AgendaItemProjet as="span"  theme={theme} style={{'lineHeight':'2rem'}}>
                  <Link to ={path + item.spectacle.slug}>{item.spectacle.nom}</Link>  &gt;  
                </AgendaItemProjet> 
               
                }
              <AgendaItemVille>{item.ville}</AgendaItemVille>
              <AgendaItemContent >
               
                <Text dangerouslySetInnerHTML={{ __html: item.details }}  style={{'lineHeight':'2rem',"wordBreak":"auto-phrase","fontSize":"1.6rem"}}/>
              </AgendaItemContent>
             </div>
        </ItemWrapper>
        </div>
    )
}
export default AgendaItem