import React, { useState } from 'react';
import styled from 'styled-components';

import { graphql, useStaticQuery } from 'gatsby';

import { Icon } from '@iconify/react';

import { StaticImage } from 'gatsby-plugin-image';
import AgendaItem from './agendaItem';

import { Reveal } from 'react-awesome-reveal';
import { fadeInUp, fadeInDown } from '../../style/animations';

const AgendaListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  //margin-top:3rem;
  /*  border:1px solid grey;*/
`;

export default function Agenda({ settings }) {
  const { afficherLeNomDuSpectacle, nombreDeDates, datesPassees } = settings;
  const data = useStaticQuery(graphql`
    query agenda {
      futures: allDatoCmsAgenda(
        filter: { isFuture: { eq: true } }
        sort: { dateDebutEvenement: ASC }
      ) {
        nodes {
          id
          isFuture
          details
          ville
          dateDebutEvenement
          dateFinEvenement
          spectacle {
            nom
            slug
          }
        }
      }

      passees: allDatoCmsAgenda(
        filter: { isFuture: { eq: false } }
        sort: { dateDebutEvenement: DESC }
      ) {
        nodes {
          id
          isFuture
          details
          ville
          dateDebutEvenement
          dateFinEvenement
          spectacle {
            nom
            slug
          }
        }
      }
    }
  `);
  //console.log("settings :  ", settings)
  //console.log("toutes les dates:", data.allDatoCmsAgenda.nodes)
  //let filteredDates = dates.filter(date => date.isFuture === !datesPassees).slice(0,nombreDeDates);
  //console.log(filteredDates);

  let filteredDates = datesPassees ? data.passees.nodes : data.futures.nodes;

  const datesToDisplay = nombreDeDates > 0 ? filteredDates.slice(0, nombreDeDates) : filteredDates;
  //console.log(datesToDisplay);

  return (
    <Reveal keyframes={fadeInDown} triggerOnce>
      <AgendaListWrapper>
        {datesToDisplay.map((item, i) => {
          return (
            <AgendaItem
              key={i}
              item={item}
              displayName={afficherLeNomDuSpectacle}
              path="../spectacles/"
            />
          );
        })}
      </AgendaListWrapper>
    </Reveal>
  );
}
