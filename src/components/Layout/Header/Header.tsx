import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useConnectionDetails } from '~/queries/ConnectionDetails';
import { hotfix } from '~/config';
import * as S from './Header.styles';

export const Header: React.FC = () => {
  const location = useLocation();
  const [connection] = useConnectionDetails();

  return (
    <S.HeaderPosition>
      <S.Header>
        <S.LogoContainer>
          <Link to="/">
            <S.Logo name="with-text" height={30} width={120} />
          </Link>
        </S.LogoContainer>
        <S.Account>
          <S.AccountName />
          <S.AccountInfo>
            {!hotfix && connection && connection.account && (
              <S.AccountAddress>
                <Link to="/wallet" title={connection.account.address}>
                  Your wallet
                </Link>
              </S.AccountAddress>
            )}
            <S.AccountNetwork>
              <Link to={{ pathname: '/connect', state: { redirect: location } }} title="Change connection method">
                {connection ? connection.network : 'OFFLINE'}
              </Link>
            </S.AccountNetwork>
            {connection && connection.account && (
              <S.AccountBalance>{connection.account.balanceEth.toFixed(4)} ETH</S.AccountBalance>
            )}
          </S.AccountInfo>
        </S.Account>
      </S.Header>
    </S.HeaderPosition>
  );
};
