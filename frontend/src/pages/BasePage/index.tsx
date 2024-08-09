import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Footer from "../../components/Footer";

const BasePage = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default BasePage;
