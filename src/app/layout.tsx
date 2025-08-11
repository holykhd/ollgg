import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Sidebar } from "./components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "올리면 끝. 올끝",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="layout-navbar-fixed layout-menu-fixed layout-compact"
    >
      <head>
        <link
          rel="icon"
          type="image/x-icon"
          href="/assets/img/favicon/favicon.svg"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/vendor/fonts/iconify-icons.css" />
        <link rel="stylesheet" href="/assets/vendor/css/core.css" />
        <link rel="stylesheet" href="/assets/css/custom.css" />
        <link rel="stylesheet" href="/assets/vendor/css/pages/app-chat.css" />
        <link
          rel="stylesheet"
          href="/assets/vendor/libs/pickr/pickr-themes.css"
        />
        <link
          rel="stylesheet"
          href="../../assets/vendor/libs/typeahead-js/typeahead.css"
        />
        <link
          rel="stylesheet"
          href="/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css"
        />
        <link
          rel="stylesheet"
          href="/assets/vendor/libs/bs-stepper/bs-stepper.css"
        />
        <link
          rel="stylesheet"
          href="/assets/vendor/libs/bootstrap-select/bootstrap-select.css"
        />
        <link rel="stylesheet" href="/assets/vendor/libs/select2/select2.css" />
        <script src="/assets/js/config.js"></script>
      </head>
      <body className={inter.className}>
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            <div className="content-wrapper">
              <div className="container-fluid flex-grow-1 container-p-y">
                <Header />
                <div className="row">
                  <Sidebar />
                  <div className="col-md-12 col-xl-9 col-lg-10 order-1 order-md-2">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <script src="/assets/vendor/libs/jquery/jquery.js"></script>
        <script src="/assets/vendor/libs/popper/popper.js"></script>
        <script src="/assets/vendor/js/bootstrap.js"></script>
        <script src="/assets/vendor/libs/@algolia/autocomplete-js.js"></script>
        <script src="/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>
        <script src="/assets/vendor/libs/hammer/hammer.js"></script>
        <script src="/assets/vendor/js/menu.js"></script>
        <script src="/assets/vendor/libs/pickr/pickr.js"></script>
        <script src="/assets/vendor/libs/bs-stepper/bs-stepper.js"></script>
        <script src="/assets/vendor/libs/bootstrap-select/bootstrap-select.js"></script>
        <script src="/assets/vendor/libs/select2/select2.js"></script>
        <script src="/assets/js/main.js"></script>
        <script src="/assets/js/form-wizard-icons.js"></script>
      </body>
    </html>
  );
}
