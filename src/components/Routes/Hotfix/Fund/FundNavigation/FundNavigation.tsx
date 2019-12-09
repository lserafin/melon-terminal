import React from 'react';
import * as S from './FundNavigation.styles';
import { RequiresFundManager } from '~/components/Common/Gates/RequiresFundManager/RequiresFundManager';
import { RequiresFundNotShutDown } from '~/components/Common/Gates/RequiresFundNotShutDown/RequiresFundNotShutDown';

export interface FundNavigationProps {
  address: string;
}

export const FundNavigation: React.FC<FundNavigationProps> = ({ address }) => {
  return (
    <S.FundNavigation>
      <S.FundNavigationAll>
        <S.FundNavigationLink to={`/fund/${address}`} exact={true} activeClassName="active">
          Overview
        </S.FundNavigationLink>
        <S.FundNavigationLink to={`/fund/${address}/redeem`} exact={true} activeClassName="active">
          Redeem
        </S.FundNavigationLink>
      </S.FundNavigationAll>
      <RequiresFundManager address={address}>
        <S.FundNavigationManager>
          <S.FundNavigationLink to={`/fund/${address}/claimfees`} exact={true} activeClassName="active">
            Claim Fees
          </S.FundNavigationLink>
          <RequiresFundNotShutDown address={address}>
            <S.FundNavigationLink to={`/fund/${address}/shutdown`} exact={true} activeClassName="active">
              Shut down
            </S.FundNavigationLink>
          </RequiresFundNotShutDown>
        </S.FundNavigationManager>
      </RequiresFundManager>
    </S.FundNavigation>
  );
};
