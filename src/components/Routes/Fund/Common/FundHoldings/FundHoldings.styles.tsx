import styled from 'styled-components';
import { Subtitle } from '~/components/Common/Styles/Styles';

export const Wrapper = styled.div`
  position: relative;
  height: 350px;
  overflow: auto;
  background-color: rgb(255, 255, 255);
  flex: 1 0 25%;
  min-width: 250px;

  @media (${props => props.theme.mediaQueries.m}) {
    border-right: 1px solid rgb(234, 229, 212);
    border-bottom: none;
  }
`;

export const Title = Subtitle;

export const HoldingSymbol = styled.span``;

export const HoldingName = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.75rem;
  color: rgb(155, 155, 155);
`;
