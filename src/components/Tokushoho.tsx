import styled from "styled-components";
import { colors, fonts, media, spacing } from "../styles/theme";

const Page = styled.div`
  min-height: 100vh;
  padding: calc(${spacing.headerHeight} + 3rem) 1.5rem 5rem;
  background-color: ${colors.bgPrimary};
`;

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-family: ${fonts.heading};
  font-size: 1.75rem;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin-bottom: 2.5rem;

  ${media.md} {
    font-size: 2rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Row = styled.tr`
  border-bottom: 1px solid ${colors.border};
`;

const Header = styled.th`
  text-align: left;
  vertical-align: top;
  padding: 1rem 1rem 1rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  white-space: nowrap;
  width: 160px;

  ${media.md} {
    width: 200px;
  }
`;

const Data = styled.td`
  padding: 1rem 0;
  font-size: 0.875rem;
  color: ${colors.textSecondary};
  line-height: 1.8;
`;

const HomeLink = styled.a`
  display: inline-block;
  margin-top: 3rem;
  font-size: 0.875rem;
  color: ${colors.textMuted};
  text-decoration: none;

  &:hover {
    color: ${colors.textPrimary};
  }
`;

export default function Tokushoho() {
  return (
    <Page>
      <Container>
        <Title>特定商取引法に基づく表記</Title>
        <Table>
          <tbody>
            <Row>
              <Header>販売業者</Header>
              <Data>TODO: 氏名または屋号を入力</Data>
            </Row>
            <Row>
              <Header>運営統括責任者</Header>
              <Data>TODO: 責任者名を入力</Data>
            </Row>
            <Row>
              <Header>所在地</Header>
              <Data>請求があった場合に遅滞なく開示いたします。</Data>
            </Row>
            <Row>
              <Header>電話番号</Header>
              <Data>請求があった場合に遅滞なく開示いたします。</Data>
            </Row>
            <Row>
              <Header>メールアドレス</Header>
              <Data>TODO: メールアドレスを入力</Data>
            </Row>
            <Row>
              <Header>販売URL</Header>
              <Data>https://beatmist.pages.dev</Data>
            </Row>
            <Row>
              <Header>販売価格</Header>
              <Data>各商品ページに記載の価格（税込）</Data>
            </Row>
            <Row>
              <Header>商品代金以外の必要料金</Header>
              <Data>なし</Data>
            </Row>
            <Row>
              <Header>支払い方法</Header>
              <Data>クレジットカード（Stripe経由）</Data>
            </Row>
            <Row>
              <Header>支払い時期</Header>
              <Data>購入時に即時決済</Data>
            </Row>
            <Row>
              <Header>商品の引渡し時期</Header>
              <Data>決済完了後、ライセンスキーを即時発行</Data>
            </Row>
            <Row>
              <Header>返品・交換・キャンセル</Header>
              <Data>
                デジタル商品の性質上、購入後の返品・交換・キャンセルには応じかねます。
                <br />
                ただし、商品に重大な不具合がある場合は、メールにてお問い合わせください。
              </Data>
            </Row>
            <Row>
              <Header>動作環境</Header>
              <Data>Windows 10以降 / macOS 12以降</Data>
            </Row>
          </tbody>
        </Table>
        <HomeLink href="/">&larr; トップページに戻る</HomeLink>
      </Container>
    </Page>
  );
}
