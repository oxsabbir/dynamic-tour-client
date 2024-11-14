import Nav from "@/app/components/header/Nav";
import Hero from "@/app/components/landingPage/Hero";
import Destination from "@/app/components/landingPage/Destination";
import Unleash from "@/app/components/landingPage/Unleash";
import About from "@/app/components/landingPage/About";
import Discover from "@/app/components/landingPage/Discover";
import Reviews from "@/app/components/landingPage/Reviews";
import Explore from "@/app/components/landingPage/Explore";
import Footer from "@/app/components/landingPage/Footer";
import Container from "@/app/components/extra/Container";

export default function Home() {
  return (
    <>
      <nav>
        <Nav />
      </nav>
      <main>
        <section>
          <Hero />
        </section>
        <Container>
          <section className=" py-10 container">
            <Destination />
          </section>
          <section className=" py-10 container">
            <Unleash />
          </section>
          <section id="about" className=" py-10 container">
            <About />
          </section>
          <section className=" py-10 container">
            <Discover />
          </section>
          <section className=" py-10 container 0">
            <Reviews />
          </section>
          <section className=" py-20 container">
            <Explore />
          </section>
        </Container>
      </main>
      <footer className=" pt-10  bg-offWhite">
        <Container>
          <Footer />
        </Container>
      </footer>
    </>
  );
}
