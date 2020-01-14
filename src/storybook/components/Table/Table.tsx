import styled, { css } from 'styled-components';

export const Table = styled.table`
  background-color: ${props => props.theme.otherColors.white};
  margin-top: ${props => props.theme.spaceUnits.m};
  margin-bottom: ${props => props.theme.spaceUnits.m};
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
`;

export const HeaderCell = styled.th`
  text-align: left;
  padding: ${props => props.theme.spaceUnits.s};
`;

export const HeaderCellRightAlign = styled.th`
  text-align: right;
  padding: ${props => props.theme.spaceUnits.s};
`;

export const HeaderRow = styled.tr`
  font-weight: bold;
  border-bottom: 1px solid ${props => props.theme.mainColors.border};
`;

export const BodyCell = styled.td`
  padding: ${props => props.theme.spaceUnits.s};
`;

export const BodyCellRightAlign = styled.td`
  padding: ${props => props.theme.spaceUnits.s};
  text-align: right;
`;

export interface BodyRowProps {
  highlighted?: boolean;
}

export const BodyRow = styled.tr<BodyRowProps>`
  border-top: 1px solid ${props => props.theme.mainColors.secondaryDarkAlpha};

  &:not(:last-child) {
    border-bottom: 1px dashed ${props => props.theme.mainColors.border};
  }

  ${props => {
    if (props.highlighted) {
      return css`
        background-color: ${props => props.theme.mainColors.secondary};
      `;
    }
  }}
`;

export const NoEntries = styled.div``;

export const BodyRowHover = styled(BodyRow)`
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.mainColors.secondary};
  }
`;