import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const FundNavigation = styled.div``;

export const FundNavigationAll = styled.div`
  float: left;
`;

export const FundNavigationManager = styled.div`
  float: right;
`;

export const FundNavigationLink = styled(NavLink)`
  display: inline-block;
  position: relative;
  padding: 12px 32px;
  text-decoration: none;

  &.active::before {
    position: absolute;
    content: '';
    border-bottom: 2px solid rgb(195, 179, 121);
    bottom: -2px;
    right: 0;
    left: 0;
  }
`;
