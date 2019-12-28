import React from 'react';
import { Spinner } from '~/components/Common/Spinner/Spinner';
import * as S from './WalletOverview.styles';
import { useFundParticipationOverviewQuery } from '~/queries/FundParticipationOverview';
import { useEnvironment } from '~/hooks/useEnvironment';
import { WalletOverviewInvestmentRequest } from './WalletOverviewInvestmentRequest/WalletOverviewInvestmentRequest';
import { WalletOverviewManagedFund } from './WalletOverviewManagedFund/WalletOverviewManagedFund';
import { WalletOverviewInvestedFund } from './WalletOverviewInvestedFund/WalletOverviewInvestedFund';

const fundHeadings = ['Name', 'Inception', 'AUM [ETH]', 'Share price', 'Change', '# shares', 'Version', 'Status'];
const redeemHeadings = ['Name', 'Inception', 'AUM [ETH]', 'Share price', 'Change', '# shares', 'Version', 'Status'];
const requestHeadings = ['Fund name', 'Request date', 'Request asset', 'Request amount', 'Requested shares'];

export const WalletOverview: React.FC = () => {
  const environment = useEnvironment()!;
  const [invested, requests, managed, query] = useFundParticipationOverviewQuery(environment.account);

  if (query.loading) {
    return <Spinner positioning="centered" size="large" />;
  }

  const managedHeader = fundHeadings.map((heading, index) => <S.HeaderCell key={index}>{heading}</S.HeaderCell>);
  const managedEmpty = !(managed && managed.length);
  const managedRows = !managedEmpty ? (
    managed.map(fund => <WalletOverviewManagedFund {...fund} key={fund.address} />)
  ) : (
    <S.EmptyRow>
      <S.EmptyCell colSpan={12}>You do not manage any funds.</S.EmptyCell>
    </S.EmptyRow>
  );

  const investedHeader = redeemHeadings.map((heading, index) => <S.HeaderCell key={index}>{heading}</S.HeaderCell>);
  const investedEmpty = !(invested && invested.length);
  const investedRows = !investedEmpty ? (
    invested.map(fund => <WalletOverviewInvestedFund {...fund} key={fund.address} />)
  ) : (
    <S.EmptyRow>
      <S.EmptyCell colSpan={12}>You don't own any shares in any funds.</S.EmptyCell>
    </S.EmptyRow>
  );

  const requestsHeader = requestHeadings.map((heading, index) => <S.HeaderCell key={index}>{heading}</S.HeaderCell>);
  const requestsEmpty = !(requests && requests.length);
  const requestsRows = !requestsEmpty ? (
    requests.map(request => <WalletOverviewInvestmentRequest {...request} key={request.address} />)
  ) : (
    <S.EmptyRow>
      <S.EmptyCell colSpan={12}>You do not have any pending investment requests.</S.EmptyCell>
    </S.EmptyRow>
  );

  return (
    <S.Container>
      <S.Group>
        <S.Title>Managed funds</S.Title>
        {!managedEmpty && (
          <p>
            Shutting down your fund closes the fund for new investors and trades will no longer be possible. Investor
            can redeem their shares whenever they want.
          </p>
        )}
        <S.ScrollableTable>
          <S.Table>
            <thead>
              <S.HeaderRow>{managedHeader}</S.HeaderRow>
            </thead>
            <tbody>{managedRows}</tbody>
          </S.Table>
        </S.ScrollableTable>
      </S.Group>
      <S.Group>
        <S.Title>Funds with owned shares</S.Title>
        {!investedEmpty && (
          <p>Redeeming shares will transfer the underlying assets of your shares back to your wallet.</p>
        )}
        <S.ScrollableTable>
          <S.Table>
            <thead>
              <S.HeaderRow>{investedHeader}</S.HeaderRow>
            </thead>
            <tbody>{investedRows}</tbody>
          </S.Table>
        </S.ScrollableTable>
      </S.Group>
      <S.Group>
        <S.Title>Pending investment requests</S.Title>
        {!requestsEmpty && (
          <p>
            Cancelling pending investment requests will transfer the underlying assets of the investment request back to
            your wallet.
          </p>
        )}
        <S.ScrollableTable>
          <S.Table>
            <thead>
              <S.HeaderRow>{requestsHeader}</S.HeaderRow>
            </thead>
            <tbody>{requestsRows}</tbody>
          </S.Table>
        </S.ScrollableTable>
      </S.Group>
    </S.Container>
  );
};

export default WalletOverview;
