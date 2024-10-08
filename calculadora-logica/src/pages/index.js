import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Calculadora from "@/componentes/calculadora";

export default function Home() {
  return (
    <>
      <Head>
        <title>Calculadora lógica</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <Calculadora/>
      </main>
    </>
  );
}
