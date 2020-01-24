import React, { useState, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Spinner } from '~/storybook/components/Spinner/Spinner';
import { NoMatch } from '~/components/Routes/NoMatch/NoMatch';
import { FundOverviewPagination } from '~/components/Routes/Home/FundOverviewPagination/FundOverviewPagination';
import { useFundOverviewQuery, FundProcessed } from '~/queries/FundOverview';
import { usePagination } from '~/hooks/usePagination';
import { useAccount } from '~/hooks/useAccount';
import { Grid, GridRow, GridCol } from '~/storybook/components/Grid/Grid';
import { Block, BlockActions } from '~/storybook/components/Block/Block';
import { Input } from '~/storybook/components/Input/Input';
import { SectionTitle } from '~/storybook/components/Title/Title';
import { Button } from '~/storybook/components/Button/Button';
import { Container } from '~/storybook/components/Container/Container';
import { FormattedDate } from '~/components/Common/FormattedDate/FormattedDate';
import { FormattedNumber } from '~/components/Common/FormattedNumber/FormattedNumber';
import {
  ScrollableTable,
  Table,
  HeaderRow,
  HeaderCell,
  HeaderCellRightAlign,
  BodyCellRightAlign,
  BodyRow,
  BodyCell,
  BodyRowHover,
} from '~/storybook/components/Table/Table';
import {
  CheckboxMask,
  CheckboxLabel,
  CheckboxContainer,
  CheckboxPositioning,
  CheckboxInput,
  CheckboxIcon,
} from '~/storybook/components/Checkbox/Checkbox';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';

interface SortChoice {
  key: keyof typeof sortChoice;
  order: 'asc' | 'desc';
}

function createSortString(key: keyof FundProcessed) {
  return function sortString(a: FundProcessed, b: FundProcessed): number {
    if (a[key] === b[key]) {
      return 0;
    }

    return a[key] < b[key] ? -1 : 1;
  };
}

function createSortNumberFromString(key: keyof FundProcessed) {
  return function sortNumberFromString(a: FundProcessed, b: FundProcessed): number {
    if (+a[key] === +b[key]) {
      return 0;
    }

    return +a[key] < +b[key] ? -1 : 1;
  };
}

const sortChoice = {
  name: createSortString('name'),
  inception: createSortString('inception'),
  aumEth: createSortNumberFromString('aumEth'),
  aumUsd: createSortNumberFromString('aumEth'),
  sharePrice: createSortNumberFromString('sharePrice'),
  shares: createSortNumberFromString('shares'),
  version: createSortString('version'),
  status: createSortString('status'),
  change: (a: FundProcessed, b: FundProcessed) => b.change.comparedTo(a.change),
};

const useFilteredFunds = (funds: FundProcessed[], search: string, filter: boolean) => {
  const filtered = useMemo(() => {
    if (!search && !filter) {
      return funds;
    }

    return funds.filter(({ name, status }) => {
      const matches = !search || name.toLowerCase().includes(search);
      return matches && (!filter || status === 'Active');
    });
  }, [funds, search, filter]);

  return {
    search,
    funds: filtered,
  };
};

const useSortedFunds = (filteredFunds: FundProcessed[]) => {
  const [item, setItem] = useState<SortChoice>({
    key: 'sharePrice',
    order: 'desc',
  });

  const sortedFunds = useMemo(() => {
    if (!filteredFunds) {
      return [];
    }

    const sortedValues = filteredFunds.slice().sort(sortChoice[item.key]);

    return item.order === 'asc' ? sortedValues : sortedValues.reverse();
  }, [filteredFunds, item]);

  return {
    item,
    setItem,
    funds: sortedFunds,
  };
};

const tableHeadings = [
  {
    value: 'Name',
    key: 'name',
    align: 'left',
  },
  {
    value: 'Inception',
    key: 'inception',
    align: 'left',
  },
  {
    value: 'Share price',
    key: 'sharePrice',
    align: 'right',
  },
  {
    value: 'Daily change',
    key: 'change',
    align: 'right',
  },
  {
    value: 'AUM [ETH]',
    key: 'aumEth',
    align: 'right',
  },
  {
    value: 'AUM [USD]',
    key: 'aumUsd',
    align: 'right',
  },
  {
    value: '# shares',
    key: 'shares',
    align: 'right',
  },
  {
    value: 'Version',
    key: 'version',
    align: 'left',
  },
  {
    value: 'Status',
    key: 'status',
    align: 'left',
  },
];

const ToggleCheckboxContainer = styled(CheckboxContainer)`
  margin-top: ${props => props.theme.spaceUnits.xs};
`;

const ToggleCheckboxLabel = styled(CheckboxLabel)`
  padding-left: 0;
  padding-right: ${props => props.theme.spaceUnits.xs};
`;

