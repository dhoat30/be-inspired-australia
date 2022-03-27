import Layout from '../Components/Layout'
import { useEffect, useState } from 'react';
import { createGlobalStyle, ThemeProvider } from "styled-components";
import '../Components/Layout.css'
import { ModalContextProvider } from '../store/modal-context';
import { AuthContextProvider } from '../store/auth-context';
import { NotificationContextProvider } from '../store/notification-context';
import { UserDataContextProvider } from '../store/user-data-context';
import { BoardsDataContextProvider } from '../store/boards-data-context';
import { OrdersDataContextProvider } from '../store/orders-context';
import { ProfessionalDataContextProvider } from '../store/professional-context';
import Head from 'next/head'
import TagManager from 'react-gtm-module';
import { LoadingContextProvider } from '../store/loading-context';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-PS7XFHN' });
  }, []);

  return (
    <LoadingContextProvider>

      <NotificationContextProvider>
        <ModalContextProvider>
          <BoardsDataContextProvider>
            <UserDataContextProvider>
              <ProfessionalDataContextProvider>
                <OrdersDataContextProvider>
                  <AuthContextProvider>
                    <GlobalStyle />
                    <ThemeProvider theme={theme}>
                      <Layout>
                        <Head>
                          <meta charSet="utf-8" />
                          <meta name="viewport" content="width=device-width, initial-scale=1" />
                        </Head>
                        <Component {...pageProps} />
                      </Layout>
                    </ThemeProvider>
                  </AuthContextProvider>
                </OrdersDataContextProvider>
              </ProfessionalDataContextProvider>
            </UserDataContextProvider>
          </BoardsDataContextProvider>
        </ModalContextProvider>
      </NotificationContextProvider>
    </LoadingContextProvider>

  )
}

export default MyApp

const theme = {
  colors: {
    primary: "#fafafa",
  },

};
const GlobalStyle = createGlobalStyle`

* {
        box-sizing: border-box !important;
      }

html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  box-sizing: border-box !important;
  overflow-y: scroll;
  margin: 0;
  padding: 0;
  scroll-behavior: smooth; 
}

body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: hsla(0, 0%, 0%, 0.8);
  font-family: 'Poppins', sans-serif;
  font-weight: normal;
  word-wrap: break-word;
  font-kerning: normal;
  -moz-font-feature-settings: "kern", "liga", "clig", "calt";
  -ms-font-feature-settings: "kern", "liga", "clig", "calt";
  -webkit-font-feature-settings: "kern", "liga", "clig", "calt";
  font-feature-settings: "kern", "liga", "clig", "calt";
    padding: 0;
}



/* custom styling  */
.row-container {
  padding: 0 20px;
  max-width: 100% !important;
  @media(max-width:1000px){ 
    padding: 0 10px;
}
}

/* font weight */
.black {
  font-weight: 900;
}
.bold {
  font-weight: 700;
}
.medium {
  font-weight: 500;
}
.semi-bold {
  font-weight: 600;
}
.regular {
  font-weight: 400;
}
.light {
  font-weight: 300;
}
.thin {
  font-weight: 100;
}

/* background colors */
/* font colors */
.light-grey {
  color: #888888;
}
.black {
  color: black;
}
.blue {
  color: #007272;
}
.white {
  color: white;
}
.dark-grey {
  color: #474747;
}

/* flex containers */
.flex-row {
  display: flex;
  flex-direction: row;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.justify-center {
  justify-content: center;
}
.justify-start {
  justify-content: flex-start;
}
.justify-end {
  justify-content: flex-end;
}
.justify-between {
  justify-content: space-between;
}

.align-center {
  align-items: center;
}
/* positions  */
.position-relative {
  z-index: 5;
  position: relative;
}
/* font size */
.large-size {
  font-size: 3rem;
  line-height: 4rem;
}
.column-size {
  font-size: 1.5rem;
  margin: 0;
}
.paragraph-size {
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5rem;
}
.small-size {
  font-size: 0.8rem;
  margin: 0;
}
@media (max-width: 600px) {
  .large-size {
    font-size: 2rem;
  }
}
/* text align */
.center-align {
  text-align: center !important;
}
/* box shadow */
.box-shadow {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important;
}

/* margins */
.margin-auto {
  margin: 0 auto !important;
}
.margin-row-v {
  margin: 50px 0;
}
.margin-element-v {
  margin: 10px 0;
}
.padding-element-v {
  padding: 10px 0;
}

/* card border radius */
.card-border-radius {
  border-radius: 16px;
}

/* width styling */
.fullWidth {
  display: block;
  width: 100%;
  margin: 15px auto;
}

`