export const Home: React.FC = () => {
  const history = useHistory();
  const [funds, query] = useFundOverviewQuery();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(false);

  const filtered = useFilteredFunds(funds, search, filter);
  const sorted = useSortedFunds(filtered.funds);
  const pagination = usePagination(sorted.funds, 15);
  const account = useAccount();

  useEffect(() => {
    pagination.setOffset(0);
  }, [search]);

  if (query.loading) {
    return (
      <Container>
        <Grid>
          <GridRow>
            <GridCol>
              <Block>
                <Spinner />
              </Block>
            </GridCol>
          </GridRow>
        </Grid>
      </Container>
    );
  }

  const handleChangeSortableItem = (key: any) => {
    if (key === sorted.item.key) {
      return sorted.setItem({
        key,
        order: sorted.item.order === 'asc' ? 'desc' : 'asc',
      });
    }

    return sorted.setItem({
      key,
      order: 'asc',
    });
  };

  return (
    <Container>
      <Grid>
        <GridRow>
          <GridCol>
            <Block>
              <SectionTitle>
                <span>Melon fund universe</span>
                {!account.fund && account.address && (
                  <Button kind="secondary">
                    <Link to="/wallet/setup">Create your own Melon fund</Link>
                  </Button>
                )}
              </SectionTitle>
              <Grid>
                <GridRow>
                  <GridCol>
                    <Input
                      id="search"
                      name="search"
                      type="text"
                      placeholder="Search"
                      value={search}
                      onChange={event => setSearch(event.target.value)}
                    />
                  </GridCol>

                  <GridCol>
                    <ToggleCheckboxContainer>
                      <ToggleCheckboxLabel htmlFor="filter">Show only active funds</ToggleCheckboxLabel>
                      <CheckboxPositioning>
                        <CheckboxInput
                          type="checkbox"
                          id="filter"
                          name="filter"
                          checked={filter}
                          onChange={() => setFilter(!filter)}
                        />
                        <CheckboxMask>
                          <CheckboxIcon />
                        </CheckboxMask>
                      </CheckboxPositioning>
                    </ToggleCheckboxContainer>
                  </GridCol>
                </GridRow>
              </Grid>

              <ScrollableTable>
                <Table>
                  <thead>
                    <HeaderRow>
                      {tableHeadings.map((heading, key) =>
                        heading.align === 'left' ? (
                          <HeaderCell
                            hover={true}
                            key={key}
                            onClick={heading.key ? () => handleChangeSortableItem(heading.key) : undefined}
                          >
                            {heading.value}
                            {sorted.item.key === heading.key &&
                              (sorted.item.order === 'asc' ? <>&uarr;</> : <>&darr;</>)}
                          </HeaderCell>
                        ) : (
                          <HeaderCellRightAlign
                            hover={true}
                            key={key}
                            onClick={heading.key ? () => handleChangeSortableItem(heading.key) : undefined}
                          >
                            {heading.value}
                            {sorted.item.key === heading.key &&
                              (sorted.item.order === 'asc' ? <>&uarr;</> : <>&darr;</>)}
                          </HeaderCellRightAlign>
                        )
                      )}
                    </HeaderRow>
                  </thead>
                  <tbody>
                    {pagination.data.length ? (
                      pagination.data.map(fund => (
                        <BodyRowHover key={fund.id} title={fund.name} onClick={() => history.push(`/fund/${fund.id}`)}>
                          <BodyCell maxWidth="200px">{fund.name}</BodyCell>
                          <BodyCell>
                            <FormattedDate timestamp={fund.inception} format="yyyy/MM/dd" />
                          </BodyCell>
                          <BodyCellRightAlign>{fund.sharePrice}</BodyCellRightAlign>
                          <BodyCellRightAlign>
                            <FormattedNumber value={fund.change} colorize={true} decimals={2} suffix="%" />
                          </BodyCellRightAlign>
                          <BodyCellRightAlign>{fund.aumEth}</BodyCellRightAlign>
                          <BodyCellRightAlign>{fund.aumUsd || ''}</BodyCellRightAlign>
                          <BodyCellRightAlign>{fund.shares}</BodyCellRightAlign>
                          <BodyCell>{fund.version}</BodyCell>
                          <BodyCell>{fund.status}</BodyCell>
                        </BodyRowHover>
                      ))
                    ) : (
                      <BodyRow>
                        <BodyCell colSpan={12}>No records to display</BodyCell>
                      </BodyRow>
                    )}
                  </tbody>
                </Table>
              </ScrollableTable>
              <BlockActions>
                <FundOverviewPagination
                  offset={pagination.offset}
                  setOffset={pagination.setOffset}
                  funds={filtered.funds.length}
                />
              </BlockActions>
            </Block>
          </GridCol>
        </GridRow>
      </Grid>
    </Container>
  );
};

export default Home;
